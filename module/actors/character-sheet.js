/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
import {AriaActorSheet} from "./actor-sheet.js";
import {System} from "../config.js";

export class AriaCharacterSheet extends AriaActorSheet {

    static defaultHeight() {
        let height;
        if(game.settings.get("aria", "ariaVersion") == "aria")
            height = 920;
        if(game.settings.get("aria", "ariaVersion") == "stars")
            height = 850;
        if(game.settings.get("aria", "ariaVersion") == "contemporain")
            height = 780;
        return height;
    }

    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["aria", "sheet", "actor", "character"],
            template: System.templatesPath + "/actors/character/character-sheet.hbs",
            width: 910,
            height: this.defaultHeight(),
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats"}],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        });
    }

    
}
