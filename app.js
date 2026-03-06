import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const messages = [
	{
		text: "Hi there!",
		user: "Amando",
		added: new Date(),
	},
	{
		text: "Hello World!",
		user: "Charles",
		added: new Date(),
	},
	{
		text: "Hi there!",
		user: "Amando",
		added: new Date(),
	},
	{
		text: "Hello World!",
		user: "Charles",
		added: new Date(),
	},
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
	res.render("index", { data: { title: "Mini message board", messages } });
});

app.get("/new", (_req, res) => {
	res.render("form", { data: { title: "Form" } });
});

app.post("/new", (req, res) => {
	console.log({ b: req.body });
	const newMessage = {
		text: req.body.userMessage,
		user: req.body.userName,
		added: new Date(),
	};
	messages.push(newMessage);
	res.redirect("/");
});

app.listen(port, () => {
	console.log("Listen on http://localhost:" + port);
});
