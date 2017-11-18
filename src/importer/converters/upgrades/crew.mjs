import CrewUpgrade from "../../../models/upgrade/crew";
import slot, { common } from "../slots";

export default {
	type: "crew",
	model: CrewUpgrade,
	slots: {
		name: common.name,
		factions: common.factions,
		unique: slot("unique", { optional: true }),
		cost: common.cost,
		attack: slot("attack", { optional: [undefined, null] }),
		skill: slot("skill", { optional: [undefined, null] }),
		talents: slot("talents", { optional: [undefined, null] }),
		range: slot("range", { optional: [undefined, ""] }),
		text: common.text,
		set: common.set,
		factionPenalty: null,
		factionDominion: null,
		intercept: null
	}
};
