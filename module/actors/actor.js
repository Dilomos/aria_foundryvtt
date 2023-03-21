/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */

import {Traversal} from "../utils/traversal.js";

export class AriaActor extends Actor {

    /** @override */
  static async create(data, options={}) {

    if (typeof data.items === 'undefined') {

      data.items = [];

      let caps = game.aria.config.competences;

      if ( data.type === "character" ) {
          
          mergeObject(data.items, caps, {overwrite: false});
      }
  }

    //data.items = data.items || [];

   
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
      hp.value = this.system.attributes.hp.max - hp.bonus;
      return this.update({'system.attributes.hp': hp});
    }
    return super.modifyTokenAttribute(attribute, value, isDelta, isBar);
  }

      /** @override */
      async modifyActorBlessureAttribute( value) {
          const hp = this.system.attributes.hp;
          hp.bonus = value;
          hp.value = this.system.attributes.hp.max - hp.bonus;
          return this.update({'system.attributes.hp': hp});
      }
}
