const { Users } = require("../models");

module.exports = class UsersController {
  static registerAction(req, res) {
    Users.registerUser({ ...req.body })
      .then((data) => {
        console.info(data);
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: error,
        });
      });
  }

  static loginAction(req, res) {
    Users.authenticate({ ...req.body })
      .then((user) => {
        return res.status(200).json({
          token: user.generateToken(),
        });
      })
      .catch((error) => {
        console.info(error);
        return res.status(400).json({
          status: 400,
          message: error,
        });
      });
  }

  static getProfile(req, res) {
    const token = req?.headers["authorization"]?.split("Bearer ")[1];
    Users.findUserByToken(token)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        console.info(error);
        return res.status(500).json({
          status: 500,
          message: error,
        });
      });
  }

  static getAllUser(req, res) {
    Users.findAll({
      attributes: ['users_id','users_fullname']
    })
    .then((result) => {
      return res.status(200).json(result)
    })
    .catch((error) => {
      console.info(error);
        return res.status(500).json({
          status: 500,
          message: error,
        });
    })
  }
};
