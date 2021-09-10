/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
import {Competence} from "../controllers/competence.js";
import {Profession} from "../controllers/profession.js";
import {Origines} from "../controllers/origines.js";
import {AriaRoll} from "../controllers/roll.js";
import {Traversal} from "../utils/traversal.js";
import { AriaItem } from "../items/item.js";


export class AriaActorSheet extends ActorSheet {

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        // Click to open
        html.find('.compendium-pack').click(ev => {
            ev.preventDefault();
            let li = $(ev.currentTarget), pack = game.packs.get(li.data("pack"));
            //li.attr("data-open", "1");
            pack.render(true);
        });

        // Click to open
        html.find('.item-create.new-capa').click(ev => {
            ev.preventDefault();
            return Competence.create(this.actor);
        });

        // Click to open
        html.find('.item-create.new-capa-spe').click(ev => {
            ev.preventDefault();
            return Competence.create(this.actor,true);
        });

        html.find('.item-create.new-item').click(ev => {
            ev.preventDefault();
            return AriaItem.createForActor(this.actor);
        });

        // Initiate a roll
        html.find('.rollable').click(ev => {
            ev.preventDefault();
            return this._onRoll(ev,false);
        });

        // Initiate a roll
        html.find('.rollable').contextmenu(ev => {
            ev.preventDefault();
            return this._onRoll(ev,true);
        });

        html.find('.competence-create').click(ev => {
            ev.preventDefault();
            return Competence.create(this.actor, ev);
        });
        html.find('.competence-toggle').click(ev => {
            ev.preventDefault();
            const li = $(ev.currentTarget).closest(".competence");
            li.find(".competence-description").slideToggle(200);
        });

        // Equip/Unequip items
        html.find('.item-equip').click(ev => {
            ev.preventDefault();
            const elt = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(elt.data("itemId"));
            let itemData = item.toObject();
            itemData.data.equiped = !itemData.data.equiped;
            return this.actor.updateEmbeddedDocuments("Item",[itemData]);
        });

        html.find('.item-qty').click(ev => {
            ev.preventDefault();
            const li = $(ev.currentTarget).closest(".item");
            const item = this.actor.items.get(li.data("itemId"));
            let itemData = item.toObject();
            itemData.data.qty = (itemData.data.qty) ? itemData.data.qty + 1 : 1;
            return this.actor.updateEmbeddedDocuments("Item",[itemData]);
        });
        html.find('.item-qty').contextmenu(ev => {
            ev.preventDefault();
            const li = $(ev.currentTarget).closest(".item");
            const item = this.actor.items.get(li.data("itemId"));
            let itemData = item.toObject();
            itemData.data.qty = (itemData.data.qty > 0) ? itemData.data.qty -1 : 0;
            return this.actor.updateEmbeddedDocuments("Item",[itemData]);
        });

        html.find('.capa_score').change(async ev => {
            ev.preventDefault();
            const li = $(ev.currentTarget).closest(".item");
            const item = this.actor.items.get(li.data("itemId"));
            let itemData = item.toObject();
            itemData.data.score = (ev.currentTarget.value > 0) ? ev.currentTarget.value : 0;
            itemData.data.score = (itemData.data.score < 100) ? itemData.data.score : 100;
            return await this.actor.updateEmbeddedDocuments("Item",[itemData]);
        });

        html.find('.capa_bonus').change(ev => {
            ev.preventDefault();
            const li = $(ev.currentTarget).closest(".item");
            const item = this.actor.items.get(li.data("itemId"));
            let itemData = item.toObject();
            if( (ev.currentTarget.value.charAt(0) == '-') ||(ev.currentTarget.value.charAt(0) == '+') )
                itemData.data.bonus = ev.currentTarget.value;
            else
                itemData.data.bonus = '+'+ev.currentTarget.value;
            return this.actor.updateEmbeddedDocuments("Item",[itemData]);
        });
        
        

        html.find('.item-name, .item-edit').click(this._onEditItem.bind(this));
        
        html.find('.item-delete').click(ev => {
            return this._onDeleteItem(ev);
        });
    }

/** @override */
getData(options) {

    // Basic data
    let isOwner = this.actor.isOwner;
    const data = {
      owner: isOwner,
      limited: this.actor.limited,
      options: this.options,
      editable: this.isEditable,
      config: CONFIG.ARIA
    };

    // The Actor's data
    const actorData = this.actor.data.toObject(false);
    data.actor = actorData;
    data.data = actorData.data;

    // Owned Items
    data.items = actorData.items;
    for ( let i of data.items ) {
      const item = this.actor.items.get(i._id);
      i.labels = item.labels;
    }
    data.items.sort((a, b) => (a.sort || 0) - (b.sort || 0));


    // Return data to the sheet
    return data
  }
    

    async _onEditItem(event) {
        event.preventDefault();
        const li = $(event.currentTarget).parents(".item");
        const id = li.data("itemId");
        const type = (li.data("itemType")) ? li.data("itemType") : "item";
        const pack = (li.data("pack")) ? li.data("pack") : null;

        let entity = null;
        // look first in actor onwed items
        entity = this.actor.items.get(id);
        if(!entity) {
            // look into world/compendiums items
            entity = await Traversal.getEntity(id, type, pack);
        }
        if(entity) return entity.sheet.render(true);
    }

    /* -------------------------------------------- */
    /* DELETE EVENTS CALLBACKS                      */
    /* -------------------------------------------- */

    /**
     * Callback on delete item actions
     * @param event the roll event
     * @private
     */
    _onDeleteItem(event) {
        event.preventDefault();
        const li = $(event.currentTarget).parents(".item");
        const itemId = li.data("itemId");
        const entity = this.actor.items.find(item => item.id === itemId);
        switch (entity.data.type) {
            case "competence" :
                return this.actor.deleteEmbeddedDocuments("Item",[itemId]);
                // return Competence.removeFromActor(this.actor, event, entity);
                break;
            case "profession" :
                return Profession.removeFromActor(this.actor, event, entity);
                break;
            case "origine" :
                return Origines.removeFromActor(this.actor, event, entity);
                break;
            default: {
                return this.actor.deleteEmbeddedDocuments("Item",[itemId]);
            }
        }
    }

    /* -------------------------------------------- */
    /* ROLL EVENTS CALLBACKS                        */
    /* -------------------------------------------- */

    /**
     * Initiates a roll from any kind depending on the "data-roll-type" attribute
     * @param event the roll event
     * @private
     */
    _onRoll(event,forceConfig) {
        const elt = $(event.currentTarget)[0];
        const rolltype = elt.attributes["data-roll-type"].value;
        switch (rolltype) {
            case "skillcheck" :
                let chooseDifDialog = new Dialog({
                    title: "Difficulté",
                    content: "<p>Choisissez le multiple de caractéristique</p>",
                    buttons: {
                     one: {
                      icon: '<i class="fas fa-times"></i>',
                      label: "1",
                      callback: () => AriaRoll.skillCheck(this.getData().data, this.actor, event, 1)
                     },
                     two: {
                      icon: '<i class="fas fa-times"></i>',
                      label: "2",
                      callback: () => AriaRoll.skillCheck(this.getData().data, this.actor, event, 2)
                     },
                     three: {
                      icon: '<i class="fas fa-times"></i>',
                      label: "3",
                      callback: () => AriaRoll.skillCheck(this.getData().data, this.actor, event, 3)
                     },
                     four: {
                      icon: '<i class="fas fa-times"></i>',
                      label: "4",
                      callback: () => AriaRoll.skillCheck(this.getData().data, this.actor, event, 4)
                     },
                     five: {
                      icon: '<i class="fas fa-times"></i>',
                      label: "5",
                      callback: () => AriaRoll.skillCheck(this.getData().data, this.actor, event, 5)
                     },
                    },
                    default: "five",
                   });
               chooseDifDialog.render(true);
               break;

                //return AriaRoll.skillCheck(this.getData().data, this.actor, event);
            case "competencycheck" :
                if(forceConfig)
                {
                    let chooseDifDialog = new Dialog({
                        title: "Modificateur de difficulté",
                        content: "<p>Choisissez le modificateur à appliquer au jet de compétence</p>",
                        buttons: {
                         one: {
                          icon: '<i class="fas fa-minus"></i>',
                          label: "30",
                          callback: () => AriaRoll.competencyCheck(this.getData().items, this.actor, event, "-30")
                         },
                         two: {
                          icon: '<i class="fas fa-minus"></i>',
                          label: "20",
                          callback: () => AriaRoll.competencyCheck(this.getData().items, this.actor, event, "-20")
                         },
                         three: {
                          icon: '<i class="fas fa-minus"></i>',
                          label: "10",
                          callback: () => AriaRoll.competencyCheck(this.getData().items, this.actor, event, "-10")
                         },
                         four: {
                          label: "aucun",
                          callback: () => AriaRoll.competencyCheck(this.getData().items, this.actor, event, "+0")
                         },
                         five: {
                          icon: '<i class="fas fa-plus"></i>',
                          label: "10",
                          callback: () => AriaRoll.competencyCheck(this.getData().items, this.actor, event, "+10")
                         },
                         six: {
                            icon: '<i class="fas fa-plus"></i>',
                            label: "20",
                            callback: () => AriaRoll.competencyCheck(this.getData().items, this.actor, event, "+20")
                           },
                        seven: {
                            icon: '<i class="fas fa-plus"></i>',
                            label: "30",
                            callback: () => AriaRoll.competencyCheck(this.getData().items, this.actor, event, "+30")
                           },
                        },
                        default: "five",
                       });
                   chooseDifDialog.render(true);
                   break;
                }
                else{
                    return AriaRoll.competencyCheck(this.getData().items, this.actor, event,"+0");
                }
            case "weapon" :
                return AriaRoll.rollWeapon(this.getData().data, this.actor, event);
        }
    }

    /* -------------------------------------------- */
    /* DROP EVENTS CALLBACKS                        */
    /* -------------------------------------------- */

    /** @override */
    async _onDrop(event) {
        event.preventDefault();
        
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

    /**
     * Handle dropping an Actor on the sheet to trigger a Polymorph workflow
     * @param {DragEvent} event   The drop event
     * @param {Object} data       The data transfer
     * @private
     */
    async _onDropActor(event, data) {
        return false;
    }

    /**
     * Handle dropping of an item reference or item data onto an Actor Sheet
     * @param {DragEvent} event     The concluding DragEvent which contains drop data
     * @param {Object} data         The data transfer extracted from the event
     * @return {Object}             OwnedItem data to create
     * @private
     */
    async _onDropItem(event, data) {
        if (!this.actor.isOwner) return false;
        // let authorized = true;

        // let itemData = await this._getItemDropData(event, data);
        const item = await Item.fromDropData(data);
        const itemData = duplicate(item.data);
        switch (itemData.type) {
            case "profession" :
                return await Profession.addToActor(this.actor, event, itemData);
            case "origine" :
                return await Origines.addToActor(this.actor, event, itemData);
            default:
                // Handle item sorting within the same Actor
                const actor = this.actor;
                // Create the owned item
                let sameActor = (data.actorId === actor.id) && ((!actor.isToken && !data.tokenId) || (data.tokenId === actor.token.id));
                if (sameActor) return this._onSortItem(event, itemData);
 
                let globalSettingMoveItem = game.settings.get("aria","moveItem"); 
                let moveItem = globalSettingMoveItem ^ event.shiftKey;

                if(data.actorId && moveItem) {
                    if(!actor.data._id) {
                        console.warn("no data._id?",target);
                        return; 
                    }

                    let sourceActor = game.actors.get(data.actorId);
                    if(sourceActor) {

                        let chooseDifDialog = new Dialog({
                            title: "Difficulté",
                            content: "<p>Etes-vous sure de vouloir deplacer cet objet</p>",
                            buttons: {
                            one: {
                            label: "Oui",
                            callback: () => {

                                if (!data.tokenId){
                                    sourceActor.deleteEmbeddedDocuments("Item",[item.id]);
                                }
                                else{
                                    let token = TokenLayer.instance.placeables.find(token=>token.id === data.tokenId);
                                    let oldItem = token?.document.getEmbeddedCollection('Item').get(data.data._id);
                                    oldItem?.delete();
                                }

                                this.actor.createEmbeddedDocuments("Item", [itemData]);
                                
                            }
                            },
                            two: {
                            label: "Non",
                            callback: () => {}
                            },
                            },
                            default: "one",
                            });
                        chooseDifDialog.render(true);
                    }
                }
                else{
                    this.actor.createEmbeddedDocuments("Item", [itemData]);
                }

                return;
        }
    }

    /* -------------------------------------------- */

    /** @override */
    setPosition(options = {}) {
        const position = super.setPosition(options);
        const sheetBody = this.element.find(".sheet-body");
        const bodyHeight = position.height - 192;
        sheetBody.css("height", bodyHeight);
        return position;
    }

}
