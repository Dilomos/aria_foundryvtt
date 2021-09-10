/**
 * A simple and flexible system for world-building using an arbitrary collection of character and item attributes
 * Author: Atropos
 * Software License: GNU GPLv3
 */

// Import Modules
import {System,ARIA} from "./config.js";
import { registerSystemSettings } from "./settings.js";
import { preloadHandlebarsTemplates } from "./templates.js";
import { AriaTokenDocument } from "./token.js";

import {AriaActor} from "./actors/actor.js";
import {AriaItem} from "./items/item.js";

import {AriaItemSheet} from "./items/item-sheet.js";
import {AriaCharacterSheet} from "./actors/character-sheet.js";
import {AriaLootSheet} from "./actors/loot-sheet.js";

import { registerHandlebarsHelpers } from "./helpers.js";

import {Macros} from "./system/macros.js";


Hooks.once("init", async function () {

    console.info("Aria System Initializing...");

    // Register System Settings
    registerSystemSettings();    

    /**
     * Set an initiative formula for the system
     * @type {String}
     */

    CONFIG.Combat.initiative = {
        formula: "@attributes.init.value/100",
        decimals: 2
    };

    CONFIG.ARIA = ARIA;
    // Define custom Entity classes
    CONFIG.Actor.documentClass = AriaActor;
    CONFIG.Item.documentClass = AriaItem;
    CONFIG.Token.documentClass = AriaTokenDocument;

    // Create a namespace within the game global
    game.aria = {
        skin : "base",
        macros : Macros,
        config: ARIA
    };

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Items.unregisterSheet("core", ItemSheet);

    // Register item sheets
    Items.registerSheet("aria", AriaItemSheet, {
        types: ["item", "competence", "profession", "origine"],
        makeDefault: true,
        label: "ARIA.SheetClassItem"
    });

        // Register actor sheets
    Actors.registerSheet("aria", AriaCharacterSheet, {
        types: ["character","npc"], 
        makeDefault: true,
        label: "ARIA.SheetClassCharacter"
    });

      // Register actor sheets
      Actors.registerSheet("aria", AriaLootSheet, {
        types: ["loot"], 
        makeDefault: true,
        label: "ARIA.SheetClassLoot"
    });

    

    // Preload Handlebars Templates
    preloadHandlebarsTemplates();

    // Register Handlebars helpers
    registerHandlebarsHelpers();

});

Hooks.once("setup", function() {

    const toLocalize = [
        "itemProperties", "itemSubCategories", "languages"
      ];

  // Exclude some from sorting where the default order matters
  const noSort = [
    "itemProperties", "itemSubCategories", "languages"
  ];

  // Localize and sort CONFIG objects
  for ( let o of toLocalize ) {
    const localized = Object.entries(CONFIG.ARIA[o]).map(e => {
      return [e[0], game.i18n.localize(e[1])];
    });
    if ( !noSort.includes(o) ) localized.sort((a, b) => a[1].localeCompare(b[1]));
    CONFIG.ARIA[o] = localized.reduce((obj, e) => {
      obj[e[0]] = e[1];
      return obj;
    }, {});
  }

  });


  /* -------------------------------------------- */

/**
 * Once the entire VTT framework is initialized, check to see if we should perform a data migration
 */
Hooks.once("ready", function() {

    if( (game.settings.get("aria", "ariaVersion") == "aria")
    || (game.settings.get("aria", "ariaVersion") == "stars")
    || (game.settings.get("aria", "ariaVersion") == "contemporain") )
    {
      console.info("Aria Skin : "+game.settings.get("aria", "ariaVersion"));
    }
    else{
      game.settings.set("aria", "ariaVersion", "aria");
      console.info("Aria Skin Reset : "+game.settings.get("aria", "ariaVersion"));
    }

});
