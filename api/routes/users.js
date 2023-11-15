const UsersController = require("../controllers/users");
const express = require("express");
const router = express.Router();
const { runValidation, registerValidation, loginValidation} = require('../utils/validation')

router.post("/user", registerValidation, runValidation, UsersController.registerAction);
router.post("/auth", loginValidation, runValidation, UsersController.loginAction);
router.get("/all/users", UsersController.getAllUser);

module.exports = router;
