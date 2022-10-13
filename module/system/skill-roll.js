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

    async roll(actor,rollType){
        const messageTemplate = "systems/aria/templates/chat/carac-card.hbs";

        let rollData = {
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({actor: actor}),
        };

        let r = new Roll(this._formula);
        r.evaluate({async:false});

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
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({actor: actor}),
            roll: r,
            content: await renderTemplate(messageTemplate,templateContextData),
            sound: CONFIG.sounds.dice
        };

    switch (rollType) {
        case "PUBLIC" :
            chatData = await ChatMessage.applyRollMode(chatData, CONST.DICE_ROLL_MODES.PUBLIC);
            break;
        case "BLIND" :
            chatData = await ChatMessage.applyRollMode(chatData, CONST.DICE_ROLL_MODES.BLIND);
            break;
        case "SELF" :
            chatData = await ChatMessage.applyRollMode(chatData, CONST.DICE_ROLL_MODES.SELF);
            break;
        case "PRIVATE" :
            chatData = await ChatMessage.applyRollMode(chatData, CONST.DICE_ROLL_MODES.PRIVATE);
            break;
    }
      
        ChatMessage.create(chatData);
    }
}