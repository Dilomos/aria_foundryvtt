import {Traversal} from "./traversal.js";

export class UpdateUtils {

    static updateCompetences() {
    }

    static updateProfessions() {
        game.packs.get("aria.professions").getContent().then(index => {
            index.forEach(entity => {
                let profession = duplicate(entity.data);
                entity.update(profession);
            })
        });
    }

    static updateOrigines() {
        game.packs.get("aria.origines").getContent().then(index => {
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
                    competences: spec.data.competences,
                }
                // Manage bonuses
                const keys = Object.keys(data.bonuses);
                for (let i = 0; i < bonuses.length; i++) {
                    data.bonuses[keys[i]] = bonuses[i]
                }

                // Manage competences
                const caps = game.aria.config.competences.filter(e => {
                    return spec.data.competences.includes(e.data.key);
                });
                data.competences = caps.map(e => e._id);
                spec.data = data;
                entity.update(spec);
            })
        });
    }
}