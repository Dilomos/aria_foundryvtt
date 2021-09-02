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

ARIA.itemSubCategories = {
    "alchemy" : "ARIA.category.alchemy",
    "ranged" : "ARIA.category.ranged",
    "melee" : "ARIA.category.melee",
    "armor" : "ARIA.category.armor",
    "jewel" : "ARIA.category.jewel",
    "shield" : "ARIA.category.shield",
    "consumable" : "ARIA.category.consumable",
    "document" : "ARIA.category.document",
    "trapping" : "ARIA.category.other",
    "ingredient" : "ARIA.category.ingredient",
    "mount" : "ARIA.category.mount",
    "ammunition" : "ARIA.category.ammunition",
    "potion" : "ARIA.category.potion",
    "cloath" : "ARIA.category.cloath"
};

// Languages
ARIA.languages = {
    "common": "ARIA.languages.Common",
    "kohestien": "ARIA.languages.Kohestien",
    "aqab": "ARIA.languages.Aqab",
    "staum": "ARIA.languages.Staum",
    "osmanlien": "ARIA.languages.Osmanlien",
    "mon": "ARIA.languages.Mon",
    "nok": "ARIA.languages.Nok",
    "carredass": "ARIA.languages.Carredass",
    "blanc": "ARIA.languages.Blanc",
    "knigien": "ARIA.languages.Knigien",
    "esperan": "ARIA.languages.Esperan",
    "altabiancais": "ARIA.languages.Altabiancais",
    "altanegrais": "ARIA.languages.Altanegrais"
  };

ARIA.professions = [];
ARIA.origines = [];
ARIA.competences = [];
ARIA.competencesSpe = [];

// Mise en cache des données de profession
ARIA.getProfessions = async function () {
    let professions;
    let professionsactualplay;
    let professionsexceptions;

    if(game.settings.get("aria", "ariaVersion") == "aria"){
        professions = await game.packs.get("aria.professions").getDocuments().then(index => index.map(entity => entity.data));
        professionsactualplay = await game.packs.get("aria.professionsactualplay").getDocuments().then(index => index.map(entity => entity.data));
        professionsexceptions = await game.packs.get("aria.professionsexceptions").getDocuments().then(index => index.map(entity => entity.data));
        ARIA.professions = professions.concat(professionsactualplay).concat(professionsexceptions);
    }else{
        if(game.settings.get("aria", "ariaVersion") == "stars"){
            professions = await game.packs.get("aria.professionsstars").getDocuments().then(index => index.map(entity => entity.data));
            ARIA.professions = professions;
        }else{
            professions = await game.packs.get("aria.professionscont").getDocuments().then(index => index.map(entity => entity.data));
            ARIA.professions = professions;
        }
    }
    
    console.debug("Professions loaded");
};

// Mise en cache des données d'origine
ARIA.getOrigines = async function () {
    let origines;
    
    if(game.settings.get("aria", "ariaVersion") == "aria"){
        origines = await game.packs.get("aria.origines").getDocuments().then(index => index.map(entity => entity.data));
    }else{
        if(game.settings.get("aria", "ariaVersion") == "stars"){
            origines = await game.packs.get("aria.originesstars").getDocuments().then(index => index.map(entity => entity.data));
        }else{
            origines = await game.packs.get("aria.originescont").getDocuments().then(index => index.map(entity => entity.data));
        }
    }
    ARIA.origines = origines;
    console.debug("Origines loaded");
};


// Mise en cache des données de compétences
ARIA.getCompetences = async function () {
    let competences;

    if(game.settings.get("aria", "ariaVersion") == "aria"){
        competences = await game.packs.get("aria.competences").getDocuments().then(index => index.map(entity => entity.data));
    }else{
        if(game.settings.get("aria", "ariaVersion") == "stars"){
            competences = await game.packs.get("aria.competencesstars").getDocuments().then(index => index.map(entity => entity.data));
        }else{
            competences = await game.packs.get("aria.competencescont").getDocuments().then(index => index.map(entity => entity.data));
        }
    }
    ARIA.competences = competences;
    console.debug("Competences loaded");
};

// Mise en cache des données de compétences
ARIA.getCompetencesSpe = async function () {
    let competencesspepretire;
    let competencesspeexception;
    
    if(game.settings.get("aria", "ariaVersion") == "aria"){
        competencesspepretire = await game.packs.get("aria.competencesspepretire").getDocuments().then(index => index.map(entity => entity.data));
        competencesspeexception = await game.packs.get("aria.competencesspeexception").getDocuments().then(index => index.map(entity => entity.data));
        ARIA.competencesSpe = competencesspepretire.concat(competencesspeexception);
    }else{
        if(game.settings.get("aria", "ariaVersion") == "stars"){
            competencesspepretire = await game.packs.get("aria.competencesspepretirestars").getDocuments().then(index => index.map(entity => entity.data));
            ARIA.competencesSpe = competencesspepretire;
        }else{
            competencesspepretire = await game.packs.get("aria.competencesspepretirestars").getDocuments().then(index => index.map(entity => entity.data));
            ARIA.competencesSpe = competencesspepretire;
        }
    }
    
    console.debug("Competences loaded");
};

ARIA.itemTypes = {
    "origine": "ARIA.category.origines",
    "profession": "ARIA.category.profession",
    "competence": "ARIA.category.competence"
};

