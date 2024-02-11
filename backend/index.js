import "dotenv/config";
import express from "express";
import { startConnection } from "./settings/db.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await startConnection({
    uri: process.env.MONGO_URI,
    database: process.env.DATABASE_NAME,
  });
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
