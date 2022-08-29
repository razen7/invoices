const ClientModel = require('../models/client.model');

const router = require('express').Router();

// List clients
router.get('/list', async (req, res) => {
    try {
        await ClientModel
            .find()
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
});

// Add a client
router.post('/add', async (req, res) => {
    let { name, employee, address, contact_number } = req.body;

    const newEntry = new ClientModel({ name, employee, address, contact_number });
    try {
        let saveEntry = await newEntry.save();
        res.status(201).send('Client created with id: ' + saveEntry.id);
    } catch (e) {
        res.status(501).send(e.message);
    }
})

module.exports = router;