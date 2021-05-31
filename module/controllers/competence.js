import {Traversal} from "../utils/traversal.js";

export class Competence {
    /**
     * Callback on competence create action
     * @param event the create event
     * @private
     */
    static create(actor, special=false) {
        if(special)
        {
            const data = {name: "Nom de la Compétence", type: "competence", data: {special: true}};
            return actor.createEmbeddedDocuments("Item",[data], {renderSheet: true}); // Returns one Entity, saved to the database
        }
        else
        {
            const data = {name: "Nom de la Compétence", type: "competence", data: {}};
            return actor.createEmbeddedDocuments("Item",[data], {renderSheet: true}); // Returns one Entity, saved to the database
        }
    }
}