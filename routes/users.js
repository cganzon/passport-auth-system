const express = require("express");
const router = express.Router();

// Login Route
router.get("/login", (req, res) => {
    res.render("login");
});

// Register Route
router.get("/signup", (req, res) => {
    res.render("signup");
});

module.exports = router;