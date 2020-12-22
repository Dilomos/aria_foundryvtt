import {Traversal} from "../utils/traversal.js";

export class Capacity {
    /**
     * Callback on capacity create action
     * @param event the create event
     * @private
     */
    static create(actor, special=false) {
        if(special)
        {
            const data = {name: "Nom de la Capacitée", type: "capacity", data: {special: true}};
            return actor.createOwnedItem(data, {renderSheet: true}); // Returns one Entity, saved to the database
        }
        else
        {
            const data = {name: "Nom de la Capacitée", type: "capacity", data: {}};
            return actor.createOwnedItem(data, {renderSheet: true}); // Returns one Entity, saved to the database
        }
    }
}