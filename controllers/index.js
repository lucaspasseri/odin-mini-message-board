import * as messageDb from "../db/queries/messages.js";
import { formatMessageDate } from "../utils/formatDate.js";

const getIndex = async (_req, res) => {
	const messages =
		(await messageDb.getAllMessages())?.map(message => ({
			...message,
			added: formatMessageDate(message.added),
		})) ?? [];

	res.render("index", { title: "Mini message board", messages });
};

export { getIndex };
