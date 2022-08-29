const ItemModel = require('../models/item.model');

const router = require('express').Router();

// List items
router.get('/list', async (req, res) => {
    try {
        await ItemModel
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

// Add an item
router.post('/add', async (req, res) => {
    let { name, unit_price, description } = req.body;

    const newItem = new ItemModel({ name, unit_price, description });
    console.log(name, unit_price, description);
    try {
        let saveItem = await newItem.save();
        res.status(201).send('Place created with id: ' + saveItem.id);
    } catch (e) {
        res.status(501).send(e.message);
    }
})

module.exports = router;