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
		opBanned: null,
		factionPenalty: null,
		OnePerShip: null,
		captainFerengi: null,
		shipLimit: null,
		shipKlingon: null,
		shipDominion: null,
		intercept: null,
		specialization: null
	}
};
