import Card from "../card";
import { determineArcs } from "./util";

export default class WeaponUpgrade extends Card {
	static get slots() {
		return super.slots.concat("factions", "unique", "cost", "attack",
				"skill", "talents", "range", "desc");
	}

	constructor(fields) {
		super(fields);
		this.arcs = determineArcs(fields);
	}
}
