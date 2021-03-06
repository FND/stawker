import TechUpgrade from "../../../models/upgrade/tech";
import slot, { common } from "../slots";
import { ensureNonEmptyString, ensureBoolean } from "../../validation";

export default {
	type: "tech",
	model: TechUpgrade,
	slots: {
		name: common.name,
		factions: common.factions,
		unique: slot("unique", { optional: true }),
		cost: common.cost,
		attack: slot("attack", { optional: [undefined, null] }),
		hull: slot(ensureNonEmptyString, { optional: true }),
		skill: slot("skill", { optional: [undefined, null] }),
		talents: slot("talents", { optional: [undefined, null] }),
		range: slot("range", { optional: [undefined, ""] }),
		arc360: slot(ensureBoolean, { optional: true }),
		text: common.text,
		set: common.set,
		opBanned: null,
		factionPenalty: null,
		OnePerShip: null,
		shipLimit: null,
		shipKlingon: null,
		costRomulan: null,
		shipDominion: null,
		limit: null,
		hasTokenInfo: null,
		tokenId: null,
		intercept: null,
		hullConstraint: null
	}
};
