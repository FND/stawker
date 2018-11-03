import TalentUpgrade from "../../../models/upgrade/talent";
import slot, { common } from "../slots";

export default {
	type: "talent",
	model: TalentUpgrade,
	slots: {
		name: common.name,
		factions: common.factions,
		unique: slot("unique", { optional: true }),
		cost: common.cost,
		attack: slot("attack", { optional: true }),
		skill: slot("skill", { optional: true }),
		talents: slot("talents", { optional: true }),
		range: slot("range", { optional: [undefined, ""] }),
		text: common.text,
		set: common.set,
		factionPenalty: null,
		OnePerShip: null,
		captainKlingon: null,
		captainRomulan: null,
		captainFerengi: null,
		captainDominion: null,
		captainBorg: null,
		captainIndependent: null,
		shipLimit: null,
		shipKlingon: null,
		shipDominion: null,
		shipBorg: null,
		intercept: null,
		hullConstraint: null
	}
};
