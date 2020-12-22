/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {

    // Define template paths to load
    const templatePaths = [
        // ACTOR
        "systems/aria/templates/actors/character/parts/character-header.hbs",
        "systems/aria/templates/actors/character/parts/character-description.hbs",

        "systems/aria/templates/actors/character/parts/stats/character-attacks.hbs",
        "systems/aria/templates/actors/character/parts/stats/character-hp.hbs",
        "systems/aria/templates/actors/character/parts/stats/character-attributes.hbs",
        "systems/aria/templates/actors/character/parts/stats/character-stats.hbs",

        "systems/aria/templates/actors/character/parts/capacities/character-capacities.hbs",

        "systems/aria/templates/actors/character/parts/combat/character-combat.hbs",
        "systems/aria/templates/actors/character/parts/combat/character-combat-item.hbs",

        "systems/aria/templates/actors/character/parts/inventory/character-inventory.hbs",
        "systems/aria/templates/actors/character/parts/inventory/character-inventory-item.hbs",

        // ITEMS DETAILS
        "systems/aria/templates/items/parts/details/item-details.hbs",
        "systems/aria/templates/items/parts/details/capacity-details.hbs",
        "systems/aria/templates/items/parts/details/profession-details.hbs",
        "systems/aria/templates/items/parts/details/protection-details.hbs",
        "systems/aria/templates/items/parts/details/ranged-details.hbs",
        "systems/aria/templates/items/parts/details/origines-details.hbs",
        "systems/aria/templates/items/parts/details/equipment-details.hbs",
        "systems/aria/templates/items/parts/details/weapon-details.hbs",
        "systems/aria/templates/items/parts/details/usage-details.hbs",
        "systems/aria/templates/items/parts/details/effects-details.hbs",
    ];

    // Load the template parts
    return loadTemplates(templatePaths);
};
