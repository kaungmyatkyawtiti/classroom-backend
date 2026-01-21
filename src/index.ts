import express from "express";
import { frontendUrl, serverPort } from "./lib/env.js";
import subjectRouter from "./routes/v1/subject.route";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({
  origin: frontendUrl,
  credentials: true
}));

// routes
app.use("/api", subjectRouter);

const server = app.listen(serverPort, () => {
  console.log(`Server running on ${serverPort}!`);
})
