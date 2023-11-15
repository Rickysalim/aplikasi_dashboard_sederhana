const TypesController = require("../controllers/types");
const express = require("express");
const router = express.Router();

router.get("/types",  TypesController.findAllTypes);

module.exports = router;
