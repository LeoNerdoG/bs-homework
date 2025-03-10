const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = 4000;

app.use(bodyParser.json());

// check if the content type is application/json
app.use((req, res, next) => {
    if (req.method === 'POST' && req.headers['content-type'] !== 'application/json') {
        return res.status(400).json({ error: 'Invalid Content-Type. Must be application/json.' });
    }
    next();
});

// function for validating userId, amount, assetType and address
const validateRequest = (userId, amount, assetType, address) => {
    const errors = [];

    if (!userId || !/^[a-zA-Z0-9]{10}$/.test(userId)) {
        errors.push('Invalid userId: Must be exactly 10 alphanumeric characters.');
    }
    if (amount === undefined || typeof amount !=='number' || isNaN(amount) || amount <= 0 || amount >= 100000) {
        errors.push('Invalid amount: Must be between 0 and 100000.');
    }
    if (!assetType || !/^[A-Z]{3}$/.test(assetType)) {
        errors.push('Invalid assetType: Must be exactly 3 uppercase letters.');
    }
    if (!address || !/^[a-zA-Z0-9]{20}$/.test(address)) {
        errors.push('Invalid address: Must be alphanumeric and 20 characters long.');
    }

    return errors;
};

app.post('/create/withdrawal', (req, res) => {
    const { assetType, amount, address, userId } = req.body;
    const errors = validateRequest(userId, amount, assetType, address);

    if (errors.length > 0) {
        return res.status(400).json({ error: errors });
    }

    const withdrawal = {
    id: Math.floor(Math.random()*1000000),
    assetType,
    amount,
    address,
    userId,
    status: 'Completed',
    timestamp: new Date().toISOString()
    };

    res.status(201).json({message: 'You have requested a withdrawal. Please hold.', withdrawal});
 });

app.post('/create/deposit', (req, res) => {
    const { assetType, amount, address } = req.body;
    const errors = validateRequest(amount, assetType, address);

    if (!assetType || !amount || !address) {
        return res.status(400).json({ error: 'You are missing some required fields. Mandatory fields are assetType, amount and address' });
    }

    // Simulate processing deposit (this would normally interact with a database)
    const deposit = {
        id: Math.floor(Math.random() * 1000000),
        assetType,
        amount,
        address,
        status: 'completed',
        timestamp: new Date().toISOString()
    };

    res.status(201).json({ message: 'Deposit request has been created. Please hold...', deposit });
});

app.get('/balance', (req, res) => {
    const { assetType, userId } = req.query;

       if (!userId || !/^[a-zA-Z0-9]{10}$/.test(userId)) {
            errors.push('Invalid userId: Must be exactly 10 alphanumeric characters.');
        }
        if (!assetType || !/^[A-Z]{3}$/.test(assetType)) {
            errors.push('Invalid assetType: Must be exactly 3 uppercase letters.');
        }

        if (errors.length > 0) {
            return res.status(400).json({ error: errors });
        }

    // Simulate retrieving balance (this would normally query a database)
    const balance = {
        userId,
        amount: Math.floor(Math.random() * 10000), // Simulated balance amount
        currency: assetType,
        timestamp: new Date().toISOString()
    };

    res.status(200).json({ message: 'Here you go: Your Balance!', balance });
});

// Gracefully handle unknown endpoints
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});