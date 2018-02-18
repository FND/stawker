import SpecialUpgrade from "../../../models/upgrade/special";
import slot, { common } from "../slots";

export default {
	type: "question",
	model: SpecialUpgrade,
	slots: {
		name: common.name,
		factions: common.factions,
		unique: slot("unique", { optional: true }),
		cost: common.cost,
		range: slot("range", { optional: true }),
		text: common.text,
		set: common.set,
		OnePerShip: null,
		shipIndependent: null,
		limit: null
	}
};
