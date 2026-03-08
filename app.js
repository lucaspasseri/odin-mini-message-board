import { randomUUID } from "crypto";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const messages = [];

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
	const formattedDate = new Intl.DateTimeFormat("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).format(new Date());

	const newMessage = {
		id: randomUUID(),
		text: req.body.userMessage,
		user: req.body.userName,
		added: formattedDate,
	};
	messages.push(newMessage);
	res.redirect("/");
});

app.get("/message/:messageId", (req, res) => {
	const currMessage = messages.filter(
		message => message.id === req.params.messageId,
	)[0];

	res.render("message/messageId", {
		data: {
			title: "Message Details",
			id: currMessage.id,
			text: currMessage.text,
			user: currMessage.user,
			added: currMessage.added,
		},
	});
});

app.listen(port, () => {
	console.log("Listen on http://localhost:" + port);
});
