import * as messageDb from "../db/queries/messages.js";
import { formatMessageDate } from "../utils/formatDate.js";

const getIndex = async (req, res) => {
	const messages =
		(await messageDb.getAllMessages())?.map(message => ({
			...message,
			added: formatMessageDate(message.added),
		})) ?? [];

	const formData = req.session.formData || {};
	delete req.session.formData;

	res.render("index", {
		title: "Mini message board",
		data: { messages },
		form: formData,
		page: { path: "/" },
	});
};

export { getIndex };
