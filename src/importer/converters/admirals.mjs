import convert from "./";
import { Admiral } from "../../models/leader";
import { common } from "./slots";

const SOURCE_DESCRIPTOR = {
	type: "admiral",
	model: Admiral,
	slots: {
		name: common.name,
		factions: common.factions,
		unique: common.unique,
		cost: common.cost,
		skill: common.skill,
		talents: common.talents,
		text: common.text,
		set: null,
		factionPenalty: null,
		intercept: null
	}
};

export default admirals => admirals.map(payload => {
	return convert(payload, SOURCE_DESCRIPTOR);
});
