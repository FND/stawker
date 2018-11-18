import { ignoreField as ignore } from "../util";
import { optional, eager, validators } from "declepticon";

let { integerString, nonBlankString } = validators;

export default {
	name: "UtopiaShipClass",
	fields: {
		type: "ship-class",
		id: nonBlankString,
		name: nonBlankString,
		frontArc: [integerString, ""],
		secondArc: optional(integerString),
		rearArc: optional(integerString, ""),
		maneuvers: ignore // TODO
	},
	slots: {
		id: eager,
		name: eager,
		frontArc: ({ frontArc }) => toInteger(frontArc),
		secondArc: ({ secondArc }) => toInteger(secondArc),
		rearArc: ({ rearArc }) => toInteger(rearArc)
	},
	stringify: ({ id, name }) => `${id} "${name}"`
};

function toInteger(value) {
	return value ? parseInt(value, 10) : null;
}
