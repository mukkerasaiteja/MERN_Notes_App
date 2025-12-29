import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve absolute path to .env no matter where script runs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env before reading process.env
dotenv.config({ path: path.resolve(__dirname, ".env") });

const JWT_User_Secret = process.env.JWT_User_Secret;
const PORT = process.env.PORT;
const Mongo_URL = process.env.Mongo_URL;
const NODE_ENV = process.env.NODE_ENV;

export { JWT_User_Secret, PORT, Mongo_URL, NODE_ENV };
