const { Types } = require("../models");

module.exports = class TypesController {
  static findAllTypes(req, res)  {
    Types
    .findAll()
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
};
