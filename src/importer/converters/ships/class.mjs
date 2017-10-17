import convert from "../";
import ShipClass from "../../../models/ship/class";
import slot, { common } from "../slots";
import { ensureIntegerString } from "../../validation";

let ensureArc = slot(ensureIntegerString, { optional: [""] });

const SOURCE_DESCRIPTOR = {
	type: "ship-class",
	model: ShipClass,
	slots: {
		name: common.name,
		frontArc: ensureArc,
		rearArc: ensureArc,
		maneuvers: null
	}
};

export default payload => convert(payload, SOURCE_DESCRIPTOR);
