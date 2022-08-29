// database imports
const express = require('express');
const mongoose = require('mongoose');
const DB_NAME = 'invoices-db'
const DB_URI = `mongodb+srv://admin:wB3iDDpS8mfrW6ko@cluster0.gcqabka.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

var cors = require('cors'); // allowing frontend connection
require('dotenv').config(); // accessing .eng file
const app = express();
const jwt = require('jsonwebtoken');
const morgan = require('morgan');

mongoose
    .connect(
        DB_URI,
        {
            useUnifiedTopology: true,
            useNewURLParser: true,
        },
    )
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));

// All router imports
const authRouter = require('./routes/auth.route')
const invoicesRouter = require('./routes/invoices.route');
const itemsRouter = require('./routes/items.route');
const clientsRouter = require('./routes/clients.route');


function authenticateRequest(req, res, next) {
    const authHeaderInfo = req.headers['authorization'];

    if (authHeaderInfo === undefined) {
        return res.status(401).send("No token was provided");
    }

    const token = authHeaderInfo.split(" ")[1];
    if (token === undefined) {
        return res.status(401).send("Proper token was not provided");
    }
    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userInfo = payload;
        next();
    } catch (error) {
        res.status(401).send("Invalid token provided" + error.message);
    }
}

// Middleware usage
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// Router related usage
app.use('/auth', authRouter);
app.use(authenticateRequest);
app.use('/invoices', invoicesRouter);
app.use('/items', itemsRouter);
app.use('/clients', clientsRouter);
app.listen(process.env.PORT || 8000);