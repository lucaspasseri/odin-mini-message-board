import * as messagesDb from "../db/queries/messages.js";

async function getForm(_req, res) {
	res.render("form", { title: "Form" });
}

async function postForm(req, res) {
	const newMessage = {
		text: req.body.text || "Have a nice day!",
		username: req.body.username || "(Anonymous)",
	};

	const newMessageId = await messagesDb.insertMessage(newMessage);

	res.redirect(`/#message-${newMessageId}`);
}

export { getForm, postForm };
