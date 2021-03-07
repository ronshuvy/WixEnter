import express from "express";
import bodyParser = require("body-parser");
import { serverAPIPort, APIPath } from "@fed-exam/config";

console.log("starting server", { serverAPIPort, APIPath });

const app = express();

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(APIPath, require("./tickets"));

app.listen(serverAPIPort);
console.log("server running", serverAPIPort);
