const express = require("express");
const path = require("path");
const logger = require("morgan");
const indexRouter = require("./routes/index");
require("./bot.js");

const app = express();

app.use(logger("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", indexRouter);

module.exports = app;
