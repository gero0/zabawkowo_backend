import "reflect-metadata";
import { createConnection } from "typeorm";
import express = require("express");
import indexRouter from "./routes/indexRouter";
import path = require("path");

//Create connection to database
createConnection()
  .then(async (connection) => {
    console.log("Connected to database :D");
  })
  .catch((error) => console.log(error));

//start our app
const app = express();

//Set the template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

//setting up directory for static files (css, js, images, etc)
app.use(express.static(path.join(__dirname, "static")));

app.use("/", indexRouter);

app.listen(8000, () => {
  console.log("Server started at 8000");
});
