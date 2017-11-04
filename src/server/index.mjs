#!/usr/bin/env node --experimental-modules --trace-warnings

import app from "./app";

const HOST = "localhost";
const PORT = 3000;

main();

async function main() {
	let server = app.listen(PORT, HOST, _ => {
		let { address, port } = server.address();
		console.log(`→ http://${address}:${port}`); // eslint-disable-line no-console
	});
}
