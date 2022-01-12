require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const connectDb = require("./databse/db");

const surveyRouter = require("./routes/survey");
const farmRouter = require("./routes/farm");
const unknownEndpoint = require("./middlewares/unknownEndpointHandler");
const errorHandler = require("./middlewares/errorHandlers");

connectDb()
  .then(() => {
    console.log("Databse is connected");
  })
  .catch((error) => {
    console.log("error connecting database", error);
  });

const app = express();
app.use(json());

app.use("/api/farms", farmRouter);
app.use("/api/surveys", surveyRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
