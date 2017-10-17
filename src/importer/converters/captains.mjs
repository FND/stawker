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
		talents: common.talents,
		range: slot("range", { optional: true }),
		text: slot("text", { optional: [""] }),
		set: null,
		factionPenalty: null,
		intercept: null
	}
};

export default captains => captains.map(payload => {
	return convert(payload, SOURCE_DESCRIPTOR);
});
