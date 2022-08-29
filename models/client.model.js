const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        refer: 'User',
    },
    address: {
        type: String,
        required: true,
    },
    contact_number: {
        type: String,
        required: true,
    },
},
    { timestamps: true });

// compiling our schema into a Model
const ClientModel = mongoose.model("Client", clientSchema);
module.exports = ClientModel;