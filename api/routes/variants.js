const VariantsController = require("../controllers/variants")
const express = require("express");
const router = express.Router();

router.get('/variants',  VariantsController.findAllVariants);

module.exports = router;