import express from "express";
import { createItem, db, listItems } from "./db.ts";

const app = express();
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/items", (_req, res) => {
  res.json(listItems(db));
});

app.post("/api/items", (req, res) => {
  const title = typeof req.body?.title === "string" ? req.body.title.trim() : "";
  const details = typeof req.body?.details === "string" ? req.body.details.trim() : "";
  if (!title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }
  res.status(201).json(createItem(db, title, details));
});

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => {
  console.log(`api http://127.0.0.1:${port}`);
});
