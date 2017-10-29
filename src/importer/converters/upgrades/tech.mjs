import TechUpgrade from "../../../models/upgrade/tech";
import slot, { common } from "../slots";
import { ensureNonEmptyString } from "../../validation";

export default {
	type: "tech",
	model: TechUpgrade,
	slots: {
		name: common.name,
		factions: common.factions,
		unique: common.unique,
		cost: common.cost,
		attack: slot("attack", { optional: [undefined, null] }),
		hull: slot(ensureNonEmptyString, { optional: true }),
		skill: slot("skill", { optional: [undefined, null] }),
		talents: slot("talents", { optional: [undefined, null] }),
		range: slot("range", { optional: [undefined, ""] }),
		text: common.text,
		set: common.set,
		factionPenalty: null,
		limit: null,
		hasTokenInfo: null,
		tokenId: null,
		intercept: null
	}
};
