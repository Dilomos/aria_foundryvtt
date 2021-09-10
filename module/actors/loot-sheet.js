/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
import {AriaActorSheet} from "./actor-sheet.js";
import {System} from "../config.js";

export class AriaLootSheet extends AriaActorSheet {

    static defaultHeight() {
        let height;
        if(game.settings.get("aria", "ariaVersion") == "aria")
            height = 770;
        if(game.settings.get("aria", "ariaVersion") == "stars")
            height = 730;
        if(game.settings.get("aria", "ariaVersion") == "contemporain")
            height = 730;
        return height;
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["aria", "sheet", "actor", "loot"],
            template: System.templatesPath + "/actors/loot/loot-sheet.hbs",
            width: 770,
            height: this.defaultHeight(),
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats"}],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        });
    }

    
}
