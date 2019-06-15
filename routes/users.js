const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Login Route
router.get("/login", (req, res) => {
    res.render("login");
});

// Register Route
router.get("/signup", (req, res) => {
    res.render("signup");
});

// Sign up handling
router.post("/signup", (req, res) => {
    // console.log(req.body);
    const { name, email, password, password2 } = req.body;
    let errors = [];
    // Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({
            msg: "Please fill in all fields"
        });
    };
    // Checking if the passwords match
    if (password != password2) {
        errors.push({
            msg: "Passwords do not match!"
        });
    };
    // Check if password is at least 6 characters long
    if (password.length < 6) {
        errors.push({
            msg: "Password must be at least six characters"
        });
    };
    if (errors.length > 0) {
        res.render("signup", {
            errors, name, email, password, password2
        });
    } else {
        // Checking if user already exists
        User.findOne({ email: email })
            .then(user => {
                // If user exists
                if (user) {
                    errors.push({
                        msg: "User already exists!"
                    });
                    res.render("signup", {
                        errors, name, email, password, password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    // Encrypting password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (error, hash) => {
                            if (error) throw error;
                            // Setting password to encrypted version
                            newUser.password = hash;
                            // Adding user to database
                            newUser.save()
                                .then(user => {
                                    req.flash("success_msg", "You are now signed up!");
                                    res.redirect("/users/login");
                                })
                                .catch(error => console.log(error));
                        });
                    });
                }
            });
    };
});

module.exports = router;