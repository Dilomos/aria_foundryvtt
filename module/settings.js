export const registerSystemSettings = function() {

    game.settings.register("aria", "ariaVersion", {
        name: "Choisissez la version d'Aria",
        hint: "",
        scope: "world", // This specifies a world-level setting
        config: true,   // This specifies that the setting appears in the configuration view
        type: String,
        choices: {           // If choices are defined, the resulting setting will be a select menu
            "aria": "Aria",
            "stars": "Stars",
            "contemporain": "Contemporain",
          },
          default: "aria",        // The default value for the setting
          onChange: value => { // A callback function which triggers when the setting is changed
            window.location.reload()
          }
        });

        game.settings.register("aria", "showBonusCol", {
          name: "Afficher la colonne Bonus/Malus",
          hint: "Ajoute la colonne pour les compétences",
          scope: "world",
          config: true,
          default: true,
          type: Boolean,
          onChange: value => { // A callback function which triggers when the setting is changed
            window.location.reload()
          }
      });

      game.settings.register("aria", "moveItem", {
        name: "Mode de déplacement des items",
        hint: "Comportement du drag & drop d'un item sur une fiche de personnage (Maintenir MAJ lors du drop pour inverser)",
        scope: "world",
        type: String,
        choices: {
            "0" : "Clonner l'item",
            "1" : "Déplacer l'item"
        },
        default: "1",
        config: true,
        onChange: lang => window.location.reload()
    }); 
	
        game.settings.register("aria", "showOrigine", {
          name: "Afficher l'origine",
          hint: "Afficher l'origine sur la feuille de personnage",
          scope: "world",
          config: true,
          default: true,
          type: Boolean,
          onChange: value => { // A callback function which triggers when the setting is changed
            window.location.reload()
          }
      });
	  
        game.settings.register("aria", "showGenialMais", {
          name: "Afficher le background",
          hint: "Fait apparaitre \"Je suis génial parce que\" et \"Mais la société à des problème avec moi parce que\"",
          scope: "world",
          config: true,
          default: true,
          type: Boolean,
          onChange: value => { // A callback function which triggers when the setting is changed
            window.location.reload()
          }
      });
	  
        game.settings.register("aria", "showBourse", {
          name: "Afficher la bourse",
          hint: "Fait apparaitre la bourse au dessus de l'inventaire",
          scope: "world",
          config: true,
          default: true,
          type: Boolean,
          onChange: value => { // A callback function which triggers when the setting is changed
            window.location.reload()
          }
      });
	  
        game.settings.register("aria", "allowEditComp", {
          name: "Edition des compétences",
          hint: "Fait apparaitre des icones pour éditer, supprimer ou ajouter des compétences sur la fiche de personnage (n'affecte pas les compétences spéciales)",
          scope: "world",
          config: true,
          default: true,
          type: Boolean,
          onChange: value => { // A callback function which triggers when the setting is changed
            window.location.reload()
          }
      });

      game.settings.register("aria", "allowInitiative", {
        name: "Utilisation de l'initiative (Règles avancées)",
        hint: "Fait apparaitre l'initiative sur la fiche de personnage",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: value => { // A callback function which triggers when the setting is changed
          window.location.reload()
        }
    });

    game.settings.register("aria", "hideCompLink", {
      name: "Masquer les liens des compétences (Règles avancées)",
      hint: "Dans les règles avancées les compétences ne sont plus liées aux caractéristiques",
      scope: "world",
      config: true,
      default: false,
      type: Boolean,
      onChange: value => { // A callback function which triggers when the setting is changed
        window.location.reload()
      }
  });

  game.settings.register("aria", "carac100", {
    name: "Caractéristiques sur 100 (Règles avancées)",
    hint: "Dans les règles avancées les caractéristiques sont également des pourcentage, de plus un bonus de dégat et calculer automatiquement en fonctions de la Force et de la Dextérité ",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: value => { // A callback function which triggers when the setting is changed
      window.location.reload()
    }
});

};
