import * as messageDb from "../db/queries/messages.js";

const getMessageDetails = async (req, res) => {
	const messageId = req.params.messageId;

	const message = await messageDb.getMessageById(messageId);

	res.render("message/messageId", {
		title: "Message Details",
		id: message.id,
		text: message.text,
		username: message.username,
		added: message.added,
	});
};

export { getMessageDetails };
