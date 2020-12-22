/**
 * Ready hook loads tables, and override's foundry's entity link functions to provide extension to pseudo entities
 */

import {DataLoader} from "../data.js";
import {UpdateUtils} from "../utils/update-utils.js";

Hooks.once("ready", async () => {
    await game.aria.config.getProfessions();
    await game.aria.config.getSpecies();
    await game.aria.config.getCapacities();

    console.info("System Initialized.");

});
