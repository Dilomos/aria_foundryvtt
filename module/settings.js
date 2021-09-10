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
            console.log(value);
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
            console.log(value);
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

};
