#!/usr/bin/env node -r esm
import importAll from "./import";

main();

async function main() {
	await importAll();
}
