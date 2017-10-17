import Card from "./card";

class Leader extends Card {
	static get slots() {
		return super.slots.concat("factions", "unique", "cost", "skill",
				"talents", "desc");
	}
}

export class Captain extends Leader {
	static get slots() {
		return super.slots.concat("range");
	}
}

export class Admiral extends Leader {}
