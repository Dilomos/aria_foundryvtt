import { ARIA } from "./config.js";
import {Traversal} from "./utils/traversal.js";

export const registerHandlebarsHelpers = function () {


    Handlebars.registerHelper('getOrigines', function (items) {
        return items.find(item => item.type === "origine");
    });

    Handlebars.registerHelper('getInventory', function (items) {
        let inventory = items.filter(item => item.type === "item");
        inventory.sort(function (a, b) {
            const aKey = a.system.subtype + "-" + a.name.slugify({strict: true});
            const bKey = b.system.subtype + "-" + b.name.slugify({strict: true});
            return (aKey > bKey) ? 1 : -1
        });
        return inventory;
    });

    
    Handlebars.registerHelper('getArraySubCategorywithItems', function (items) {
        let subCat=ARIA.itemSubCategories;
        var itemByCat = [];
        for (const [key, value] of Object.entries(subCat)) {

            let caps = items.filter(item => item.type === "item");
            let weapons = caps.filter(item => item.system.subtype == key);
            weapons.sort(function (a, b) {
                const aKey = a.name.slugify({strict: true});
                const bKey = b.name.slugify({strict: true});
                return (aKey > bKey) ? 1 : -1
            });

            itemByCat.push({
                key: key,
                value: value,
                items: weapons
            });
        }

        //Add all items with no categories
        let caps = items.filter(item => item.type === "item");
        let weapons = caps.filter(item => item.system.subtype == "");
        weapons.sort(function (a, b) {
            const aKey = a.name.slugify({strict: true});
            const bKey = b.name.slugify({strict: true});
            return (aKey > bKey) ? 1 : -1
        });

        itemByCat.push({
            key: "",
            value: game.i18n.localize("ARIA.category.other"),
            items: weapons
        });

        return itemByCat;
    });

    Handlebars.registerHelper('getItemSubCategories', function () {
        return ARIA.itemSubCategories;
    });

    Handlebars.registerHelper('getItemsBySubCategory', function (subCat, items) {
        let caps = items.filter(item => item.type === "item");
        let weapons = caps.filter(item => item.system.subtype == subCat);
        weapons.sort(function (a, b) {
            const aKey = a.name.slugify({strict: true});
            const bKey = b.name.slugify({strict: true});
            return (aKey > bKey) ? 1 : -1
        });
        return weapons;
    });

    Handlebars.registerHelper('getEquiped', function (items) {
        let equiped = items.filter(item => item.type === "item" && item.system.equiped);
        equiped.sort(function (a, b) {
            const aKey = a.system.subtype + "-" + a.name.slugify({strict: true});
            const bKey = b.system.subtype + "-" + b.name.slugify({strict: true});
            return (aKey > bKey) ? 1 : -1
        });
        return equiped;
    });

    Handlebars.registerHelper('getItems', function (items) {
        return items.filter(item => item.type === "item");
    });

    Handlebars.registerHelper('getProfession', function (items) {
        return items.find(item => item.type === "profession");
    });
      
    Handlebars.registerHelper('getCompetences', function (items) {
        let caps = items.filter(item => item.type === "competence").sort(function (a, b) {
            return a.name.localeCompare(b.name);
          });
        let caps_normal = caps.filter(item => item.system.special === false);
        return caps_normal;
    });

    Handlebars.registerHelper('getCompetencesSpe', function (items) {
        let caps = items.filter(item => item.type === "competence").sort(function (a, b) {
            return a.name.localeCompare(b.name);
          });
          
          let caps_special = caps.filter(item => item.system.special === true);
          return caps_special;
    });

    Handlebars.registerHelper('getWeapons', function (items) {
        let caps = items.filter(item => item.type === "item");
        let weapons = caps.filter(item => item.system.properties.weapon === true ||  item.system.subtype == "melee" ||  item.system.subtype == "ranged");
        return weapons;
    });

    Handlebars.registerHelper('getEquipedWeapons', function (items) {
        let caps = items.filter(item => item.type === "item");
        let weapons = caps.filter(item => item.system.properties.weapon === true ||  item.system.subtype == "melee" ||  item.system.subtype == "ranged");
        let equipedWeapons = weapons.filter(item => item.system.equiped === true);
        return equipedWeapons;
    });

    Handlebars.registerHelper('isWeapon', function (item) {
        if( item.system.properties.weapon === true ||  item.system.subtype == "melee" ||  item.system.subtype == "ranged")
            return true;
        else
            return false;
    });

    Handlebars.registerHelper('splitWeaponDice', function (formula) {
        let terms = formula.split("+");
        return terms[0];
    });

    Handlebars.registerHelper('splitWeaponMod', function (formula) {
        let terms = formula.split("+");
        return terms[1];
    });

    Handlebars.registerHelper('isNull', function (val) {
        return val == null;
    });

    Handlebars.registerHelper('isEmpty', function (list) {
        if (list) return list.length == 0;
        else return 0;
    });

    Handlebars.registerHelper('notEmpty', function (list) {
        return list.length > 0;
    });

    Handlebars.registerHelper('isZeroOrNull', function (val) {
        return val == null || val == 0;
    });

    Handlebars.registerHelper('isNegative', function (val) {
        return val < 0;
    });

    Handlebars.registerHelper('isNegativeOrNull', function (val) {
        return val <= 0;
    });

    Handlebars.registerHelper('isPositive', function (val) {
        return val > 0;
    });

    Handlebars.registerHelper('isPositiveOrNull', function (val) {
        return val >= 0;
    });

    Handlebars.registerHelper('equals', function (val1, val2) {
        return val1 == val2;
    });

    Handlebars.registerHelper('gt', function (val1, val2) {
        return val1 > val2;
    });

    Handlebars.registerHelper('lt', function (val1, val2) {
        return val1 < val2;
    });

    Handlebars.registerHelper('gte', function (val1, val2) {
        return val1 >= val2;
    });

    Handlebars.registerHelper('lte', function (val1, val2) {
        return val1 <= val2;
    });
    Handlebars.registerHelper('and', function (val1, val2) {
        return val1 && val2;
    });

    Handlebars.registerHelper('or', function (val1, val2) {
        return val1 || val2;
    });

    Handlebars.registerHelper('not', function (cond) {
        return !cond;
    });

    Handlebars.registerHelper('isEnabled', function (configKey) {
        return game.settings.get("aria", configKey);
    });

    Handlebars.registerHelper('isAriaTypeSetting', function (configKey) {
        return (game.settings.get("aria", "ariaVersion") == configKey);
    });

    Handlebars.registerHelper('split', function (str, separator, keep) {
        return str.split(separator)[keep];
    });

    Handlebars.registerHelper('listProfessions', function () {
        return Traversal.getAllProfessionsData()
    });

    Handlebars.registerHelper('listOrigines', function () {
        return Traversal.getAllOriginesData()
    });

    Handlebars.registerHelper('findCompetence', function (key) {
        return Traversal.getAllCompetencesData().find(c => c.system.key === key);
    });

    // If you need to add Handlebars helpers, here are a few useful examples:
    Handlebars.registerHelper('concat', function () {
        var outStr = '';
        for (var arg in arguments) {
            if (typeof arguments[arg] != 'object') {
                outStr += arguments[arg];
            }
        }
        return outStr;
    });

    Handlebars.registerHelper('add', function (a, b) {
        return parseInt(a) + parseInt(b);
    });

    Handlebars.registerHelper('valueAtIndex', function (arr, idx) {
        return arr[idx];
    });

    Handlebars.registerHelper('includesKey', function (items, type, key) {
        return items.filter(i => i.type === type).map(i => i.system.key).includes(key);
    });

}