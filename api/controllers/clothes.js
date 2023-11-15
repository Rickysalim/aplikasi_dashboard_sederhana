const { Clothes, Types, Variants } = require("../models");

module.exports = class ClothesController {
  static findAllClothes(req, res) {
    Clothes.findAll({
      include: [
        {
          model: Types,
          as: "Types",
          attributes: ["types_name"],
        },
        {
          model: Variants,
          as: "Variants",
          attributes: ["variants_name"],
        },
      ],
    })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: error,
        });
      });
  };

  static createClothes(req, res) {
    console.info(req.body)
    Clothes
      .createClothes({ ...req.body })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        console.info(error)
        return res.status(500).json({
          status: 500,
          message: error,
        });
      });
  };

  static updateClothes(req, res)  {
    Clothes.update({ ...req.body }, { where: { clothes_id: req.params.id } })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: error,
        });
      });
  };

  static deleteClothes (req, res)  {
    Clothes.destroy({
      where: {
        clothes_id: req.params.id,
      },
    })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: error,
        });
      });
  };
};
