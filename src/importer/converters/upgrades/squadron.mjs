import SquadronUpgrade from "../../../models/upgrade/squadron";
import slot, { common } from "../slots";

export default {
	type: "squadron",
	model: SquadronUpgrade,
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
		OnePerShip: null
	}
};
