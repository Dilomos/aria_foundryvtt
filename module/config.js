export const System = {};

System.label = "Aria";
System.abbrev = "ARIA VTT";
System.name = "aria";
System.rootPath = "/systems/" + System.name;
System.dataPath = System.rootPath + "/_data";
System.templatesPath = System.rootPath + "/templates";
System.logPrefix = System.abbrev;
System.debugMode = true;

export const ARIA = {};

ARIA.itemProperties = {
    "equipable": "ARIA.properties.equipable",
    "stackable": "ARIA.properties.stackable",
    "unique": "ARIA.properties.unique",
    "tailored": "ARIA.properties.tailored",
    "2h": "ARIA.properties.2H",
    "predilection": "ARIA.properties.predilection",
    "ranged": "ARIA.properties.ranged",
    "proficient": "ARIA.properties.proficient",
    "finesse": "ARIA.properties.finesse",
    "two-handed": "ARIA.properties.two-handed",
    "equipment": "ARIA.properties.equipment",
    "weapon": "ARIA.properties.weapon",
    "protection": "ARIA.properties.protection",
    "reloadable": "ARIA.properties.reloadable",
    "bow": "ARIA.properties.bow",
    "crossbow": "ARIA.properties.crossbow",
    "powder": "ARIA.properties.powder",
    "throwing": "ARIA.properties.throwing",
    "dr": "ARIA.properties.dr",
    "sneak": "ARIA.properties.sneak",
    "powerful": "ARIA.properties.powerful",
    "critscience": "ARIA.properties.critscience",
    "specialization": "ARIA.properties.specialization",
    "effects": "ARIA.properties.effects",
    "activable": "ARIA.properties.activable",
    "2H": "ARIA.properties.2H",
    "13strmin": "ARIA.properties.13strmin",
    "bashing": "ARIA.properties.bashing",
    "sling": "ARIA.properties.sling",
    "spell": "ARIA.properties.spell",
    "profile": "ARIA.properties.profile",
    "prestige": "ARIA.properties.prestige",
    "alternative": "ARIA.properties.alternative",
    "racial": "ARIA.properties.racial",
    "creature" : "ARIA.properties.creature"
};

ARIA.profiles = [];
ARIA.species = [];
ARIA.capacities = [];

// Mise en cache des données de profil
ARIA.getProfiles = async function () {
    let profiles = await game.packs.get("aria.profiles").getContent().then(index => index.map(entity => entity.data));
    ARIA.profiles = profiles;
    console.debug("Profiles loaded");
};

// Mise en cache des données de races
ARIA.getSpecies = async function () {
    let species = await game.packs.get("aria.species").getContent().then(index => index.map(entity => entity.data));
    ARIA.species = species;
    console.debug("Species loaded");
};


// Mise en cache des données de capacités
ARIA.getCapacities = async function () {
    let capacities = await game.packs.get("aria.capacities").getContent().then(index => index.map(entity => entity.data));
    ARIA.capacities = capacities;
    console.debug("Capacities loaded");
};

ARIA.itemTypes = {
    "species": "ARIA.category.species",
    "profile": "ARIA.category.profile",
    "capacity": "ARIA.category.capacity",
    "trapping": "ARIA.category.trapping",
    "melee": "ARIA.category.melee",
    "armor": "ARIA.category.armor",
    "shield": "ARIA.category.shield",
    "ranged": "ARIA.category.ranged"
};

