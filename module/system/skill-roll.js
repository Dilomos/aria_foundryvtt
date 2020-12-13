import {AriaDamageRoll} from "./dmg-roll.js";

export class AriaSkillRoll {

    constructor(label,cmpValue){
        this._label = label;
        this._formula = "1d100";
        this._isCritical = false;
        this._isFumble = false;
        this._isSuccess = false;
        this._msgFlavor = "";
        this._cmpValue = cmpValue;
    }

    roll(actor){
        let r = new Roll(this._formula);
        r.roll();
        this._isSuccess = r.total <= this._cmpValue;
        
        const result = r.terms[0].results.find(r => r.active).result;
        this._isFumble = (result >= 95);
        this._isCritical = (result <= 5);
        this._msgFlavor = this._buildRollMessage();

        r.toMessage({
            user: game.user._id,
            flavor: this._msgFlavor,
            speaker: ChatMessage.getSpeaker({actor: actor})
        });
    }

    weaponRoll(actor, formula){
        this.roll(actor);
        if (this._difficulty) {
            if(this._isSuccess){
                let r = new AriaDamageRoll(this._label, formula, this._isCritical);
                r.roll(actor);
            }
        }
        else {
            let r = new AriaDamageRoll(this._label, formula, this._isCritical);
            r.roll(actor);
        }
    }
    /* -------------------------------------------- */

    _buildRollMessage() {
        let subtitle = `<h3><strong>${this._label}</strong> ${game.i18n.localize("ARIA.ui.difficulty")} <strong>${this._cmpValue}</strong></h3>`;
        if (this._isCritical) return `<h2 class="success critical">${game.i18n.localize("ARIA.roll.critical")} !!</h2>${subtitle}`;
        if (this._isFumble) return `<h2 class="failure fumble">${game.i18n.localize("ARIA.roll.fumble")} !!</h2>${subtitle}`;
        if (this._isSuccess) return `<h2 class="success">${game.i18n.localize("ARIA.roll.success")} !</h2>${subtitle}`;
        else return `<h2 class="failure">${game.i18n.localize("ARIA.roll.failure")}...</h2>${subtitle}`;
    }
}