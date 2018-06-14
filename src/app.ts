import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 5000);
app.use(compression());
app.use(bodyParser.json());

app.get("/api/status", (req, res) => {
  res.sendStatus(200);
});

export default app;