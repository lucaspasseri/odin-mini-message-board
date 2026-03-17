export function formatMessageDate(date) {
	const formattedDate = new Intl.DateTimeFormat("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).format(date);

	const [datePart, timePart] = formattedDate.split(", ");
	return `${timePart} - ${datePart}`;
}
