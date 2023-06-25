import { JsonDB, Config } from "node-json-db";
import { join } from "path";

const dbPath = join(__dirname, "database.json");

const db = new JsonDB(new Config(dbPath, true, false, "/"));

export default db;
