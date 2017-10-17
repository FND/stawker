import Card from "../card";

export default class WeaponUpgrade extends Card {
	static get slots() {
		return super.slots.concat("factions", "unique", "cost", "attack",
				"skill", "talents", "range", "desc");
	}

	constructor(fields) {
		super(fields);
		let arcs = new Set(fields.arc);
		this.arcs = {
			front: arcs.has("front"),
			rear: arcs.has("rear")
		};
	}
}
