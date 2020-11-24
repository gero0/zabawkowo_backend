import "reflect-metadata";
import { createConnection } from "typeorm";
import express = require("express");
import addressRouter from "./routes/addressRouter";

//Create connection to database

createConnection()
  .then(async (connection) => {
    console.log("Connected to database :D");
  })
  .catch((error) => console.log(error));

const app = express();

app.use("/address", addressRouter);

app.listen(8000, () => {
  console.log("Server started at 8000");
});
