export default class cardsSettingMenu extends FormApplication {
    constructor(settings) {
        super();
        this.doubledValues = [];
    }
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.template = "/systems/aria/templates/cards/cardSettingMenu.hbs";
        options.top = 300;
        options.width = 1000;
        options.title = "Configuration des paquets de cartes de Magie"
        options.left = 500;
        options.submitOnChange = true;
        options.editable = true;
        return options;
    }

    getData() {

        let characters = game.actors.filter(act => act.type == "character");


        let charactersMagic = [];

        for (let charac of characters) {
            let items = charac.items;
            let caps = items.filter(item => item.type === "competence").sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
            let caps_spe = caps.filter(item => item.system.special === true);
            let caps_magie = caps.filter(item => item.name === "Modélisation");
            if(caps_magie.length > 0)
            {
                charactersMagic.push(charac);
            }
        }

        let data = {
            isGM: game.user.isGM,
            deckList: game.cards.contents,
            object: game.settings.get("aria", "deckSetting"),
            decksByActorID:charactersMagic,
            handsByActorID:charactersMagic,
            discardsByActorID:charactersMagic,
            actorsByDeckID:game.charactersMagic,
            actorsByHandsID:game.charactersMagic,
            actorsByDiscardsID:game.charactersMagic,
        };

        for (let sk of data.decksByActorID) {
            if (game.settings.get("aria", "deckSetting").decksByActorID) {
                data.decksByActorID[sk.id] = game.settings.get("aria", "deckSetting").decksByActorID[sk.id];
            }
        }

        for (let sk of data.handsByActorID) {
            if (game.settings.get("aria", "deckSetting").handsByActorID) {
                data.decksByActorID[sk.id] = game.settings.get("aria", "deckSetting").handsByActorID[sk.id];
            }
        }

        for (let sk of data.discardsByActorID) {
            if (game.settings.get("aria", "deckSetting").discardsByActorID) {
                data.decksByActorID[sk.id] = game.settings.get("aria", "deckSetting").discardsByActorID[sk.id];
            }
        }

        return mergeObject(super.getData(), data);
    }

    async activateListeners(html) {
        html.find("select.selectActorHand").change(this.onChangeHand.bind(this, html));
        html.find("select.selectActorDeck").change(this.onChangeDeck.bind(this, html));
        html.find("select.selectActorDiscard").change(this.onChangeDiscard.bind(this, html));
    }

    _updateObject(event, formData) {
        if(event.submitter.name == "submit") //event.type almways submit even if cancel is clicked
        {
            const data = expandObject(formData);
            //game.settings.set('aria', 'deckSetting', data);
        }
    }

    onChangeHand(html, event) {
        let actorId = event.currentTarget.getAttribute("name").replace("handsByActorID.", "");
        let handId = event.currentTarget.options[event.currentTarget.selectedIndex].value;
        this.checkDoubled();

        let actor = game.actors.get(actorId);
        let hand = game.cards.get(handId);

        /*let actorsPerm = actor.ownership;
        // assigning same permissions from actor to hand
        hand.update({
            data: {
                permissions: actorsPerm
            }
        })*/
    }

    onChangeDeck(html, event) {
        let actorId = event.currentTarget.getAttribute("name").replace("decksByActorID.", "");
        let handId = event.currentTarget.options[event.currentTarget.selectedIndex].value;
        this.checkDoubled();

        let actor = game.actors.get(actorId);
        let hand = game.cards.get(handId);

        /*let actorsPerm = actor.ownership;
        // assigning same permissions from actor to hand
        hand.update({
            data: {
                permissions: actorsPerm
            }
        })*/
    }

    onChangeDiscard(html, event) {
        let actorId = event.currentTarget.getAttribute("name").replace("discardsByActorID.", "");
        let handId = event.currentTarget.options[event.currentTarget.selectedIndex].value;
        this.checkDoubled();

        let actor = game.actors.get(actorId);
        let hand = game.cards.get(handId);

        /*let actorsPerm = actor.ownership;
        // assigning same permissions from actor to hand
        hand.update({
            data: {
                permissions: actorsPerm
            }
        })*/
    }

    checkDoubled() {
        let selectedValues = []

        for (let select of this.element.find("select")) {
            let value = select.options[select.selectedIndex].value
            selectedValues.push(value);
            let valueCount = selectedValues.filter(val => val == value).length;

            if (valueCount > 1) {
                this.doubledValues.push(value)
            } else {
                if (this.doubledValues.indexOf(value) > -1) {
                    this.doubledValues = this.doubledValues.filter(val => val != value);
                }
            }
        }
        for (let select of this.element.find("select")) {
            let value = select.options[select.selectedIndex].value;
            if (this.doubledValues.indexOf(value) > -1) {
                select.classList.add("doubled");
            } else {
                select.classList.remove("doubled");
            }
        }


        let submitButton = this.element.find('button[type="submit"]')[0];
        //allowing submit if no doubled value
        if (this.element.find(".doubled").length > 0) {
            submitButton.disabled = true;
            submitButton.innerText = 'Supprimer les doubles';
        } else {
            submitButton.disabled = false;
            submitButton.innerText = 'Enregistrer';
        }

    }

}