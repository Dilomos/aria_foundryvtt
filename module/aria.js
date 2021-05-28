/**
 * A simple and flexible system for world-building using an arbitrary collection of character and item attributes
 * Author: Atropos
 * Software License: GNU GPLv3
 */

// Import Modules
import {System,ARIA} from "./config.js";
import { registerSystemSettings } from "./settings.js";
import { preloadHandlebarsTemplates } from "./templates.js";
import { getBarAttribute } from "./canvas.js";

import {AriaActor} from "./actors/actor.js";
import {AriaItem} from "./items/item.js";

import {AriaItemSheet,AriaModernItemSheet,AriaStarsItemSheet} from "./items/item-sheet.js";
import {AriaCharacterSheet,AriaStarsCharacterSheet,AriaModernCharacterSheet} from "./actors/character-sheet.js";

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
    CONFIG.Actor.entityClass = AriaActor;
    CONFIG.Item.entityClass = AriaItem;

    // Create a namespace within the game global
    game.aria = {
        skin : "base",
        macros : Macros,
        config: ARIA
    };

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Items.unregisterSheet("core", ItemSheet);

    if(game.settings.get("aria", "ariaVersion") == "aria"){
      // Register item sheets
      Items.registerSheet("aria", AriaItemSheet, {
          types: ["item", "competence", "profession", "origine"],
          makeDefault: true,
          label: "ARIA.SheetClassItem"
      });

          // Register actor sheets
      Actors.registerSheet("aria", AriaCharacterSheet, {
          types: ["character"], 
          makeDefault: true,
          label: "ARIA.SheetClassCharacter"
      });

    }

    if(game.settings.get("aria", "ariaVersion") == "stars"){
        // Register item sheets
      Items.registerSheet("aria", AriaStarsItemSheet, {
          types: ["item", "competence", "profession", "origine"],
          makeDefault: true,
          label: "ARIA.SheetStarsClassItem"
      });

      Actors.registerSheet("aria", AriaStarsCharacterSheet, {
        types: ["character"], 
        makeDefault: true,
        label: "ARIA.SheetStarsClassCharacter"
      });

    }

    if(game.settings.get("aria", "ariaVersion") == "contemporain"){
          // Register item sheets
      Items.registerSheet("aria", AriaModernItemSheet, {
        types: ["item", "competence", "profession", "origine"],
        makeDefault: true,
        label: "ARIA.SheetModernClassItem"
      });

      Actors.registerSheet("aria", AriaModernCharacterSheet, {
        types: ["character"], 
        makeDefault: true,
        label: "ARIA.SheetModernClassCharacter"
      });

    }

    // Preload Handlebars Templates
    preloadHandlebarsTemplates();

    // Register Handlebars helpers
    registerHandlebarsHelpers();

});

Hooks.once("setup", function() {

    const toLocalize = [
        "itemProperties", "languages"
      ];

  // Exclude some from sorting where the default order matters
  const noSort = [
    "itemProperties", "languages"
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

Hooks.on("canvasInit", function() {
    // Extend Token Resource Bars
  Token.prototype.getBarAttribute = getBarAttribute;
  });
