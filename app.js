import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import indexRouter from "./routes/index.js";
import newRouter from "./routes/new.js";
import messageRouter from "./routes/message.js";
import session from "express-session";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
	session({
		secret: "your-secret-key",
		resave: false,
		saveUninitialized: false,
	}),
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/new", newRouter);
app.use("/message", messageRouter);

app.listen(port, () => {
	console.log("Listen on http://localhost:" + port);
});
