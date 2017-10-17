import convert from "../";
import talent from "./talent";
import crew from "./crew";
import tech from "./tech";
import weapon from "./weapon";
import squadron from "./squadron";
import borg from "./borg";
import special from "./special";
import { repr } from "../../util";

const SOURCE_DESCRIPTORS = {
	talent,
	crew,
	tech,
	weapon,
	squadron,
	borg,
	question: special
};

export default upgrades => upgrades.map(payload => {
	let { type } = payload;
	let descriptor = SOURCE_DESCRIPTORS[type];
	if(!descriptor) {
		throw new Error(`unrecognized upgrade type: ${repr(type)}`);
	}

	return convert(payload, descriptor);
});
