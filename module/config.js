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
    "ranged": "ARIA.properties.ranged",
    "equipment": "ARIA.properties.equipment",
    "weapon": "ARIA.properties.weapon",
    "protection": "ARIA.properties.protection",
    "2Handed": "ARIA.properties.2Handed"
};

ARIA.professions = [];
ARIA.origines = [];
ARIA.competences = [];
ARIA.competencesSpe = [];

// Mise en cache des données de profession
ARIA.getProfessions = async function () {
    let professions = await game.packs.get("aria.professions").getContent().then(index => index.map(entity => entity.data));
    let professionsactualplay = await game.packs.get("aria.professionsactualplay").getContent().then(index => index.map(entity => entity.data));
    let professionsexceptions = await game.packs.get("aria.professionsexceptions").getContent().then(index => index.map(entity => entity.data));
    ARIA.professions = professions.concat(professionsactualplay).concat(professionsexceptions);
    console.debug("Professions loaded");
};

// Mise en cache des données d'origine
ARIA.getOrigines = async function () {
    let origines = await game.packs.get("aria.origines").getContent().then(index => index.map(entity => entity.data));
    ARIA.origines = origines;
    console.debug("Origines loaded");
};


// Mise en cache des données de compétences
ARIA.getCompetences = async function () {
    let competences = await game.packs.get("aria.competences").getContent().then(index => index.map(entity => entity.data));
    ARIA.competences = competences;
    console.debug("Competences loaded");
};

// Mise en cache des données de compétences
ARIA.getCompetencesSpe = async function () {
    let competencesspepretire = await game.packs.get("aria.competencesspepretire").getContent().then(index => index.map(entity => entity.data));
    let competencesspeexception = await game.packs.get("aria.competencesspeexception").getContent().then(index => index.map(entity => entity.data));
    ARIA.competencesSpe = competencesspepretire.concat(competencesspeexception);
    console.debug("Competences loaded");
};

ARIA.itemTypes = {
    "origine": "ARIA.category.origines",
    "profession": "ARIA.category.profession",
    "competence": "ARIA.category.competence"
};

