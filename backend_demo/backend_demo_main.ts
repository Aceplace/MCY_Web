import express from "express";

const app = express();
const port = 3100;

app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ ok: true });
});

app.post("/echo", (req, res) => {
    res.json(req.body);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
