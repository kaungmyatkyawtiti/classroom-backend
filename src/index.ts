import express from "express";
import { serverPort } from "./lib/env.js";

const app = express();

const server = app.listen(serverPort, () => {
  console.log(`Server running on ${serverPort}!`);
})
