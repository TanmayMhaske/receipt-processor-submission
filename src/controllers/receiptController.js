const { processReceiptService, getPointsService } = require('../services/receiptService');

const receipts = {}; // In-memory storage

exports.processReceipt = (req, res) => {
    const receipt = req.body;

    // Validate receipt
    if (!receipt.retailer || !receipt.purchaseDate || !receipt.purchaseTime || !receipt.items || !receipt.total) {
        return res.status(400).json({ error: 'Invalid receipt format' });
    }

    const { id, points } = processReceiptService(receipt);
    receipts[id] = points;

    res.status(200).json({ id });
};

exports.getReceiptPoints = (req, res) => {
    const id = req.params.id;

    if (!receipts[id]) {
        return res.status(404).json({ error: 'Receipt not found' });
    }

    res.status(200).json({ points: receipts[id] });
};