export const registerSystemSettings = function() {

    game.settings.register("aria", "ariaVersion", {
        name: "Choisissez la version d'Aria",
        hint: "Rafraichir (F5) après avoir Sauvegarder pour appliquer le choix",
        scope: "world", // This specifies a world-level setting
        config: true,   // This specifies that the setting appears in the configuration view
        type: String,
        choices: {           // If choices are defined, the resulting setting will be a select menu
            "aria": "Aria",
            "stars": "Stars",
            "contemporain": "Contemporain",
          },
          onChange: value => { // A callback function which triggers when the setting is changed
            console.log(value)
          }
        });

};
