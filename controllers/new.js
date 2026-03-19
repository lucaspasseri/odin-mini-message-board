import * as messagesDb from "../db/queries/messages.js";
import { body, validationResult, matchedData } from "express-validator";

const textLengthErr = "(Must be between 1 and 300 characters)";
const usernameLengthErr = "(Must be between 1 and 30 characters)";

const validateNewMessage = [
	body("text").trim().isLength({ min: 1, max: 300 }).withMessage(textLengthErr),
	body("username")
		.trim()
		.isLength({ min: 1, max: 30 })
		.withMessage(usernameLengthErr),
];

async function getForm(req, res) {
	const formData = req.session.formData || {};
	delete req.session.formData;

	res.render("new", {
		title: "Create new message",
		form: formData,
		page: { path: "/new" },
	});
}

async function postForm(req, res) {
	const errors = validationResult(req);
	const originPage = req.body?.page;

	if (!errors.isEmpty()) {
		req.session.formData = {
			errors: errors.array(),
			old: req.body,
		};

		return res.redirect(originPage);
	}

	const { text, username } = matchedData(req);

	const newMessage = {
		text,
		username,
	};

	const newMessageId = await messagesDb.insertMessage(newMessage);

	res.redirect(`/#message-${newMessageId}`);
}

const postNewMessage = [validateNewMessage, postForm];

export { getForm, postNewMessage };
