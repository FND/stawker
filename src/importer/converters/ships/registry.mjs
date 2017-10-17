import generateShipClass from "./class";

export default class ShipClassRegistry {
	constructor(shipClasses) {
		// generate ship classes, indexing them by ID and name
		this._byID = {};
		this._byName = {};
		shipClasses.reduce((memo, payload) => {
			let shipClass = generateShipClass(payload);
			memo.byID[shipClass.id] = shipClass;
			memo.byName[shipClass.name] = shipClass;
			return memo;
		}, {
			byID: this._byID,
			byName: this._byName
		});
	}

	getByID(id) {
		return this._byID[id];
	}

	getByName(name) {
		return this._byName[name];
	}
}
