import { Client } from "pg";

const sql = `
	DROP TABLE IF EXISTS messages;

	CREATE TABLE messages (
		id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		text TEXT,
		username VARCHAR(255),
		added TIMESTAMPTZ DEFAULT NOW()
	);

	INSERT INTO messages (text, username)
	VALUES
		('Hello world!', 'Adam'),
		('How are you doing?', 'Ben'),
		('Have a nice day!', 'Cris');
`;

async function main() {
	console.log("Seeding database...");

	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: process.env.DATABASE_URL?.includes("neon")
			? { rejectUnauthorized: false }
			: false,
	});

	try {
		await client.connect();
		await client.query(sql);
		console.log("Database seeded successfully.");
	} catch (err) {
		console.error("Error while seeding database:", err);
	} finally {
		await client.end();
		console.log("Connection closed.");
	}
}

main();
