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

import {AriaPlayerHand} from "./cards/player-hand.js";
import {AriaCards} from "./cards/cards.js";

import { registerHandlebarsHelpers } from "./helpers.js";

import {Macros} from "./system/macros.js";

import * as AriaChat from "./chat.js";


Hooks.once("init", async function () {

    console.info("----------   Aria : System Initializing...");

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

    CONFIG.Combat.initiative.formula = "@attributes.initiative+1d6 ";

    CONFIG.Cards.documentClass = AriaCards;

    // Create a namespace within the game global
    game.aria = {
        skin : "base",
        macros : Macros,
        config: ARIA
    };

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Items.unregisterSheet("core", ItemSheet);

    console.info("Aria : Standard sheets unregistered");

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

    DocumentSheetConfig.registerSheet(Cards, "core", AriaPlayerHand, { label: "Aria Player Hand", types: ["hand"], makeDefault: true });
    
    console.info("Aria : New sheets registered");
    

    // Preload Handlebars Templates
    preloadHandlebarsTemplates();

    // Register Handlebars helpers
    registerHandlebarsHelpers();

    CONFIG.TinyMCE.content_css.push("/systems/aria/css/aria_TinyMCE.css");

    console.info("Aria : Init Done");

});

Hooks.once("setup", function() {

  console.info("Aria : Setup...");

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

  console.info("Aria : Setup done");

  });


  /* -------------------------------------------- */

/**
 * Once the entire VTT framework is initialized, check to see if we should perform a data migration
 */
Hooks.once("ready", function() {

  console.info("Aria : Ready...");

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

    CONFIG.TinyMCE.style_formats.push({
      title: "Aria",
      items: [
        { title: "Info", block: "section", classes: "aria-info", wrapper: true },
        { title: "Texte", block: "section", classes: "aria-block aria-texte", wrapper: true },
        { title: "Règle", block: "section", classes: "aria-block aria-regle", wrapper: true },
        { title: "Point clé", block: "section", classes: "aria-block aria-point-cle", wrapper: true },
        { title: "Secret", block: "section", classes: "secret aria-block aria-secret", wrapper: true },
        { title: "Quête principale", block: "section", classes: "aria-block aria-quete-principale", wrapper: true },
        { title: "Quête parallèle", block: "section", classes: "aria-block aria-quete-parallele", wrapper: true },
        { title: "Quête personnelle", block: "section", classes: "aria-block aria-quete-personnelle", wrapper: true },
        { title: "Quête principale fin", block: "section", classes: "aria-block aria-quete-principale-fin", wrapper: true },
        { title: "Quête parallèle fin", block: "section", classes: "aria-block aria-quete-parallele-fin", wrapper: true },
        { title: "Quête personnelle fin", block: "section", classes: "aria-block aria-quete-personnelle-fin", wrapper: true },
        { title: "Quête résolue", block: "section", classes: "aria-block aria-quete-resolue", wrapper: true },
        { title: "Quête Personnage Exception", block: "section", classes: "aria-block aria-quete-exception", wrapper: true },
        { title: "Quête Alchimiste", block: "section", classes: "aria-block aria-quete-alchimiste", wrapper: true },
        { title: "Quête Magicien", block: "section", classes: "aria-block aria-quete-magicien", wrapper: true },
        { title: "Quête Noble", block: "section", classes: "aria-block aria-quete-noble", wrapper: true },
        { title: "Quête Combattant", block: "section", classes: "aria-block aria-quete-combattant", wrapper: true },
        { title: "Quête Dieu Ennemi", block: "section", classes: "aria-block aria-quete-ennemi", wrapper: true },
      ],
    });

});

Hooks.on("renderChatMessage", (app, html, data) => {AriaChat.sortCustomAgeChatCards(app, html, data)});

Hooks.on('updateActor', (actor, change, options, userId) => {
  //updating playerList with users character up-to-date data
  ui.players.render(true);

  if (actor.type === "character") {

    let items = actor.items;
    let caps = items.filter(item => item.type === "competence").sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    let caps_spe = caps.filter(item => item.system.special === true);
    let caps_magie = caps.filter(item => item.name === "Modélisation");
    if(caps_magie.length > 0)
    {
        let hand = actor.getDefaultHand()
        //If the update includes permissions, sync them to the hand
        if (hand && change.ownership && game.userId === userId) {
            //DO NOT PUT ANYTHING ELSE IN THIS UPDATE! diff:false, recursive:false can easily nuke stuff
            hand.update({ ownership: actor.getCardOwnership() }, { diff: false, recursive: false })
        }

        let deck = actor.getDefaultDeck()
        //If the update includes permissions, sync them to the deck
        if (deck && change.ownership && game.userId === userId) {
            //DO NOT PUT ANYTHING ELSE IN THIS UPDATE! diff:false, recursive:false can easily nuke stuff
            deck.update({ ownership: actor.getCardOwnership() }, { diff: false, recursive: false })
        }

        let discard = actor.getDefaultDiscard()
        //If the update includes permissions, sync them to the hand
        if (discard && change.ownership && game.userId === userId) {
            //DO NOT PUT ANYTHING ELSE IN THIS UPDATE! diff:false, recursive:false can easily nuke stuff
            discard.update({ ownership: actor.getCardOwnership() }, { diff: false, recursive: false })
        }
    }
  }
});
