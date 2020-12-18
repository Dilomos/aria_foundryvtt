/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
import {Stats} from "../system/stats.js";

export class AriaActor extends Actor {

    /** @override */
    prepareBaseData() {
        super.prepareBaseData();
        
        //this._prepareBaseCharacterData(actorData);
    }

    prepareData() {
        super.prepareData();
        /*let actorData = this.data;
        this._prepareBaseCharacterData(actorData);*/
    }

    /* -------------------------------------------- */

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();

        let actorData = this.data;
        let attributes = actorData.data.attributes;

        //attributes.hp.value = attributes.hp.max - attributes.hit.value;

        //let actorData = this.data;
        //this._prepareDerivedCharacterData(actorData);
    }

    /* -------------------------------------------- */

    _prepareBaseCharacterData(actorData) {
        this.computeModsAndAttributes(actorData);
    }

    /* -------------------------------------------- */

    _prepareDerivedCharacterData(actorData) {
    }


    /* -------------------------------------------- */

    getProfile(items) {
        return items.find(i => i.type === "profile")
    }

    /* -------------------------------------------- */

    getSpecies(items) {
        return items.find(i => i.type === "species")
    }

    /* -------------------------------------------- */

    getActiveCapacities(items) {
        return items.filter(i => i.type === "capacity" && i.data.rank)
    }


    /* -------------------------------------------- */

    computeModsAndAttributes(actorData) {
    }
}
