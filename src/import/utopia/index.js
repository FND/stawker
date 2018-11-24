import utopiaShip from "./ship";
import utopiaShipClass from "./ship_class";
import { captain as utopiaCaptain, admiral as utopiaAdmiral } from "./leader";
import utopiaUpgradeRegistry from "./upgrades";
import utopiaResource from "./resource";
import utopiaSet from "./set";
import { load, setUnique } from "../util";
import { report } from "../../util";
import { utopia as config } from "../../config";
import { transformation, validators } from "declepticon";

let KNOWN_DUPE_SHIP_CLASS = "Maquis Raider";

let { array } = validators;
let root = {
	name: "Utopia",
	fields: {
		ships: array,
		shipClasses: array,
		captains: array,
		admirals: array,
		upgrades: array,
		resources: array,
		sets: array,
		missions: array,
		missionSets: array,
		others: array
	},
	slots: {
		ships: true,
		shipClasses: true,
		captains: true,
		admirals: true,
		upgrades: true,
		resources: true,
		sets: true
	}
};

export default async function loadCards() {
	let { ships, shipClasses, captains, admirals, upgrades, resources,
		sets } = await load(config, root);

	let byType = { ships, // eslint-disable-next-line object-property-newline
		"ship classes": shipClasses, captains, admirals, upgrades, resources, sets };
	Object.entries(byType).forEach(([type, items]) => {
		let count = `${items.length}`.padStart(4); // XXX: hard-coded
		report(`Utopia: importing ${count} ${type}`);
	});

	let cards = new Map();
	let setRegistry = transformAll(sets, utopiaSet);
	cards.set("ship", transformAll(ships, utopiaShip, {
		shipClasses: indexShipClasses(shipClasses),
		sets: setRegistry
	}));
	cards.set("captain", transformAll(captains, utopiaCaptain, setRegistry));
	cards.set("admiral", transformAll(admirals, utopiaAdmiral, setRegistry));
	cards.set("upgrade", transformAll(upgrades,
			record => utopiaUpgradeRegistry.get(record), setRegistry));
	cards.set("resource", transformAll(resources, utopiaResource, setRegistry));
	return cards;
}

function indexShipClasses(classes) {
	let byName = new Map();
	let byID = transformAll(classes, utopiaShipClass, null, (shipClass, type) => {
		let { name } = shipClass;
		if(name !== KNOWN_DUPE_SHIP_CLASS) {
			setUnique(byName, name, shipClass, type);
		}
	});
	return { byID, byName };
}

// NB: indexes entities by ID
function transformAll(data, descriptor, context, callback) {
	let deferred = descriptor.call; // descriptor depends on individual record
	let transform = deferred ? null : transformation(descriptor);
	let type = deferred ? null : descriptor.name;

	return data.reduce((memo, record) => {
		if(deferred) {
			[type, transform] = descriptor(record);
		}

		let entity = transform(record, context);
		setUnique(memo, entity.id, entity, type);

		if(callback) {
			callback(entity, type);
		}

		return memo;
	}, new Map());
}
