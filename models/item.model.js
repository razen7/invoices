const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    unit_price: {
        type: mongoose.Decimal128,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
},
    { timestamps: true });

// compiling our schema into a Model
const ItemModel = mongoose.model("Item", itemSchema);
module.exports = ItemModel;