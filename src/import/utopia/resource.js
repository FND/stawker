import { resolveSets, ensureMarkup } from "./slots";
import { sanitizedString } from "../common_slots";
import { optional, eager, validators } from "declepticon";

let { arrayOf, nonBlankString, integer } = validators;

export default {
	name: "UtopiaResource",
	fields: {
		type: "resource",
		id: sanitizedString,
		name: sanitizedString,
		text: value => nonBlankString(value) && ensureMarkup(value),
		cost: integer,
		set: arrayOf(sanitizedString),
		showShipResourceSlot: optional(false),
		opBanned: optional(true)
	},
	slots: {
		id: eager,
		name: eager,
		text: ({ text }) => text.trim(), // XXX: sanitize strings within Utopia
		cost: true,
		sets: ({ set }, sets) => resolveSets(set, sets),
		banned: ({ opBanned }) => !!opBanned
	},
	stringify: ({ id, name }) => `${id} "${name}"`
};
