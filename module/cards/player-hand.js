export class AriaPlayerHand extends CardHand {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["aria", "sheet", "cardsHand", "cards-config"],
            width: 400,
            height:350,
            resizable: false,
        })
    }


    get template() {
        let path;
        path = "systems/aria/templates/cards/ariaPlayerHand_evantail.hbs";
        return path;

    }

    async activateListeners(html) {
        this.rotateCards(html);
        html.find(".card img").click(this.focusCard.bind(this));
        super.activateListeners(html);
    }

    async _onCardControl(event) {
        // Shamelessly stolen from core software
        const button = event.currentTarget;
        const li = button.closest(".card");
        const card = li ? this.object.cards.get(li.dataset.cardId) : null;
        const cls = getDocumentClass("Card");

        let settingData = game.settings.get("aria", "deckSetting");
        let handID = this.object.id;
        let handActorId = settingData.actorsByHandsID[handID]
        let handActor = game.actors.get(handActorId);
        let actorDeck = await handActor.getDefaultDeck();
        let actorDiscard = await handActor.getDefaultDiscard();

        // Save any pending change to the form
        await this._onSubmit(event, { preventClose: true, preventRender: true });

        // Handle the control action
        switch (button.dataset.action) {
            case "play":
                await card.pass(actorDiscard);
                card.toMessage({
                        user: game.user.id,
                        speaker: ChatMessage.getSpeaker({actor: handActor}),
                        content: `<div class="card-draw flexrow"><img style="width:75px" src="${card.img}"><span class="card-name">&nbsp;&nbsp;Joue ${card.name}.</span></div><span class="card-desc"><br/>${card.description}</span>
            </div>` })
                // await game.combats.apps[0].viewed.resetAll();
                return;
            case "view":
                new ImagePopout(card.img, { title: card.name }).render(true, { width: 425, height: 650 });
                return;
            case "display":
                let x = new ImagePopout(card.img, { title: card.name }).render(true, { width: 425, height: 650 });
                x.shareImage();
                return;
            case "discard":
                await card.pass(actorDiscard);
                card.toMessage({
                         user: game.user.id,
                        speaker: ChatMessage.getSpeaker({actor: handActor}),
                        content: `<div class="card-draw flexrow"><img style="width:75px" src="${card.img}"><span class="card-name">Jette ${card.name}</span>
              </div>` });
                // await game.combats.apps[0].viewed.resetAll();
                return;
            case "drawCard":
                let actorDeck = await handActor.getDefaultDeck();

                if (actorDeck.cards.size) {
                    const [firstCardKey] = actorDeck.cards.keys(); // need to grab a card to get toMessage access
                    const card = actorDeck.cards.get(firstCardKey);

                    card.toMessage({ user: game.user.id,
                        speaker: ChatMessage.getSpeaker({actor: handActor}),
                        content: `<div class="card-draw flexrow"><h4 class="card-name">Pioche.</h4></div>` });
                }
                return this.object.draw(actorDeck, 1, { face: 1 });
            case "pass":
                await this.playerPassDialog(card);
                // await game.combats.apps[0].viewed.resetAll();
                return;
            case "create":
                return cls.createDialog({}, { parent: this.object, pack: this.object.pack });
            case "edit":
                return card.sheet.render(true);
            case "delete":
                return card.deleteDialog();
            case "deal":
                return this.object.dealDialog();
            case "draw":
                return this.object.drawDialog();
            case "pass":
                return this.object.passDialog();
            case "reset":
                this._sortStandard = true;
                return this.object.recall();
            case "shuffle":
                this._sortStandard = false;
                return this.object.shuffle();
            case "toggleSort":
                this._sortStandard = !this._sortStandard;
                return this.render();
            case "nextFace":
                return card.update({ face: card.face === null ? 0 : card.face + 1 });
            case "prevFace":
                return card.update({ face: card.face === 0 ? null : card.face - 1 });
        }

    }
  
    rotateCards(html) {
        let cardsAreas = html.find('.cards');
        for (let area of cardsAreas) {
            for (let i = 0; i < area.children.length; i++) {
                let card = area.children[i];
                //card.style.transform = `rotateZ(${(i * 4)}deg) translateX(${i * 60}px)`;
                card.style.transform = `translateX(${i * 60}px)`;
            }
            //area.style.transform = `rotateZ(${-((area.children.length - 1) * 2)}deg) translateX(-${(area.children.length * 15)}px)`
            area.style.transform = `translateX(${(123-((area.children.length-1)*30))}px)`;
        }
    }

    focusCard(ev) {
        let card = ev.currentTarget.closest('li.card');
        card.classList.toggle('focusedCard');
        /*if (card.classList.contains("focusedCard")) {
            card.setAttribute("data-rot", card.style.transform)
            let correction = parseInt(card.parentElement.style.transform.replace("rotateZ(", "").replace(")deg", "")) * -1;
            card.style.transform = `rotateZ(${correction}deg)`
        } else {
            card.style.transform = card.getAttribute("data-rot")
        }*/
    }

    toggleRender() {
        if (this.rendered) {
            if (this._minimized) return this.maximize();
            else return this.close()
        } else return this.render(true)

    }
}