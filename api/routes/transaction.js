const TransactionsController = require("../controllers/transactions")
const express = require("express");
const router = express.Router();

router.get('/transactions/total', TransactionsController.findAllTransactionSuccess)
router.get('/transactions/status', TransactionsController.findAllTransactionByStatus)
router.get('/transactions', TransactionsController.findAllTransaction)
router.post('/transactions', TransactionsController.createTransactions)

module.exports = router;
