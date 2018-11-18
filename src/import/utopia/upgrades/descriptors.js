import { resolveSets, ensureMarkup } from "../slots";
import { ensureFaction } from "../../common_slots";
import { merge } from "../../util";
import { optional, eager, validators } from "declepticon";

let { arrayOf, nonBlankString, string, integer, boolean } = validators;

let fields = {
	id: nonBlankString,
	name: nonBlankString,
	factions: arrayOf(ensureFaction),
	text: ensureMarkup,
	unique: optional(boolean),
	OnePerShip: optional(true),
	shipLimit: optional(true, string),
	cost: integer,
	attack: optional(integer, "*", "?", null),
	range: optional(integer, string),
	skill: optional(integer, null),
	talents: optional(integer, null),
	FrontArc: optional(true),
	RearArc: optional(true),
	arc360: optional(true),
	attackConstraint: optional(nonBlankString),
	hullConstraint: optional(nonBlankString),
	set: arrayOf(nonBlankString),
	factionPenalty: optional(0),
	costRomulan: optional(nonBlankString),
	shipKlingon: optional(true),
	shipDominion: optional(true),
	shipBorg: optional(true),
	shipIndependent: optional(true),
	captainKlingon: optional(true),
	captainRomulan: optional(true),
	captainFerengi: optional(true),
	captainDominion: optional(true),
	captainIndependent: optional(true),
	captainBorg: optional(true),
	countsAsUpgrade: optional(boolean),
	hasTokenInfo: optional(true),
	tokenId: optional(nonBlankString),
	specialization: optional(true),
	intercept: optional(value => JSON.stringify(value) === '{"ship":{},"fleet":{}}'),
	opBanned: optional(boolean)
};
let slots = {
	id: eager,
	name: eager,
	factions: true,
	text: ({ text }) => text.trim() || null,
	unique: ({ unique }) => !!unique,
	cost: ({ cost }) => true,
	attack: ({ attack }) => attack || null,
	range: ({ range }) => range || null,
	skill: ({ skill }) => skill || null,
	talents: ({ talents }) => talents || null,
	arcs: ({ FrontArc, RearArc, arc360 }) => ({
		front: !!FrontArc,
		rear: !!RearArc,
		360: !!arc360
	}),
	sets: ({ set }, sets) => resolveSets(set, sets),
	banned: ({ opBanned }) => !!opBanned
};
let stringify = ({ id, name }) => `${id} "${name}"`;

export let talent = {
	name: "UtopiaTalentUpgrade",
	fields: merge(fields, {
		type: "talent"
	}),
	slots,
	stringify
};

export let crew = {
	name: "UtopiaCrewUpgrade",
	fields: merge(fields, {
		type: "crew"
	}),
	slots,
	stringify
};

export let tech = {
	name: "UtopiaTechUpgrade",
	fields: merge(fields, {
		type: "tech"
	}),
	slots,
	stringify
};

export let weapon = {
	name: "UtopiaWeaponUpgrade",
	fields: merge(fields, {
		type: "weapon"
	}),
	slots,
	stringify
};

export let squadron = {
	name: "UtopiaSquadronUpgrade",
	fields: merge(fields, {
		type: "squadron"
	}),
	slots,
	stringify
};

export let borg = {
	name: "UtopiaBorgUpgrade",
	fields: merge(fields, {
		type: "borg"
	}),
	slots,
	stringify
};

export let question = {
	name: "UtopiaSpecialUpgrade",
	fields: merge(fields, {
		type: "question"
	}),
	slots,
	stringify
};
