#!/usr/bin/env node -r esm
import loadMutaraCards from "./mutara";
import loadUtopiaCards from "./utopia";
import { report } from "../util";
import levenshtein from "fast-levenshtein";
import { repr } from "declepticon";

main();

async function main() {
	let utopiaCards = await loadUtopiaCards();
	utopiaCards.forEach((items, type) => {
		let count = `${items.size}`.padStart(4); // XXX: hard-coded
		report(`Utopia: imported ${count} ${type} cards`);
	});

	let mutaraCards = await loadMutaraCards();
	mutaraCards.forEach((items, type) => {
		let count = `${items.size}`.padStart(3); // XXX: hard-coded
		report(`Mutara: imported ${count} ${type} cards`);
	});

	// calculate association candidates based on Levenshtein distance
	utopiaCards.forEach((items, type) => {
		let mutara = mutaraCards.get(type);
		report(`${type}: Utopia ${items.size} vs. ${mutara ? mutara.size : 0} Mutara`);
		if(!mutara) {
			return;
		}

		mutara.forEach(entity => {
			let { name } = entity;
			if(!name) {
				return;
			}

			// find matching Utopia cards
			items.forEach(candidate => {
				let _name = candidate.name;
				if(!_name) {
					return;
				}

				let match;
				if(_name === name) {
					match = "=";
				} else {
					let distance = levenshtein.get(name, _name);
					if(distance < 2) {
						match = "≈";
					}
				}

				if(match) {
					report(`[${type}] "${name}" (${repr(entity.id)}) ` +
							`${match} "${_name}" (${repr(candidate.id)})`);
				}
			});
		});
	});
}
