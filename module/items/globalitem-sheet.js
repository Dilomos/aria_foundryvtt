/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
import {ArrayUtils} from "../utils/array-utils.js";
import {Traversal} from "../utils/traversal.js";
import {System} from "../config.js";

export class GlobalAriaItemSheet extends ItemSheet {

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
    async _onDrop(event) {
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
        const itemData = duplicate(this.item.toObject(false));
        switch (itemData.type) {
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

    _onDropCompetenceItem(event, itemData) {
        event.preventDefault();
        let data = duplicate(this.item.toObject(false));
        if(this.item.system.competences){
            let caps = this.item.system.competences;
            caps.push(itemData);
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
        let data = duplicate(this.item.toObject(false));
        const li = $(ev.currentTarget).closest(".item");
        const id = li.data("itemId");
        const itemType = li.data("itemType");
        let array = null;
        switch(itemType){
            case "competence" : array = this.item.system.competences; break;
        }
        if(array) {
            ArrayUtils.removeObjectById(array, id)
            return this.item.update(data);
        }
    }

    /** @override */
    async getData(options) {
        const data = super.getData(options);
        const itemData = this.item.toObject(false);
        data.labels = this.item.labels;
        data.config = CONFIG.ARIA;
    
        // Item Type, Status, and Details
        data.itemType = game.i18n.localize(`ITEM.Type${data.item.type.titleCase()}`);
        data.itemProperties = this._getItemProperties(itemData);

        // Re-define the template data references (backwards compatible)
        data.item = itemData;
        data.system = itemData.system;

        data.descriptionHTML = await TextEditor.enrichHTML(data.system.description, {
            async: true
          });
        
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
            const entries = Object.entries(item.system.properties)
            props.push(...entries.filter(e => e[1] === true).map(e => {
                return game.aria.config.itemProperties[e[0]]
            }));
        }
        return props.filter(p => !!p);
    }

}
