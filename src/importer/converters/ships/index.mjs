import convert from "../";
import ShipClassRegistry from "./registry";
import { Ship, Squadron } from "../../../models/ship";
import slot, { common } from "../slots";
/* eslint-disable indent */
import { ensureArray, ensureNonEmptyString, ensureInteger,
		ensureBoolean } from "../../validation";
/* eslint-enable indent */
import { repr } from "../../util";

const UPGRADES = new Set(["crew", "tech", "weapon", "squadron", "borg"]);

/* eslint-disable indent */
const ACTIONS = new Set(["battlestations", "cloak", "evade", "regenerate",
		"scan", "sensor-echo", "target-lock"]);
/* eslint-enable indent */

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
		unique: common.unique,
		cost: common.cost,
		attack: common.attack,
		agility: ensureInteger,
		hull: ensureInteger,
		shields: ensureInteger,
		actions: (value, error) => ensureArray(value, { permitted: ACTIONS }, error),
		upgrades: (value, error) => ensureArray(value, { permitted: UPGRADES }, error),
		text: slot("text", { optional: [""] }),
		set: common.set,
		intercept: null
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
		/* eslint-disable indent */
		let shipClass = fields.classId ?
				registry.getByID(fields.classId) :
				registry.getByName(fields.class);
		/* eslint-enable indent */
		let model = fields.squadron ? Squadron : Ship;

		return new model(fields, shipClass); // eslint-disable-line new-cap
	});
}
