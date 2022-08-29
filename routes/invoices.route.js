const InvoiceModel = require('../models/invoice.model');
const router = require('express').Router();

// List all Invoices and filter by status paid
router.post('/list', async (req, res) => {
    let { paid } = req.body;
    let filter;
    if (paid !== undefined) {
        filter = { paid };
    }

    try {
        await InvoiceModel
            .find(filter)
            .exec(function (err, docs) {
                if (docs) {
                    // 200 - 0k
                    res.status(200).send(docs);
                } else {
                    // 204	- No Content
                    res.status(204).send('no results');
                }
            });
    } catch (e) {
        res.status(501).send(e.message);
    }
})

// Add an Invoice
router.post('/add', async (req, res) => {
    let { number, due_date, items, creator, client } = req.body;
    items = items.split(' ');
    const newEntry = new InvoiceModel({ number, due_date, items, creator, client });
    try {
        let saveEntry = await newEntry.save();
        res.status(201).send('Invoice created with id: ' + saveEntry.id);
    } catch (e) {
        res.status(501).send(e.message);
    }
})

module.exports = router;