const express = require('express');
const { RegisterUser, LoginUser, CurrentUser, getUser } = require('../controllers/UserController');
const router = express.Router();
const ValidToken = require("../errors/authenticate");

// Define routes for user registration, login, current user, and getting all users
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/current", ValidToken, CurrentUser);  // Protect this route with authentication middleware
router.get("/users",  getUser);  // Protect this route with authentication middleware

// Export the router to use in main server file
module.exports = router;
