/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
import {ArrayUtils} from "../utils/array-utils.js";
import {Traversal} from "../utils/traversal.js";
import {System} from "../config.js";

export class AriaItemSheet extends ItemSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["aria", "sheet", "item", this.type],
            template: System.templatesPath + "/items/item-sheet.hbs",
            width: 600,
            height: 600,
            tabs: [{navSelector: ".sheet-navigation", contentSelector: ".sheet-body", initial: "description"}],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        });
    }

    /**
     * Activate the default set of listeners for the Entity sheet
     * These listeners handle basic stuff like form submission or updating images
     *
     * @param html {JQuery}     The rendered template ready to have listeners attached
     */
    activateListeners(html) {
        super.activateListeners(html);

        // html.find('.editor-content[data-edit]').each((i, div) => this._activateEditor(div));

        html.find('.droppable').on("dragover", function(event) {
            event.preventDefault();
            event.stopPropagation();
            $(event.currentTarget).addClass('dragging');
        });

        html.find('.droppable').on("dragleave", function(event) {
            event.preventDefault();
            event.stopPropagation();
            $(event.currentTarget).removeClass('dragging');
        });

        html.find('.droppable').on("drop", function(event) {
            event.preventDefault();
            event.stopPropagation();
            $(event.currentTarget).removeClass('dragging');
        });

        // Click to open
        html.find('.compendium-pack').click(ev => {
            ev.preventDefault();
            let li = $(ev.currentTarget), pack = game.packs.get(li.data("pack"));
            if ( li.attr("data-open") === "1" ) pack.close();
            else {
                li.attr("data-open", "1");
                li.find("i.folder").removeClass("fa-folder").addClass("fa-folder-open");
                pack.render(true);
            }
        });

        // Display item sheet
        html.find('.item-name').click(this._onEditItem.bind(this));
        html.find('.item-edit').click(this._onEditItem.bind(this));
        // Delete items
        html.find('.item-delete').click(this._onDeleteItem.bind(this));

    }

    /** @override */
    setPosition(options = {}) {
        const position = super.setPosition(options);
        const sheetBody = this.element.find(".sheet-body");
        const bodyHeight = position.height - 192;
        sheetBody.css("height", bodyHeight);
        return position;
    }

    /* -------------------------------------------- */

    /** @override */
    _onDrop(event) {
        event.preventDefault();
        if (!this.options.editable) return false;
        // Get dropped data
        let data;
        try {
            data = JSON.parse(event.dataTransfer.getData('text/plain'));
        } catch (err) {
            return false;
        }
        if (!data) return false;

        // Case 1 - Dropped Item
        if (data.type === "Item") {
            return this._onDropItem(event, data);
        }
        // Case 2 - Dropped Actor
        if (data.type === "Actor") {
            return this._onDropActor(event, data);
        }
    }

    /* -------------------------------------------- */

    /**
     * Handle dropping of an item reference or item data onto an Actor Sheet
     * @param {DragEvent} event     The concluding DragEvent which contains drop data
     * @param {Object} data         The data transfer extracted from the event
     * @return {Object}             OwnedItem data to create
     * @private
     */
    async _onDropItem(event, data) {
        const item = await Item.fromDropData(data);
        const itemData = duplicate(item.data);
        switch (itemData.type) {
            case "profession" :
                return await this._onDropProfessionItem(event, itemData);
            case "origine" :
                return await this._onDropOriginesItem(event, itemData);
            case "competence" :
                return await this._onDropCompetenceItem(event, itemData);
            default:
                return;
        }
    }
    /* -------------------------------------------- */
    /**
     * Handle dropping an Actor on the sheet to trigger a Polymorph workflow
     * @param {DragEvent} event   The drop event
     * @param {Object} data       The data transfer
     * @private
     */
    _onDropActor(event, data) {
        return false;
    }

    /* -------------------------------------------- */

    _onDropProfessionItem(event, itemData) {
        return false;
    }

    /* -------------------------------------------- */

    _onDropOriginesItem(event, itemData) {
        return false;
    }

    /* -------------------------------------------- */

    _onDropCompetenceItem(event, itemData) {
        event.preventDefault();
        let data = duplicate(this.item.data);
        const id = itemData._id;
        if(data.data.competences && !data.data.competences.includes(id)){
            let caps = data.data.competences;
            caps.push(id);
            return this.item.update(data);
        }
        else ui.notifications.error("Ajout de cette compétence impossible.")
    }

    /* -------------------------------------------- */

    async _onEditItem(ev){
        ev.preventDefault();
        const li = $(ev.currentTarget).closest(".item");
        const id = li.data("itemId");
        const itemType = li.data("itemType");
        let pack = null;
        switch(itemType){
            case "origine" : pack = "aria.origines"; break;
            case "profession" : pack = "aria.professions"; break;
            case "competence" : pack = "aria.competences"; break;
        }
        if(pack) return Traversal.getEntity(id, "item", pack).then(e => { if(e) e.sheet.render(true) });
    }

    /* -------------------------------------------- */

    _onDeleteItem(ev){
        ev.preventDefault();
        let data = duplicate(this.item.data);
        const li = $(ev.currentTarget).closest(".item");
        const id = li.data("itemId");
        const itemType = li.data("itemType");
        let array = null;
        switch(itemType){
            case "competence" : array = data.data.competences; break;
        }
        if(array && array.includes(id)) {
            ArrayUtils.remove(array, id)
            return this.item.update(data);
        }
    }

    /** @override */
    getData() {
        const data = super.getData();
        data.labels = this.item.labels;

        // Include CONFIG values
        data.config = game.aria.config;

        // Item Type, Status, and Details
        data.itemType = data.item.type.titleCase();
        // data.itemStatus = this._getItemStatus(data.item);
        data.itemProperties = this._getItemProperties(data.item);
        // data.isPhysical = data.item.data.hasOwnProperty("quantity");

        // Potential consumption targets
        // data.abilityConsumptionTargets = this._getItemConsumptionTargets(data.item);

        // Action Details
        // data.hasAttackRoll = this.item.hasAttack;
        // data.isHealing = data.item.data.actionType === "heal";
        // data.isFlatDC = getProperty(data.item.data, "save.scaling") === "flat";

        // Vehicles
        // data.isCrewed = data.item.data.activation?.type === 'crew';
        // data.isMountable = this._isItemMountable(data.item);
        return data;
    }



    /* -------------------------------------------- */

    /**
     * Get the Array of item properties which are used in the small sidebar of the description tab
     * @return {Array}
     * @private
     */
    _getItemProperties(item) {
        const props = [];
        // const labels = this.item.labels;

        if ( item.type === "item" ) {
            const entries = Object.entries(item.data.properties)
            props.push(...entries.filter(e => e[1] === true).map(e => {
                return game.aria.config.itemProperties[e[0]]
            }));
        }
        return props.filter(p => !!p);
    }

}
