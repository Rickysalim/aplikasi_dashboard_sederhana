const { Transactions, Users, Clothes } = require("../models");

module.exports = class TransactionsContoller {
  static findAllTransactionSuccess(req, res) {
    Transactions.findAllTransactionSuccess()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          status: 500,
          message: error,
        });
      });
  }

  static findAllTransactionByStatus(req, res) {
    Transactions.findAllTransactionByStatus()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          status: 500,
          message: error,
        });
      });
  }

  static findAllTransaction(req, res) {
    Transactions.findAll({
      include: [
        {
          model: Users,
          as: "Users",
          attributes: ["users_picture", "users_fullname"],
        },
        {
          model: Clothes,
          as: "Clothes",
          attributes: ["clothes_name"],
        },
      ],
    })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({
          status: 400,
          message: error,
        });
      });
  }

  static createTransactions(req, res) {
    Transactions.createTransactions({ ...req.body })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: error,
        });
      });
  }
};
