/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */

export class AriaItem extends Item {

    static createForActor(actor, event) {
        const data = {name: "Nom de l'objet", type: "item", data: {checked: true}};
        return actor.createEmbeddedDocuments("Item",[data], {renderSheet: true}); // Returns one Entity, saved to the database
    }

    initialize() {
        try {
            this.prepareData();
        } catch(err) {
            console.error(`Failed to initialize data for ${this.constructor.name} ${this.id}:`);
            console.error(err);
        }
    }

    /** @override */
    prepareData() {
        super.prepareData();
        const itemData = this;
        const actorData = (this.actor) ? this.actor : null;
        switch (itemData.type) {
            case "item" :
            case "spell" :
                this._prepareArmorData(itemData, actorData);
                this._prepareWeaponData(itemData, actorData);
                break;
            case "competence" :
            case "profession" :
            case "origine" :
                this.system.key = itemData.name.slugify({strict: true});
                break;
            case "trapping" :
                break;
            default :
                break;
        }
    }

    _prepareArmorData(itemData, actorData) {
        itemData.system.def = parseInt(itemData.system.defBase, 10) + parseInt(itemData.system.defBonus, 10);
    }

    _prepareShieldData(itemData, actorData) {
        this._prepareArmorData(itemData, actorData);
        this._prepareWeaponData(itemData, actorData);
    }

    _prepareWeaponData(itemData, actorData) {
        itemData.system.skillBonus = (itemData.system.skillBonus) ? itemData.system.skillBonus : 0;
        itemData.system.dmgBonus = (itemData.system.dmgBonus) ? itemData.system.dmgBonus : 0;
    }

}
