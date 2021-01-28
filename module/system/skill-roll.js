import {AriaDamageRoll} from "./dmg-roll.js";

export class AriaSkillRoll {

    constructor(label,calcLabel,cmpValue){
        this._label = label;
        this._calcLabel = calcLabel;
        this._formula = "1d100";
        this._isCritical = false;
        this._isFumble = false;
        this._isSuccess = false;
        this._msgFlavor = "";
        this._cmpValue = cmpValue;
        this._result = 0;
    }

    async roll(actor){
        const messageTemplate = "systems/aria/templates/chat/carac-card.hbs";

        let rollData = {
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({actor: actor}),
        };

        let r = new Roll(this._formula);
        r.roll();

        let renderedRoll = await r.render();

        
        
        const result = r.total;
        this._isSuccess = result <= this._cmpValue;
        this._isFumble = (result >= 95);
        this._isCritical = (result <= 5);
    
        

        let templateContextData = {
            actor: actor,
            label: this._label,
            calcLabel: this._calcLabel,
            cmpValue: this._cmpValue,

            isCritical: this._isCritical,
            isFumble: this._isFumble,
            isSuccess: this._isSuccess,
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
}