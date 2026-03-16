import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import indexRouter from "./routes/index.js";
import newRouter from "./routes/new.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

// app.get("/", (_req, res) => {
// 	res.render("index", { data: { title: "Mini message board", messages } });
// });

app.use("/new", newRouter);

// app.get("/new", (_req, res) => {
// 	res.render("form", { data: { title: "Form" } });
// });

// app.post("/new", (req, res) => {
// 	const formattedDate = new Intl.DateTimeFormat("pt-BR", {
// 		hour: "2-digit",
// 		minute: "2-digit",
// 		day: "2-digit",
// 		month: "2-digit",
// 		year: "numeric",
// 	}).format(new Date());

// const newMessage = {
// 	id: randomUUID(),
// 	text: req.body.userMessage || "Have a nice day!",
// 	user: req.body.userName || "(Anonymous)",
// 	added: formattedDate,
// };
// messages.push(newMessage);
// res.redirect(`/#message-${newMessage.id}`);
// 	// res.redirect("/");
// });

app.get("/message/:messageId", (req, res) => {
	const messages = [];

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
