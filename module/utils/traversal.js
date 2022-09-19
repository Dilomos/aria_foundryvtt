export class Traversal {

    static async getEntity(id, type, pack) {
        let entity = null;
        // Case 1 - Import from World entities
        if(type === "item") entity = game.items.get(id);
        else if(type === "actor") entity = game.actors.get(id);
        else if(type === "journal") entity = game.journal.get(id);
        // Case 2 - Import from a Compendium pack
        if (!entity && pack) {
            await game.packs.get(pack).getEntity(id).then(e => entity = e);
        }
        return entity;
    }

    static getAllEntitiesOfType(type, pack) {
        const compendium = game.packs.get(pack).getContent();
        const ingame = game.items.filter(item => item.type === type);
        return ingame.concat(compendium);
    }

    static getItemsOfType(type) {
        let compendium = [];
        let ingame = [];
        switch(type){
            case "competence" :
                compendium = game.aria.config.competences;
                ingame = game.items.filter(item => item.type === "competence").map(entity => entity.toObject(false));
                break;
        }
        return ingame.concat(compendium);
    }

    /*
     * DATA
     */

    static getInGameEntitiesDataOfType (type) {
        return game.items.filter(item => item.type === type).map(entity => entity.toObject(false));
    }

    //world + compendium can create duplicate
    static getAllCompetencesData () {
        const compendium = game.aria.config.competences;
        const compendiumSpe = game.aria.config.competencesSpe;
        const ingame = this.getInGameEntitiesDataOfType("competence");
        return ingame.concat(compendium).concat(compendiumSpe);
    }

    //world + compendium can create duplicate
    static getAllProfessionsData () {
        const compendium = game.aria.config.professions;
        const ingame = this.getInGameEntitiesDataOfType("profession");
        return ingame.concat(compendium);
    }

    //world + compendium can create duplicate
    static getAllOriginesData () {
        const compendium = game.aria.config.origines;
        const ingame = this.getInGameEntitiesDataOfType("origines");
        return ingame.concat(compendium);
    }
}