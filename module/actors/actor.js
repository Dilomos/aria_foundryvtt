/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */

import {Traversal} from "../utils/traversal.js";

export class AriaActor extends Actor {

    /** @override */
  static async create(data, options={}) {
    data.items = data.items || [];

    let caps = game.aria.config.competences;

    if ( data.type === "character" ) {
        
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

    getOrigines(items) {
        return items.find(i => i.type === "origine")
    }

      /** @override */
  async modifyTokenAttribute(attribute, value, isDelta, isBar) {
    if ( attribute === "attributes.hp" ) {
      const hp = this.system.attributes.hp;

      hp.bonus = this.system.attributes.hp.max - value;
      return this.update({'system.attributes.hp.bonus': hp.bonus});
    }
    return super.modifyTokenAttribute(attribute, value, isDelta, isBar);
  }
}
