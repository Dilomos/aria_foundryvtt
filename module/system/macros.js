import {AriaRoll} from "../controllers/roll.js";

export class Macros {

    static getSpeakersActor = function(){
        const speaker = ChatMessage.getSpeaker();
        let actor;
        // if a token is selected take it as target actor
        if (speaker.token) actor = game.actors.tokens[speaker.token];
        // otherwise take the default actor for current user
        if (!actor) actor = game.actors.get(speaker.actor);
        return actor;
    }

    static rollItemMacro = function (itemId, itemName, itemType) {
        const actor = this.getSpeakersActor()
        let item;
        item = actor ? actor.items.find(i => i.name === itemName && i.type == itemType) : null;
        if (!item) return ui.notifications.warn(`${game.i18n.localize("ARIA.notification.MacroItemMissing")}: "${itemName}"`);
        const itemData = item.data;
        if(itemData.data.properties.weapon){
            if(itemData.data.equiped){
                let label = itemData.name;
                let mod = itemData.data.mod;
                let critrange = itemData.data.critrange;
                let dmg = itemData.data.dmg;
                AriaRoll.rollWeaponDialog(actor, label, mod, 0, critrange, dmg);
            }
            else return ui.notifications.warn(`${game.i18n.localize("ARIA.notification.MacroItemUnequiped")}: "${itemName}"`);
        }
        else{
            return item.sheet.render(true);
        }
    };


}
