import { resolveSets, ensureMarkup } from "./slots";
import { optional, eager, validators } from "declepticon";

let { arrayOf, nonBlankString, integer } = validators;

export default {
	name: "UtopiaResource",
	fields: {
		type: "resource",
		id: nonBlankString,
		name: nonBlankString,
		text: value => nonBlankString(value) && ensureMarkup(value),
		cost: integer,
		set: arrayOf(nonBlankString),
		showShipResourceSlot: optional(false),
		opBanned: optional(true)
	},
	slots: {
		id: eager,
		name: eager,
		text: true,
		cost: true,
		sets: ({ set }, sets) => resolveSets(set, sets),
		banned: ({ opBanned }) => !!opBanned
	},
	stringify: ({ id, name }) => `${id} "${name}"`
};
