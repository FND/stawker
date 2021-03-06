import generateShips from "./converters/ships";
import generateCaptains from "./converters/captains";
import generateAdmirals from "./converters/admirals";
import generateUpgrades from "./converters/upgrades";
import generateResources from "./converters/resources";
import { ensureKeys } from "./validation";
import { retrieveJSON } from "./util";

let devMode = process.env.NODE_ENV === "development";
/* eslint-disable indent */
const SOURCE = devMode ?
		"file://./staw_utopia.json" : // relative to working directory
		"https://kfnexus.github.io/staw-utopia/data/data.json";
/* eslint-enable indent */

/* eslint-disable indent */
const TOP_LEVEL_KEYS = ["ships", "shipClasses", "captains", "admirals",
		"upgrades", "resources", "sets", "missions", "missionSets", "others"];
/* eslint-enable indent */

export default async function retrieveCards() {
	if(!devMode) {
		console.error(`retrieving ${SOURCE}`);
	}
	let cards = await retrieveJSON(SOURCE);

	ensureKeys(cards, TOP_LEVEL_KEYS,
			repr => `unrecognized top-level keys: ${repr}`);

	return [].concat([],
			generateShips(cards.ships, cards.shipClasses),
			generateCaptains(cards.captains),
			generateAdmirals(cards.admirals),
			generateUpgrades(cards.upgrades),
			generateResources(cards.resources));
}
