import {Traversal} from "./traversal.js";

export class UpdateUtils {

    static updateCapacities() {
        Traversal.getAllCapacitiesData().forEach(cap => {
            let path = Traversal.findPathDataByKey(cap.data.path);
        });
    }

    static updateProfiles() {
        game.packs.get("aria.profiles").getContent().then(index => {
            index.forEach(entity => {
                const paths = game.aria.config.paths.filter(p => {
                    return p.data.profile === entity.data.data.key;
                });
                let profile = duplicate(entity.data);
                profile.data.paths = paths.map(c => c._id);
                entity.update(profile);
            })
        });
    }

    static updateSpecies() {
        game.packs.get("aria.species").getContent().then(index => {
            index.forEach(entity => {
                let spec = duplicate(entity.data);
                let bonuses = spec.data.bonuses
                let data = {
                    description: spec.data.description,
                    source: spec.data.source,
                    key: spec.data.key,
                    bonuses: {
                        "str": 1,
                        "dex": 2,
                        "end": 3,
                        "int": 4,
                        "cha": 6
                    },
                    capacities: spec.data.capacities,
                    paths: []
                }
                // Manage bonuses
                const keys = Object.keys(data.bonuses);
                for (let i = 0; i < bonuses.length; i++) {
                    data.bonuses[keys[i]] = bonuses[i]
                }
                // Manage paths
                const paths = game.aria.config.paths.filter(e => {
                    return e.data.scope === "species" && e.data.species.includes(spec.data.key);
                });
                data.paths = paths.map(e => e._id);

                // Manage capacities
                const caps = game.aria.config.capacities.filter(e => {
                    return spec.data.capacities.includes(e.data.key);
                });
                data.capacities = caps.map(e => e._id);
                spec.data = data;
                entity.update(spec);
            })
        });
    }

    static async createEncounterAbilities() {
        let encounterCaps = await game.packs.get("aria.encounters-capacities");
        let capacities = [];
        await game.packs.get("aria.encounters").getContent().then(index => {
            index.forEach(entity => {
                let data = duplicate(entity.data);
                const caps = data.data.capacities;
                const creatureName = data.name;
                caps.forEach(c => {
                    const limited = (c.name.indexOf("(L)") > 0) ? true : false;
                    const cname = `${c.name.split("(L)")[0].trim()} (${creatureName})`;
                    const key = cname.slugify({strict: true});
                    const description = `<h1>Description</h1><p>${c.description}</p>`;
                    capacities.push({
                        name: cname,
                        type: "capacity",
                        img: `/systems/aria/ui/icons/encounter-capacities/${key}.jpg`,
                        data: {
                            key: key,
                            limited: limited,
                            description: description,
                        }
                    });
                });
            })
        });
        for (const c of capacities) {
            let item = new Item(c);
            await encounterCaps.importEntity(item);
        }
    }

    static async updateEncounters() {
        let encounterCaps = await game.packs.get("aria.encounters-capacities").getContent().then(index => index.map(entity => entity.data));
        await game.packs.get("aria.encounters").getContent().then(index => {
            for (let entity of index) {
                let data = duplicate(entity.data);
                const caps = data.data.capacities;
                const creatureName = data.name;
                const caps2add = caps.map(c => {
                    const cname = `${c.name.split("(L)")[0].trim()} (${creatureName})`;
                    const key = cname.slugify({strict: true});
                    return encounterCaps.find(e => e.data.key === key);
                });
                const paths = data.data.paths;
                const pathCaps2add = paths.map(p => {
                    let tokens = p.key.split("-");
                    const rank = tokens.pop();
                    const pathKey = tokens.join("-");
                    const path = game.aria.config.paths.find(e => e.data.key === pathKey);
                    if (path && rank > 0 && path.data.capacities.length >= rank) {
                        return game.aria.config.capacities.find(c => path.data.capacities[rank - 1].includes(c._id));
                    } else console.error(pathKey, rank);
                });
                let items = caps2add.concat(pathCaps2add).flat()
                if (items.length > 0) {
                    entity.update({"items": items});
                }
            }
        });
    }
}