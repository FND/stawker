import Card from "../card";

export class Ship extends Card {
	static get slots() {
		return super.slots.concat("factions", "unique", "cost", "attack",
				"agility", "hull", "shields", "actions", "upgrades", "desc");
	}

	constructor(fields, shipClass) {
		super(fields);
		this.class = shipClass;
	}
}

export class Squadron extends Ship {
	static get slots() {
		return super.slots.concat("skill");
	}
}
