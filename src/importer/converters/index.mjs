import { ensureNonEmptyString } from "../validation";
import { repr } from "../util";

const UNIVERSAL_SLOTS = ["id", "type"];

export default (payload, { type, model, slots }, factory) => {
	let id;
	let errMsg = slot => {
		let entity = id ? ` \`${id}\`` : "";
		return repr => `invalid \`${slot}\` for \`${model.name}\`${entity}: ${repr}`;
	};

	// cf. https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute
	id = ensureNonEmptyString(payload.id, errMsg("id")).
		replace(/ /g, "_");
	if(payload.type !== type) {
		throw new Error(errMsg("type")(type));
	}

	let skippedSlots = new Set(UNIVERSAL_SLOTS); // already validated
	let slotNames = UNIVERSAL_SLOTS.concat(Object.keys(slots));

	// flag spurious fields
	let expected = new Set(slotNames);
	let spurious = Object.keys(payload).filter(item => !expected.has(item));
	if(spurious.length) {
		let msg = `spurious fields for \`${model.name}\` \`${id}\`: ${repr(spurious)}`;
		throw new Error(msg);
	}

	// validate and normalize known fields
	let fields = slotNames.reduce((memo, slot) => {
		if(skippedSlots.has(slot)) {
			return memo;
		}

		let value = payload[slot];
		let validator = slots[slot];
		if(validator === undefined) {
			throw new Error(`missing slot validator for \`${slot}\``);
		}

		if(validator !== null) { // skip ignored fields
			memo[slot] = validator(value, errMsg(slot), memo); // NB: also normalizes
		}

		return memo;
	}, { id });

	// rename common field -- XXX: hard-coded
	fields.desc = fields.text;
	delete fields.text;

	return factory ? factory(fields) : new model(fields); // eslint-disable-line new-cap
};
