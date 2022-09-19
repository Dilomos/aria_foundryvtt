import {Traversal} from "../utils/traversal.js";

export class Origines {

    static addToActor(actor, event, itemData) {
        if (actor.items.filter(item => item.type === "origine").length > 0) {
            ui.notifications.error("Vous avez déjà une origine.");
            return false;
        } else {
            let competences = duplicate(itemData.system.competences);
            competences.push(itemData);
            return actor.createEmbeddedDocuments("Item",competences);
        }
    }

    static removeFromActor(actor, event, entity) {
        return Dialog.confirm({
            title: "Supprimer l'origine' ?",
            content: `<p>Etes-vous sûr de vouloir supprimer l'origine de ${actor.name} ?</p>`,
            yes: () => {
                return actor.deleteEmbeddedDocuments("Item",[entity.id]);
            },
            defaultYes: false
        });
    }
}