const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userData'); // Using CommonJS require

const userrouter = express.Router();

// Middleware to handle JSON data
userrouter.use(express.json());
userrouter.use(express.urlencoded({ extended: true }));

// POST /user route for login
userrouter.post('/', async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.body.username });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (user.password === req.body.password) {
            const payload = { uname: req.body.username }; // Avoid sending the password in the payload
            const token = jwt.sign(payload, "secret"); // Ensure to store secret securely
            return res.status(200).json({ message: "Login Successful", usertoken: token });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// GET /user route to retrieve all users
userrouter.get('/', async (req, res) => {
    try {
        const users = await userModel.find(); // Retrieves all users
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
});

module.exports = userrouter;
