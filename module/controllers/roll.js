import {AriaSkillRoll} from "../system/skill-roll.js";
import {AriaDamageRoll} from "../system/dmg-roll.js";

export class AriaRoll {
    static options() {
        return { classes: ["aria", "dialog"] };
    }

    /**
     *  Handles skill check rolls
     * @param elt DOM element which raised the roll event
     * @param key the key of the attribute to roll
     * @private
     */
    static skillCheck(data, actor, event,multiplier) {
        const elt = $(event.currentTarget)[0];
        let key = elt.attributes["data-rolling"].value;
        let base = elt.attributes["data-rolling-value"].value;
        let cmpValue = eval(`${base}`)*multiplier;
        let label = eval(`${key}.label`);
        label = (label) ? game.i18n.localize(label) : null;
        let calcLabel = eval(`${base}`) +"x"+multiplier;
        let r = new AriaSkillRoll(label,calcLabel,cmpValue);
        r.roll(actor);
    }

    static competencyCheck(data, actor, event,modifier) {
        const elt = $(event.currentTarget)[0];
        let key = elt.attributes["data-rolling-value"].value;
        let bonus = elt.attributes["data-rolling-bonus"].value;

        if( (bonus.charAt(0) == '-') || (bonus.charAt(0) == '+') ){

        }else{
            bonus= '+' + bonus;
        }

        if(modifier)
        {
            if( (modifier.charAt(0) == '-') || (modifier.charAt(0) == '+') ){

            }else{
                modifier= '+' + modifier;
            }
        } else{
            modifier="+0";
        }

        let keyValue = eval(`${key}`);
        let bonusValue = eval(`${bonus}`);
        let modifierValue = eval(`${modifier}`);

        let cmpValue = keyValue+ bonusValue+ modifierValue;
        let label = elt.attributes["title"].value;
        let calcLabel = eval(`${key}`);

        if(modifierValue<0)
            calcLabel = calcLabel + modifier;
        else if(modifierValue > 0)
            calcLabel = calcLabel + "+" + modifierValue;

        if(bonusValue<0)
            calcLabel = calcLabel + bonus;
        else if(bonusValue > 0)
            calcLabel = calcLabel + "+" + bonusValue;            

        let r = new AriaSkillRoll(label,calcLabel,cmpValue);
        r.roll(actor);
    }

    /**
     *  Handles weapon check rolls
     * @param elt DOM element which raised the roll event
     * @param key the key of the attribute to roll
     * @private
     */
    static rollWeapon(data, actor, event) {

        const elt = $(event.currentTarget)[0];
        let formula = elt.attributes["data-roll-formula"].value;
        let label = elt.attributes["data-roll-weapon-name"].value;
        let img = elt.attributes["data-roll-weapon-img"].value;

        let r = new AriaDamageRoll(label,formula,img);
        r.roll(actor);
    }
}