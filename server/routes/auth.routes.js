const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
    const {
        email,
        name,
        phone,
        location,
        password,
        password2,
        isUser
    } = req.body;
    let errors = [];

    // Check required fields
    if (!email || !name || !)
})