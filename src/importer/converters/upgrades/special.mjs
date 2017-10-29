import SpecialUpgrade from "../../../models/upgrade/special";
import slot, { common } from "../slots";

export default {
	type: "question",
	model: SpecialUpgrade,
	slots: {
		name: common.name,
		factions: common.factions,
		unique: common.unique,
		cost: common.cost,
		range: slot("range", { optional: true }),
		text: common.text,
		set: common.set,
		limit: null
	}
};
