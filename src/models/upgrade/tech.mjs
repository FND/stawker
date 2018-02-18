import Card from "../card";
import { determineArcs } from "./util";

export default class TechUpgrade extends Card {
	static get slots() {
		return super.slots.concat("factions", "unique", "cost", "attack",
				"hull", "skill", "talents", "range", "desc");
	}

	constructor(fields) {
		super(fields);
		this.arcs = determineArcs(fields);
	}
}
