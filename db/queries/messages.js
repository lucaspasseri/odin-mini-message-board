import pool from "../pool.js";

async function getAllMessages() {
	const { rows } = await pool.query("SELECT * FROM messages");
	return rows;
}

async function insertMessage({ text, username }) {
	const { rows } = await pool.query(
		`INSERT INTO messages (text, username) 
			VALUES ($1, $2)
			RETURNING id`,
		[text, username],
	);

	return rows[0].id;
}

async function getMessageById(messageId) {
	const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
		messageId,
	]);

	return rows[0];
}

export { getAllMessages, insertMessage, getMessageById };
