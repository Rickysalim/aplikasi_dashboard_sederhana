const ClothesController = require("../controllers/clothes");
const express = require("express");
const router = express.Router();

router.get("/clothes",ClothesController.findAllClothes);
router.post("/clothes", ClothesController.createClothes);
router.put(
  "/clothes/:id",
  ClothesController.updateClothes
);
router.delete(
  "/clothes/:id",
  ClothesController.deleteClothes
);

module.exports = router