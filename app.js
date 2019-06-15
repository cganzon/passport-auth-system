const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const app = express();
const PORT = process.env.PORT || 3000;

// Passport config
require("./config/passport")(passport);

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express session
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

// DB connection
mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/usersDB", { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.error(err));

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(PORT, console.log(`Server starting on port ${PORT}`));