import "reflect-metadata";
import { createConnection } from "typeorm";
import express = require("express");
import path = require("path");
import fileUpload = require('express-fileupload');
const cors = require('cors');

import indexRouter from "./routes/site";
import offerRouter from "./routes/site/offer";
import userRouter from "./routes/site/user";
import chatRouter from "./routes/site/chat";

import apiUserRouter from "./routes/api/user"
import apiOfferRouter from "./routes/api/offer"

const cookieParser = require("cookie-parser");

//Create connection to database
createConnection()
  .then(async (connection) => {
    console.log("Connected to database :D");
  })
  .catch((error) => console.log(error));

//start our app
const app = express();

//packages required for json handling
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit:50000
}))
app.use(cookieParser());

//Set the template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

//setting up directory for static files (css, js, images, etc)
app.use(express.static(path.join(__dirname, "static")));

//Setting up middleware for uploading files
app.use(fileUpload({
  createParentPath: true
}));

//Routes for desktop site
app.use("/", indexRouter);
app.use("/offer", offerRouter);
app.use("/chat", chatRouter);
app.use("/user", userRouter);

//Routes for API
app.use("/api/user", apiUserRouter);
app.use("/api/offer", apiOfferRouter);

app.listen(8000, () => {
  console.log("Server started at 8000");
});
