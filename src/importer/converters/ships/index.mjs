import convert from "../";
import ShipClassRegistry from "./registry";
import { Ship, Squadron } from "../../../models/ship";
import slot, { common } from "../slots";
import { ensureArray, ensureNonEmptyString, ensureInteger,
		ensureBoolean } from "../../validation";
import { repr } from "../../util";

const UPGRADES = new Set(["crew", "tech", "weapon", "squadron", "borg"]);

const ACTIONS = new Set(["battlestations", // eslint-disable-next-line indent
		"cloak", "evade", "regenerate", "scan", "sensor-echo", "target-lock"]);

const SOURCE_DESCRIPTOR = {
	type: "ship",
	model: Ship,
	slots: {
		name: common.name,
		classId: slot(ensureNonEmptyString, { optional: true }),
		class: ensureNonEmptyString,
		squadron: ensureBoolean,
		skill: (value, errMsg, fields) => {
			// XXX: fields' processing order matters; relying on `slot` object's ordering
			if(value === undefined) {
				return null;
			} else if(fields.squadron) {
				return common.skill(value, errMsg);
			} else {
				throw new Error(`\`skill\` is only valid for squadrons: ${repr(fields)}`);
			}
		},
		factions: common.factions,
		unique: slot("unique", { optional: true }),
		cost: common.cost,
		attack: common.attack,
		agility: ensureInteger,
		hull: ensureInteger,
		shields: ensureInteger,
		actions: (value, error) => ensureArray(value, { permitted: ACTIONS }, error),
		upgrades: (value, error) => ensureArray(value, { permitted: UPGRADES }, error),
		text: slot("text", { optional: [""] }),
		set: common.set,
		intercept: null,
		opBanned: null
	}
};

export default (ships, shipClasses) => {
	let registry = new ShipClassRegistry(shipClasses);
	return ships.map(payload => {
		return generateShip(payload, registry);
	});
};

function generateShip(payload, registry) {
	return convert(payload, SOURCE_DESCRIPTOR, fields => {
		let shipClass = fields.classId ? // eslint-disable-next-line indent
				registry.getByID(fields.classId) : registry.getByName(fields.class);
		if(!shipClass) {
			console.warn(`[WARN] missing class for ship ${repr(fields.id)}: ` +
					repr(fields.classId || fields["class"]));
		}

		let model = fields.squadron ? Squadron : Ship;
		return new model(fields, shipClass); // eslint-disable-line new-cap
	});
}
