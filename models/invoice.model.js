const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true,
    },
    due_date: {
        type: Date,
        required: true,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        refer: 'Item',
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        refer: 'User',
        required: true,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        refer: 'Client',
        required: true,
    },
    paid: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true });

// compiling our schema into a Model
const InvoiceModel = mongoose.model("Invoice", invoiceSchema);
module.exports = InvoiceModel;