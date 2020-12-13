/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
import {Stats} from "../system/stats.js";

export class AriaActor extends Actor {

    /** @override */
    prepareBaseData() {
        super.prepareBaseData();
        let actorData = this.data;
        if (actorData.type === "encounter") this._prepareBaseEncounterData(actorData);
        else this._prepareBaseCharacterData(actorData);
    }

    /* -------------------------------------------- */

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();
        let actorData = this.data;
        if (actorData.type === "encounter") this._prepareDerivedEncounterData(actorData);
        else this._prepareDerivedCharacterData(actorData);
    }

    /* -------------------------------------------- */

    _prepareBaseCharacterData(actorData) {
        this.computeModsAndAttributes(actorData);
    }

    /* -------------------------------------------- */

    _prepareDerivedCharacterData(actorData) {
    }

    /* -------------------------------------------- */

    _prepareBaseEncounterData(actorData) {
        // STATS
        let stats = actorData.data.stats;
        // COMPUTE STATS FROM MODS

        // ATTACKS
        /*if (!actorData.data.attacks) {
            actorData.data.attacks = {
                "melee": {
                    "key": "melee",
                    "label": "ARIA.attacks.melee.label",
                    "abbrev": "ARIA.attacks.melee.abbrev",
                    "enabled": true,
                    "base": Math.ceil(actorData.data.nc.value) ,
                    "bonus": 0,
                },
                "ranged": {
                    "key": "ranged",
                    "label": "ARIA.attacks.ranged.label",
                    "abbrev": "ARIA.attacks.ranged.abbrev",
                    "enabled": true,
                    "base": Math.ceil(actorData.data.nc.value) ,
                    "bonus": 0
                },
                "magic": {
                    "key": "magic",
                    "label": "ARIA.attacks.magic.label",
                    "abbrev": "ARIA.attacks.magic.abbrev",
                    "enabled": true,
                    "base": Math.ceil(actorData.data.nc.value),
                    "bonus": 0
                }
            }
        } else {
            
        }*/

        // MODIFY TOKEN REGARDING SIZE
        switch (actorData.data.details.size) {
            case "big":
                actorData.token.width = 2;
                actorData.token.height = 2;
                break;
            case "huge":
                actorData.token.width = 4;
                actorData.token.height = 4;
                break;
            case "colossal":
                actorData.token.width = 8;
                actorData.token.height = 8;
                break;
            case "tiny":
            case "small":
            case "short":
            case "med":
            default:
                break;
        }
    }

    /* -------------------------------------------- */

    _prepareDerivedEncounterData(actorData) {}

    /* -------------------------------------------- */

    getActiveSpells(items) {
        // return items.filter(item => item.type === "spell" && item.data.worn)
        return items.filter(item => item.type === "spell")
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

        let stats = actorData.data.stats;
        let attributes = actorData.data.attributes;
        let items = actorData.items;
        let lvl = actorData.data.attributes.age.value;
        let species = this.getSpecies(items);
        let profile = this.getProfile(items);

        for(const [key, stat] of Object.entries(stats)){
            stat.racial = (species && species.data.bonuses[key]) ? species.data.bonuses[key] : stat.racial;
            stat.value = stat.base + stat.racial + stat.bonus;
        }
    }
}
