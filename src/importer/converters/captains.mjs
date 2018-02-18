import convert from "./";
import { Captain } from "../../models/leader";
import slot, { common } from "./slots";

const SOURCE_DESCRIPTOR = {
	type: "captain",
	model: Captain,
	slots: {
		name: common.name,
		factions: common.factions,
		unique: common.unique,
		cost: common.cost,
		skill: slot("skill", { permitted: ["*"] }),
		talents: slot("talents", { optional: true }),
		range: slot("range", { optional: true }),
		text: slot("text", { optional: [""] }),
		set: common.set,
		factionPenalty: null,
		intercept: null,
		shipLimit: null
	}
};

export default captains => captains.map(payload => {
	return convert(payload, SOURCE_DESCRIPTOR);
});
