export default class Card {
	static get slots() {
		return ["id", "name"];
	}

	constructor(fields) {
		this.constructor.slots.forEach(field => {
			let value = fields[field];
			if(value !== undefined) {
				this[field] = value;
			}
		});
	}
}
