const express = require("express");
const router = express.Router();

// Login Route
router.get("/login", (req, res) => {
    res.send("This is the log in page");
});

// Register Route
router.get("/signup", (req, res) => {
    res.send("This is the sign up page");
});

module.exports = router;