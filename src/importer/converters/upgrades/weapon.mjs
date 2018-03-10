import WeaponUpgrade from "../../../models/upgrade/weapon";
import slot, { common } from "../slots";
import { ensureArray, ensureBoolean } from "../../validation";

const ARCS = new Set(["front", "rear"]);

export default {
	type: "weapon",
	model: WeaponUpgrade,
	slots: {
		name: common.name,
		factions: common.factions,
		unique: slot("unique", { optional: true }),
		cost: common.cost,
		attack: slot("attack", { optional: [undefined, null], permitted: ["?", "*"] }),
		skill: slot("skill", { optional: true }),
		talents: slot("talents", { optional: true }),
		range: slot(ensureRange, { optional: [undefined, ""] }),
		arc: slot(ensureArc, { optional: true }),
		arc360: slot(ensureBoolean, { optional: true }),
		text: common.text,
		set: common.set,
		factionPenalty: null,
		OnePerShip: null,
		shipLimit: null,
		shipDominion: null,
		limit: null,
		intercept: null,
		FrontArc: null,
		RearArc: null
	}
};

function ensureArc(value, errMsg) {
	return ensureArray(value, { permitted: ARCS }, errMsg);
}

function ensureRange(value, errMsg) {
	if(Number.isInteger(value)) {
		value = value.toString();
	}

	return common.range(value, errMsg);
}
