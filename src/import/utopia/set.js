import { optional, eager, validators } from "declepticon";

let { nonBlankString } = validators;

export default {
	name: "UtopiaSet",
	fields: {
		type: "set",
		id: nonBlankString,
		name: nonBlankString,
		releaseDate: ensureDateString,
		parentSet: nonBlankString,
		comment: optional(nonBlankString)
	},
	slots: {
		id: eager,
		name: eager,
		releaseDate: ({ releaseDate }) => {
			let [year, month, day] = releaseDate.split("-").
				map(num => parseInt(num, 10));
			return new Date(Date.UTC(year, month - 1, day));
		}
		// TODO: resolve parent set?
	},
	stringify: ({ id, name }) => `${id} "${name}"`
};

function ensureDateString(value) {
	return /^\d{4}-\d{2}-\d{1,2}$/.test(value);
}
