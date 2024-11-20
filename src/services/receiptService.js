const { v4: uuidv4 } = require('uuid');

exports.processReceiptService = (receipt) => {
    const id = uuidv4();
    const points = calculatePoints(receipt);
    return { id, points };
};

const calculatePoints = (receipt) => {
    let points = 0;

    // Business logic for points calculation
    points += (receipt.retailer.match(/[a-zA-Z0-9]/g) || []).length;
    if (parseFloat(receipt.total) % 1 === 0) points += 50;
    if (parseFloat(receipt.total) % 0.25 === 0) points += 25;
    points += Math.floor(receipt.items.length / 2) * 5;

    receipt.items.forEach((item) => {
        const trimmedDescription = item.shortDescription.trim();
        if (trimmedDescription.length % 3 === 0) {
            points += Math.ceil(parseFloat(item.price) * 0.2);
        }
    });

    const day = new Date(receipt.purchaseDate).getDate();
    if (day % 2 !== 0) points += 6;

    const [hour] = receipt.purchaseTime.split(':').map(Number);
    if (hour >= 14 && hour < 16) points += 10;

    return points;
};