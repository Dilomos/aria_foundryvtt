export class AriaDamageRoll {
    constructor(label, formula){
        this._label = label;
        this._formula = formula;
    }

    roll(actor){
        const r = new Roll(this._formula);
        r.roll();
        const dmgCheckFlavor = this._buildDamageRollMessage();
        r.toMessage({
            user: game.user._id,
            flavor: dmgCheckFlavor,
            speaker: ChatMessage.getSpeaker({actor: actor})
        });
    }

    /* -------------------------------------------- */

    _buildDamageRollMessage() {
        let subtitle = `<h3><strong>${this._label}</strong></h3>`;
        return `<h2 class="damage">Jet de dommages</h2>${subtitle}`;
    }

}