/**
 * Create a macro when dropping an entity on the hotbar
 * Item      - open roll dialog for item
 * Actor     - open actor sheet
 * Journal   - open journal sheet
 */
import {Macros} from "../system/macros.js";

Hooks.on("hotbarDrop", async (bar, data, slot) => {


     // Create a macro to open the actor sheet of the actor dropped on the hotbar
     if (data.type == "Actor") {
        const actor = await fromUuid(data.uuid);
        let command = `game.actors.get("${data.id}").sheet.render(true)`;
        let macro = game.macros.contents.find(m => (m.name === actor.name) && (m.command === command));
        if (!macro) {
            macro = await Macro.create({
                name: actor.name,
                type: "script",
                img: actor.img,
                command: command
            }, {displaySheet: false});
            game.user.assignHotbarMacro(macro, slot);
        }
    }

    return false;
});

