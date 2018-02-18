export function determineArcs({ arc, arc360 }) {
	let arcs = new Set(arc);
	return {
		front: arcs.has("front"),
		rear: arcs.has("rear"),
		360: !!arc360
	};
}
