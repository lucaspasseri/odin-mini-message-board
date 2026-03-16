import * as messageDb from "../db/queries/messages.js";

const format = date => {
	// possivelmente passar esta função pro banco de dados?

	const formattedDate = new Intl.DateTimeFormat("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).format(date);

	const dateParts = formattedDate.split(",");
	const finalDate = [dateParts[1], dateParts[0]].join(" - ");

	return finalDate;
};

const getIndex = async (_req, res) => {
	const messages =
		(await messageDb.getAllMessages())?.map(message => ({
			...message,
			added: format(message.added),
		})) ?? [];
	console.log({ messages });
	res.render("index", { title: "Mini message board", messages });
};

export { getIndex };
