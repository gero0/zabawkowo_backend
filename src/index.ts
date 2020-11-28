import "reflect-metadata";
import { createConnection } from "typeorm";
import express = require("express");
import path = require("path");

import indexRouter from "./routes/site";
import offerRouter from "./routes/site/offer";
import apiUserRouter from "./routes/api/user"

//Create connection to database
createConnection()
  .then(async (connection) => {
    console.log("Connected to database :D");
  })
  .catch((error) => console.log(error));

//start our app
const app = express();

//packages required for json handling
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))



//Set the template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

//setting up directory for static files (css, js, images, etc)
app.use(express.static(path.join(__dirname, "static")));

//Routes for desktop site
app.use("/", indexRouter);
app.use("/offer", offerRouter);

//Routes for API
app.use("/api/user", apiUserRouter);

app.listen(8000, () => {
  console.log("Server started at 8000");
});
