const express = require('express');
const receiptRoutes = require('./routes/receiptRoutes');

const app = express();
app.use(express.json());
app.use('/', receiptRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;