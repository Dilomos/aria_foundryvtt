/**
 * Ready hook loads tables, and override's foundry's entity link functions to provide extension to pseudo entities
 */

import {DataLoader} from "../data.js";
import {UpdateUtils} from "../utils/update-utils.js";

Hooks.once("ready", async () => {
    await game.aria.config.getProfessions();
    await game.aria.config.getOrigines();
    await game.aria.config.getCompetences();
    await game.aria.config.getCompetencesSpe();

    console.info(game.settings.get("aria", "deckSetting"));

    let characters = game.actors.filter(act => act.type == "character");
    for (let charac of characters) {
        let items = charac.items;
        let caps = items.filter(item => item.type === "competence").sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        let caps_spe = caps.filter(item => item.system.special === true);
        let caps_magie = caps.filter(item => item.name === "Modélisation");
        if(caps_magie.length > 0)
        {
            if (!charac.getDefaultHand()) {
                await charac.createDefaultCards();
            }
        }
    }

    console.info("-------------------------------------System Initialized.");

});
    