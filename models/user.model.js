const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact_number: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    clients: [{
        type: mongoose.Schema.Types.ObjectId,
        refer: 'Client',
    }],
    invoices: [{
        type: mongoose.Schema.Types.ObjectId,
        refer: 'Invoice',
    }],
},
    { timestamps: true });

// compiling our schema into a Model
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;