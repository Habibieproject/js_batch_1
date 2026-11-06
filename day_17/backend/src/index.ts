import "dotenv/config"; // WAJIB baris pertama: isi .env dibaca sebelum db.ts
import express from "express";
import { pool } from "./db.js";
import { produkRouter } from "./routes/produk.js";
import { authRouter, penggunaRouter } from "./routes/pengguna.js";
import { errorHandler } from "./middleware/error.js";

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

app.use(express.json());

app.get("/api/cek", async (_req, res) => {
  await pool.query("SELECT 1");
  res.json({ status: "ok", database: "terhubung" });
});
app.use("/api/produk", produkRouter);
app.use("/api/auth", authRouter);
app.use("/api/pengguna", penggunaRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Endpoint tidak ditemukan" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API KasirKu jalan di http://localhost:${PORT}`);
});
