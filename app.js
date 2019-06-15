const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/usersDB", { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.error(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(PORT, console.log(`Server starting on port ${PORT}`));