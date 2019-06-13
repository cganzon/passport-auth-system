const express = require("express");
const router = express.Router();

// Login Route
router.get("/login", (req, res) => {
    res.send("This is the login page");
});

// Register Route
router.get("/register", (req, res) => {
    res.send("This is the register page");
});

module.exports = router;