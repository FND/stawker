import store from "./store/utopia";
import express from "express";

let app = express();
export default app;

app.get("/", async (req, res) => {
	res.status(200);
	res.set("Content-Type", "text/html");

	res.write("<h1>STAWker</h1>");

	let all = await store.all();
	res.write(`<p>${all.length} cards</p>`);
	res.end();
});
