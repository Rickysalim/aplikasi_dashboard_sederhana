const { Variants } = require("../models");

module.exports = class VariantsController {
    static findAllVariants(req, res) {
      Variants
      .findAll()
      .then((data) => {
        return res.status(200).json(data)
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: error,
        });
      })
    };
}