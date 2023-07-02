import { JsonDB, Config } from "node-json-db";
import { join } from "path";

const dbPath = join(__dirname, "database.json");

const db = new JsonDB(new Config(dbPath, true, false, "/"));

const dbTables = ["/history/files", "/mails", "/users"];

dbTables.forEach(async (table) => {
  if (!(await db.exists(table))) {
    db.push(table, []);
  }
});

export default db;
