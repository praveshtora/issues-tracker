const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const dashboardRouter = require("./routes/dashboard");
const boardRouter = require("./routes/boards");
const issueRouter = require("./routes/issue");
const signinRouter = require("./routes/signin");
const db = require("./db/db");
const cors = require("cors");

const app = express().use("*", cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dashboard", dashboardRouter);
app.use("/board", boardRouter);
app.use("/issue", issueRouter);
app.use("/signin", signinRouter);

//Connection to Mongo
db.connect;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
