/**
 * Create a macro when dropping an entity on the hotbar
 * Item      - open roll dialog for item
 * Actor     - open actor sheet
 * Journal   - open journal sheet
 */
import {Macros} from "../system/macros.js";

Hooks.on("hotbarDrop", async (bar, data, slot) => {

    return false;
});

