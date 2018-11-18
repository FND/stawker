import { resolveSets, ensureMarkup } from "./slots";
import { ensureFaction } from "../common_slots";
import { merge } from "../util";
import { optional, eager, validators } from "declepticon";

let { arrayOf, nonBlankString, integer, boolean } = validators;

let fields = {
	id: nonBlankString,
	name: nonBlankString,
	factions: arrayOf(ensureFaction),
	text: ensureMarkup,
	unique: boolean,
	cost: integer,
	talents: optional(integer),
	factionPenalty: optional(0),
	set: arrayOf(nonBlankString),
	intercept: optional(value => JSON.stringify(value) === '{"ship":{},"fleet":{}}')
};
let slots = {
	id: eager,
	name: eager,
	factions: true,
	text: ({ text }) => text.trim() || null,
	unique: true,
	cost: true,
	talents: ({ talents }) => talents || null,
	sets: ({ set }, sets) => resolveSets(set, sets)
};
let stringify = ({ id, name }) => `${id} "${name}"`;

export let captain = {
	name: "UtopiaCaptain",
	fields: merge(fields, {
		type: "captain",
		skill: [integer, "*"],
		shipLimit: optional(true),
		specialization: optional(true),
		range: optional(integer, nonBlankString)
	}),
	slots: merge(slots, {
		skill: true,
		range: ({ range }) => range || null
	}),
	stringify
};
export let admiral = {
	name: "UtopiaAdmiral",
	fields: merge(fields, {
		type: "admiral",
		skill: integer
	}),
	slots: merge(slots, {
		skill: true
	}),
	stringify
};
