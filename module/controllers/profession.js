import {Traversal} from "../utils/traversal.js";

export class Profession {

    static addToActor(actor, event, itemData) {
        if (actor.items.filter(item => item.type === "profession").length > 0) {
            ui.notifications.error("Vous avez déjà une profession.");
            return false;
        } else {
            let competences = duplicate(itemData.data.competences);
            competences.push(itemData);
            return actor.createOwnedItem(competences)
        }
    }

    static removeFromActor(actor, event, entity) {
        const professionData = entity.data;
        return Dialog.confirm({
            title: "Supprimer le profession ?",
            content: `<p>Etes-vous sûr de vouloir supprimer la profession de ${actor.name} ?</p>`,
            yes: () => {
                return actor.deleteOwnedItem(entity._id);
            },
            defaultYes: false
        });
    }

}