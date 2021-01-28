import {Traversal} from "../utils/traversal.js";

export class Origines {

    static addToActor(actor, event, itemData) {
        if (actor.items.filter(item => item.type === "origine").length > 0) {
            ui.notifications.error("Vous avez déjà une origine.");
            return false;
        } else {
            let competences = duplicate(itemData.data.competences);
            competences.push(itemData);
            return actor.createOwnedItem(competences)
        }
    }

    static removeFromActor(actor, event, entity) {
        const actorData = actor.data;
        const originesData = entity.data;
        return Dialog.confirm({
            title: "Supprimer l'origine' ?",
            content: `<p>Etes-vous sûr de vouloir supprimer l'origine de ${actor.name} ?</p>`,
            yes: () => {
                return actor.deleteOwnedItem(entity.data._id);
            },
            defaultYes: false
        });
    }
}