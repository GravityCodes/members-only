const { Client } = require("pg");
require("dotenv").config();


const SQL = `
  CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    member_status BOOLEAN
  );

  CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    author_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    date_added DATE NOT NULL,
    FOREIGN KEY(author_id) REFERENCES users(id)
  );

`;


async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:process.env.PGCONNECTIONURL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();