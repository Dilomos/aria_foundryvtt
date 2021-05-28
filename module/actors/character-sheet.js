/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
import {AriaActorSheet} from "./actor-sheet.js";
import {System} from "../config.js";

export class AriaCharacterSheet extends AriaActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["aria", "sheet", "actor", "character"],
            template: System.templatesPath + "/actors/character/character-sheet.hbs",
            width: 900,
            height: 910,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats"}],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        });
    }
}

export class AriaStarsCharacterSheet extends AriaActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["aria", "sheet", "actor", "character"],
            template: System.templatesPath + "/actors/character/character-sheet_stars.hbs",
            width: 900,
            height: 840,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats"}],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        });
    }
}

export class AriaModernCharacterSheet extends AriaActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["aria", "sheet", "actor", "character"],
            template: System.templatesPath + "/actors/character/character-sheet_modern.hbs",
            width: 900,
            height: 740,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats"}],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        });
    }
}
