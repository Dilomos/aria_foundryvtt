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
            width: 765,
            height: 700,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats"}],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        });
    }
}
