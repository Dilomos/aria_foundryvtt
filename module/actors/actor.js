/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */

import {Traversal} from "../utils/traversal.js";

export class AriaActor extends Actor {

    /** @override */
  static async create(data, options={}) {

    if (typeof data.items === 'undefined') {

      data.items = [];

      let caps = game.aria.config.competences;

      if ( data.type === "character" ) {
          
          mergeObject(data.items, caps, {overwrite: false});
      }
  }

    //data.items = data.items || [];

   
    let enti = super.create(data, options);

    return enti;
  }

    /** @override */
    prepareBaseData() {
        super.prepareBaseData();
    }

    prepareData() {
        super.prepareData();
    }

    /* -------------------------------------------- */

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();
    }

    /* -------------------------------------------- */

    getProfession(items) {
        return items.find(i => i.type === "profession")
    }

    /* -------------------------------------------- */

    getOrigines(items) {
        return items.find(i => i.type === "origine")
    }

      /** @override */
  async modifyTokenAttribute(attribute, value, isDelta, isBar) {
    if ( attribute === "attributes.hp" ) {
      const hp = this.system.attributes.hp;

      hp.bonus = this.system.attributes.hp.max - value;
      hp.value = this.system.attributes.hp.max - hp.bonus;
      return this.update({'system.attributes.hp': hp});
    }
    return super.modifyTokenAttribute(attribute, value, isDelta, isBar);
  }

      /** @override */
      async modifyActorBlessureAttribute( value) {
          const hp = this.system.attributes.hp;
          hp.bonus = value;
          hp.value = this.system.attributes.hp.max - hp.bonus;
          return this.update({'system.attributes.hp': hp});
      }


    getDefaultHand() {
      
      if (game.settings.get("aria", "deckSetting").handsByActorID.hasOwnProperty(this.id)) {
          return game.cards.get(game.settings.get("aria", "deckSetting").handsByActorID[this.id]);

      } else {
         /* console.error(`
          no default hand for actor : ${this.name}`);*/
          return false;
      }
  }

  getDefaultDeck() {
    if (game.settings.get("aria", "deckSetting").decksByActorID.hasOwnProperty(this.id)) {
        return game.cards.get(game.settings.get("aria", "deckSetting").decksByActorID[this.id]);

    } else {
       /* console.error(`
        no default deck for actor : ${this.name}`);*/
        return false;
    }
}

  getDefaultDiscard() {
    if (game.settings.get("aria", "deckSetting").discardsByActorID.hasOwnProperty(this.id)) {
        return game.cards.get(game.settings.get("aria", "deckSetting").discardsByActorID[this.id]);

    } else {
       /* console.error(`
        no default discard for actor : ${this.name}`);*/
        return false;
    }
  }
  async createDefaultCards() {
      let cartesMagie;
      cartesMagie = await game.packs.get("aria.cartesmagiquesdaria").getDocuments().then(index => index.map(entity => entity.toObject(false)));

      cartesMagie[0].name = "Deck de "+this.name;
      cartesMagie[0].ownership = this.getCardOwnership();

      // storing ids in game.settings
      let settingData = game.settings.get("aria", "deckSetting");
      let actorId = this.id;

      let characterDeck = await Cards.create(cartesMagie[0]);
      characterDeck.shuffle();
      let deckId = characterDeck.id;
      settingData.decksByActorID[actorId] = deckId;
      settingData.actorsByDeckID[deckId] = actorId;




      // creating a card hand then render it
      let handData = {
          name: "Main de "+this.name,
          type: "hand",
          ownerActor:this,
          ownership: this.getCardOwnership()
      }
      let characterHand = await Cards.create(handData);

      // getting ids of actor and card hand
      let handId = characterHand.id;
      settingData.handsByActorID[actorId] = handId; 
      settingData.actorsByHandsID[handId] = actorId;


      // creating a card hand then render it
      let discardData = {
        name: "Défausse de "+this.name,
        type: "pile",
        ownership: this.getCardOwnership()
      }
      let characterDiscard = await Cards.create(discardData);

      // getting ids of actor and card hand
      let discardId = characterDiscard.id;
      settingData.discardsByActorID[actorId] = discardId;
      settingData.actorsByDiscardsID[discardId] = actorId;

      game.settings.set("aria", "deckSetting", settingData);

      //return the hand
      return characterHand
  }

  getCardOwnership() {
      let handOwnership = duplicate(this.ownership)
      for(let key of Object.keys(handOwnership)){
          //remove any permissions that are not owner
          if(handOwnership[key] < CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER){
              delete handOwnership[key]
          }
          //set default permission to observer
          handOwnership.default = CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE
      }
      return handOwnership
  }
}
