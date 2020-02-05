const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
})

router.post("/", async (req, res) => {
    const {
        email,
        name,
        phone,
        location,
        password,
        isUser
    } = req.body;
    const user = new User({
        email,
        name,
        phone,
        location,
        password,
        isUser
    })
    await user.save();
    res.json('User saved.')
})

router.put('/:id', async (req, res) => {
    const {
        email,
        name,
        phone,
        location,
        password,
        isUser
    } = req.body;
    const newUser = {
        email,
        name,
        phone,
        location,
        password,
        isUser
    }
    await User.findByIdAndUpdate(req.params.id, newUser);
    res.json({
        status: "User updated."
    })
})

router.delete('/:id', async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({
        status: "User deleted."
    })
})

module.exports = router;