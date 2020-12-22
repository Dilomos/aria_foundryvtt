import {Traversal} from "../utils/traversal.js";

export class Origines {

    static addToActor(actor, event, itemData) {
        if (actor.items.filter(item => item.type === "origine").length > 0) {
            ui.notifications.error("Vous avez déjà une race.");
            return false;
        } else {
            let items = game.aria.config.capacities.filter(e => itemData.data.capacities.includes(e._id));
            items.push(itemData);
            return actor.createOwnedItem(items);
        }
    }

    static removeFromActor(actor, event, entity) {
        const actorData = actor.data;
        const originesData = entity.data;
        return Dialog.confirm({
            title: "Supprimer la race ?",
            content: `<p>Etes-vous sûr de vouloir supprimer la race de ${actor.name} ?</p>`,
            yes: () => {
                const caps = Traversal.getItemsOfType("capacity").filter(c => originesData.data.capacities.includes(c._id));
                const capsKeys = caps.map(c => c.data.key);
                const capsIds = actorData.items.filter(item => capsKeys.includes(item.data.key) && item.type === "capacity").map(c => c._id);
                let items = capsIds;

                items.push(entity.data._id);
                return actor.deleteOwnedItem(items);
            },
            defaultYes: false
        });
    }
}