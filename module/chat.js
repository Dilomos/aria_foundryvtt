/**
 * Set properties of elements inside cards rendered on chat
 * @param {object} chatCard         Chat card object containing the Message Data
 * @param {jQueryObject} html       jObject of the chat card being processed
 * @param {object} data             Data containing Message data
 */
 export async function sortCustomAgeChatCards(chatCard, html, data) {
    // Toggle chat card visibility of AGE Roll Cards 
    if (html.find(".aria-roll-chat").length > 0) _handleAgeRollVisibility(html, chatCard, data);
};

/**
 * Set visibility properties for buttons and blind-roll segments (blind-roll segments currently not used)
 *
 * @param {jQueryObject} html       jObject of the chat card being processed
 * @param {object} chatCard         Chat card object containing the Message Data
 * @param {object} chatData         Data containing Message data
 */
 function _handleAgeRollVisibility(html, chatCard, chatData){
    const element = html.find(".aria-roll-chat");
    for (let e = 0; e < element.length; e++) {
        const el = element[e];
        const isBlind = chatCard.blind;
        const whisperTo = chatData.message.whisper;
        const author = chatData.author.id;
        const userId = game.user.id;
    
        if ((whisperTo.includes(userId) || whisperTo.length < 1 || author === userId) && !isBlind) {
            el.querySelector(".blind-roll-card").remove();
        } else {
            if (isBlind && whisperTo.includes(userId)) {
                el.querySelector(".blind-roll-card").remove();
            } else {
                el.querySelector(".regular-roll-card").remove();
                /*const hideField = userId === author ? ".other-user-roll" : ".user-roll";
                el.querySelector(`.blind-roll-card ${hideField}`).remove();*/
            }
        }
    }
}
