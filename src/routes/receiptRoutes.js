const express = require('express');
const { processReceipt, getReceiptPoints } = require('../controllers/receiptController');

const router = express.Router();

router.post('/receipts/process', processReceipt);
router.get('/receipts/:id/points', getReceiptPoints);

module.exports = router;