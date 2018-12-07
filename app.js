/eslint no-unused-vars: "off" /;
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const goods = require("./routes/goods");
const senders = require("./routes/senders");
const receivers = require("./routes/receivers");
const fuzzySearch = require("./routes/fuzzySearch");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.get("/goods/findTotalVotes", goods.findTotalVotes);
app.get("/goods",goods.findAllGoods);
app.get("/goods/:id",goods.findOneGood);
app.post("/goods",goods.addGood);
app.delete("/goods/:id",goods.deleteGood);
app.put("/goods/:id/changeLocation/:location", goods.changeGoodLocation);
app.put("/goods/:id/voteForDeliveryman",goods.incrementUpvotes);
//app.put("/goods/:id/changeDeliveryman/:name/:phoneNumber",goods.changeDeliveryman);


app.get("/senders",senders.findAllSenders);
app.get("/senders/:id",senders.findOneSender);
app.get("/senders/findCount/:senderName",senders.findCount);
app.post("/senders",senders.addSender);
app.delete("/senders/:id",senders.deleteSender);


app.get("/receivers",receivers.findAllReceivers);
app.get("/receivers/:id",receivers.findOneReceiver);
app.post("/receivers",receivers.addReceiver);
app.delete("/receivers/:id",receivers.deleteReceiver);
app.put("/receivers/:id/changePhoneNumber/:phoneNumber",receivers.changeReceiverPhoneNumber);
app.put("/receivers/:id/changeAddress/:address",receivers.changeReceiverAddress);


app.get("/fuzzySearch/:keyword",fuzzySearch.FuzzySearchGoodOrSenderOrReceiverName);


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
