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

    // static async getEntity(id, type, pack) {
    //     let entity = null;
    //     // Target 1 - Compendium Link
    //     if ( pack ) {
    //         const pack = game.packs.get(pack);
    //         await pack.getIndex();
    //         entity = id ? await pack.getEntity(id) : null;
    //     }
    //     // Target 2 - World Entity Link
    //     else {
    //         if(type==="item") entity = game.items.get(id);
    //         else if(type==="journal") entity = game.journal.get(id);
    //         else if(type==="actor") entity = game.actors.get(id);
    //     }
    //     // if ( !entity ) return;
    //     // // Action 1 - Execute an Action
    //     // if ( entity.entity === "Macro" ) {
    //     //     if ( !entity.hasPerm(game.user, "LIMITED") ) {
    //     //         return ui.notifications.warn(`You do not have permission to use this ${entity.entity}.`);
    //     //     }
    //     //     return entity.execute();
    //     // }
    //     //
    //     // // Action 2 - Render the Entity sheet
    //     // return entity.sheet.render(true);
    //     return entity;
    // }

    static getAllEntitiesOfType(type, pack) {
        const compendium = game.packs.get(pack).getContent();
        const ingame = game.items.filter(item => item.type === type);
        return ingame.concat(compendium);
    }

    static getItemsOfType(type) {
        let compendium = [];
        let ingame = [];
        switch(type){
            case "path" :
                compendium = game.aria.config.paths;
                ingame = game.items.filter(item => item.type === "path").map(entity => entity.data);
                break;
            case "capacity" :
                compendium = game.aria.config.capacities;
                ingame = game.items.filter(item => item.type === "capacity").map(entity => entity.data);
                break;
        }
        return ingame.concat(compendium);
    }

    /*
     * DATA
     */

    static getInGameEntitiesDataOfType (type) {
        return game.items.filter(item => item.type === type).map(entity => entity.data);
    }

    static getAllCapacitiesData () {
        const compendium = game.aria.config.capacities;
        const ingame = this.getInGameEntitiesDataOfType("capacity");
        return ingame.concat(compendium);
    }

    static getAllPathsData () {
        const compendium = game.aria.config.paths;
        const ingame = this.getInGameEntitiesDataOfType("path");
        return ingame.concat(compendium);
    }

    static getAllProfilesData () {
        const compendium = game.aria.config.profiles;
        const ingame = this.getInGameEntitiesDataOfType("profile");
        return ingame.concat(compendium);
    }

    static getAllSpeciesData () {
        const compendium = game.aria.config.species;
        const ingame = this.getInGameEntitiesDataOfType("species");
        return ingame.concat(compendium);
    }

    static findPathDataByKey (key) {
        return this.getAllPathsData().find(entity => entity.data.key === key);
    }

}