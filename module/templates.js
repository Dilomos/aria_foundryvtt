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
        
        "systems/aria/templates/actors/character/parts/stats/character-attacks.hbs",
        "systems/aria/templates/actors/character/parts/stats/character-hp.hbs",
        "systems/aria/templates/actors/character/parts/stats/character-attributes.hbs",

        "systems/aria/templates/actors/character/parts/stats/attributes/character-attributes-str.hbs",
        "systems/aria/templates/actors/character/parts/stats/attributes/character-attributes-dex.hbs",
        "systems/aria/templates/actors/character/parts/stats/attributes/character-attributes-end.hbs",
        "systems/aria/templates/actors/character/parts/stats/attributes/character-attributes-int.hbs",
        "systems/aria/templates/actors/character/parts/stats/attributes/character-attributes-cha.hbs",
        "systems/aria/templates/actors/character/parts/stats/attributes/character-attributes-intu.hbs",

        "systems/aria/templates/actors/character/parts/stats/character-stats.hbs",

        "systems/aria/templates/actors/character/parts/competences/character-competences.hbs",

        "systems/aria/templates/actors/character/parts/inventory/character-inventory.hbs",
        "systems/aria/templates/actors/character/parts/inventory/character-inventory-item.hbs",

        "systems/aria/templates/actors/loot/parts/inventory/loot-inventory.hbs",
        "systems/aria/templates/actors/loot/parts/inventory/loot-inventory-item.hbs",
        "systems/aria/templates/actors/loot/parts/loot-header.hbs",

        // ITEMS DETAILS
        "systems/aria/templates/items/item-sheet.hbs",
        "systems/aria/templates/items/parts/details/item-details.hbs",
        "systems/aria/templates/items/parts/details/competence-details.hbs",
        "systems/aria/templates/items/parts/details/profession-details.hbs",
        "systems/aria/templates/items/parts/details/protection-details.hbs",
        "systems/aria/templates/items/parts/details/ranged-details.hbs",
        "systems/aria/templates/items/parts/details/origines-details.hbs",
        "systems/aria/templates/items/parts/details/equipment-details.hbs",
        "systems/aria/templates/items/parts/details/weapon-details.hbs"
    ];

    // Load the template parts
    return loadTemplates(templatePaths);
};
