/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
import {GlobalAriaItemSheet} from "./globalitem-sheet.js";
import {System} from "../config.js";

export class AriaItemSheet extends GlobalAriaItemSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["aria", "sheet", "item", this.type],
            template: System.templatesPath + "/items/item-sheet_std.hbs",
            width: 600,
            height: 800,
            tabs: [{navSelector: ".sheet-navigation", contentSelector: ".sheet-body", initial: "description"}],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        });
    }
}

export class AriaStarsItemSheet extends GlobalAriaItemSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["aria", "sheet", "item", this.type],
            template: System.templatesPath + "/items/item-sheet_stars.hbs",
            width: 600,
            height: 800,
            tabs: [{navSelector: ".sheet-navigation", contentSelector: ".sheet-body", initial: "description"}],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        });
    }
}

export class AriaModernItemSheet extends GlobalAriaItemSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["aria", "sheet", "item", this.type],
            template: System.templatesPath + "/items/item-sheet_modern.hbs",
            width: 600,
            height: 800,
            tabs: [{navSelector: ".sheet-navigation", contentSelector: ".sheet-body", initial: "description"}],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        });
    }
}
