import levenshtein from "fast-levenshtein";

let APPROX = Symbol("maybe");

// determine association candidates based on name equality or Levenshtein distance
export default ({ id, name }, cards) => {
	return cards.reduce((memo, card) => {
		let candidate = card.name;
		candidate = candidate.trim(); // XXX: workaround for Utopia inconsistencies
		if(!candidate) {
			return memo;
		}

		let match = candidate === name;
		if(!match) {
			let distance = levenshtein.get(name, candidate);
			if(distance < 2) {
				match = APPROX;
			}
		}

		return match ? memo.concat({ card, exact: match !== APPROX }) : memo;
	}, []);
};
