import express from "express";
import connection from "./database/db.js";
import DefaultData from "./default.js";
import { configDotenv } from "dotenv";
const app = express();
configDotenv();
const PORT = 8000;
const url = process.env.MONGODB_URL;
connection(url);
app.listen(PORT, () => {
  console.log(`App is running at Port ${8000}`);
});
DefaultData();
