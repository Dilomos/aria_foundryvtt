import {Traversal} from "../utils/traversal.js";

export class Profession {

    static addToActor(actor, event, itemData) {
        if (actor.items.filter(item => item.type === "profession").length > 0) {
            ui.notifications.error("Vous avez déjà une profession.");
            return false;
        } else {
            // add paths from profession
            //let items = Traversal.getItemsOfType("path").filter(p => itemData.data.paths.includes(p._id));
            // add profession
            //items.push(itemData);
            return actor.createOwnedItem(itemData)
        }
    }

    static removeFromActor(actor, event, entity) {
        const professionData = entity.data;
        return Dialog.confirm({
            title: "Supprimer le profession ?",
            content: `<p>Etes-vous sûr de vouloir supprimer la profession de ${actor.name} ?</p>`,
            yes: () => {
                // retrieve path data from profession paths
                //const pathsKeys = Traversal.getItemsOfType("path").filter(p => professionData.data.paths.includes(p._id)).map(p => p.data.key);
                // retrieve owned items matching profession paths
                //const ownedPaths = actor.items.filter(item => pathsKeys.includes(item.data.data.key) && item.data.type === "path");
                //const ownedPathsIds = ownedPaths.map(c => c.data._id);
                //const ownedPathsCapacities = ownedPaths.map(c => c.data.data.capacities).flat();
                // retrieve owned capacities matching profession paths capacities
                //const capsKeys = Traversal.getItemsOfType("capacity").filter(p => ownedPathsCapacities.includes(p._id)).map(c => c.data.key);
               // const capsIds = actor.items.filter(item => capsKeys.includes(item.data.data.key) && item.data.type === "capacity").map(c => c.data._id);
                //let items = ownedPathsIds.concat(capsIds);
                // add the profession item to be removed
                //items.push(entity._id);
                return actor.deleteOwnedItem(entity._id);
            },
            defaultYes: false
        });
    }

}