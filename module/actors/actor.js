/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */

import {Traversal} from "../utils/traversal.js";

export class AriaActor extends Actor {

    /** @override */
  static async create(data, options={}) {
    data.items = data.items || [];
    if ( data.type === "character" ) {
        let caps = Traversal.getAllCapacitiesData();
        mergeObject(data.items, caps, {overwrite: false});
    }
    let enti = super.create(data, options);

    return enti;
  }

    /** @override */
    prepareBaseData() {
        super.prepareBaseData();
    }

    prepareData() {
        super.prepareData();
    }

    /* -------------------------------------------- */

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();
    }

    /* -------------------------------------------- */

    getProfession(items) {
        return items.find(i => i.type === "profession")
    }

    /* -------------------------------------------- */

    getSpecies(items) {
        return items.find(i => i.type === "species")
    }

    /* -------------------------------------------- */

    getActiveCapacities(items) {
        return items.filter(i => i.type === "capacity" && i.data.rank)
    }


      /** @override */
  async modifyTokenAttribute(attribute, value, isDelta, isBar) {
    if ( attribute === "attributes.hp" ) {
      const hp = getProperty(this.data.data, attribute);

      let actorData = this.data;
      let attributes = actorData.data.attributes;

      attributes.hp.bonus = attributes.hp.max - value;
      return this.update({'data.attributes.hp.bonus': attributes.hp.bonus});
    }
    return super.modifyTokenAttribute(attribute, value, isDelta, isBar);
  }
}
