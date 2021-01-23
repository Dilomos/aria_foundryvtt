export class AriaDamageRoll {
    constructor(label, formula,img){
        this._label = label;
        this._formula = formula;
        this._img = img;
    }

    async roll(actor){

        const messageTemplate = "systems/aria/templates/chat/weapon-card.hbs";

        let rollData = {
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({actor: actor}),
        };

        let r = new Roll(this._formula);
        r.roll();

        let renderedRoll = await r.render();  
        
        const result = r.terms[0].results.find(r => r.active).result;

        this._isFumble = (result == 0);

        let templateContextData = {
            actor: actor,
            label: this._label,
            img: this._img,
            text: this._buildDamageRollMessage(),
            isFumble:this._isFumble,
            formula: this._formula,
            result: result,
        };

        let chatData = {
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({actor: actor}),
            roll: r,
            content: await renderTemplate(messageTemplate,templateContextData),
            sound: CONFIG.sounds.dice,
            type: CONST.CHAT_MESSAGE_TYPES.ROLL
        };
      
        ChatMessage.create(chatData);
    }

    /* -------------------------------------------- */

    _buildDamageRollMessage() {
        let subtitle = `<h3><strong>${this._label}</strong></h3>`;
        return `<h2 class="damage">Jet de dommages</h2>${subtitle}`;
    }

}