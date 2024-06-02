const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

// Register a new user
const RegisterUser = AsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// User login
const LoginUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email or password is invalid");
    }
});

// Get current user info
const CurrentUser = AsyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// Get all users
const getUser = AsyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

module.exports = {
    RegisterUser,
    LoginUser,
    CurrentUser,
    getUser,
};
