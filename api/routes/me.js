const UsersController = require("../controllers/users")
const express = require("express");
const router = express.Router();

router.get('/me',  UsersController.getProfile)

module.exports = router;