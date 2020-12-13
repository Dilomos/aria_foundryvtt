import {CharacterGeneration} from "../system/chargen.js";
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
    static skillCheck(data, actor, event) {
        const elt = $(event.currentTarget)[0];
        let key = elt.attributes["data-rolling"].value;
        let cmpValue = eval(`${key}.value`)*5;
        let label = eval(`${key}.label`);
        label = (label) ? game.i18n.localize(label) : null;
        let r = new AriaSkillRoll(label,cmpValue);
        r.roll(actor);
    }

    static competencyCheck(data, actor, event) {
        const elt = $(event.currentTarget)[0];
        let key = elt.attributes["data-rolling-value"].value;
        let cmpValue = eval(`${key}`);
        let label = elt.attributes["title"].value;
        let r = new AriaSkillRoll(label,cmpValue);
        r.roll(actor);
    }

    /**
     *  Handles weapon check rolls
     * @param elt DOM element which raised the roll event
     * @param key the key of the attribute to roll
     * @private
     */
    static rollWeapon(data, actor, event) {
        const li = $(event.currentTarget).parents(".item");
        let item = actor.getOwnedItem(li.data("itemId"));
        const itemData = item.data;
        let label = itemData.name;
        let critrange = itemData.data.critrange;
        let dmg = itemData.data.dmg;
        return this.rollWeaponDialog(actor, label,0, critrange, dmg);
    }

    /* -------------------------------------------- */
    /* ROLL DIALOGS                                 */
    /* -------------------------------------------- */
    static async rollWeaponDialog(actor, label, bonus, critrange, formula, onEnter = "submit") {
        const rollOptionTpl = 'systems/aria/templates/dialogs/roll-weapon-dialog.hbs';
        let diff = null;
        if (game.settings.get("aria", "displayDifficulty") && game.user.targets.size > 0) {
            diff = [...game.user.targets][0].actor.data.data.attributes.def.value;
        }
        const rollOptionContent = await renderTemplate(rollOptionTpl, {
            bonus: bonus,
            critrange: critrange,
            formula: formula,
            difficulty: diff
        });

        let d = new Dialog({
            title: "Weapon Roll",
            content: rollOptionContent,
            buttons: {
                cancel: {
                    icon: '<i class="fas fa-times"></i>',
                    label: "Cancel",
                    callback: () => {
                    }
                },
                submit: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Submit",
                    callback: (html) => {
                        const dice = html.find("#dice").val();
                        const diff = html.find('#difficulty').val();
                        const critrange = html.find('input#critrange').val();
                        const b = html.find('input#bonus').val();
                        const dmgFormula = html.find("#formula").val();
                        let r = new AriaSkillRoll(label, dice, b, diff, critrange);
                        r.weaponRoll(actor, dmgFormula);
                    }
                }
            },
            default: onEnter,
            close: () => {
            }
        }, this.options());
        return d.render(true);
    }
}