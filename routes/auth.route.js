const UserModel = require('../models/user.model');

const router = require('express').Router();
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
router.post('/signup', async (req, res) => {
    const { email, name, password, contact_number, address, website } = req.body;
    if (!email || !name || !password || !contact_number || !address || !website) {
        res.status(400).send('All fields are required');
    }

    // Generate password hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
        name,
        email,
        password: hash,
        contact_number,
        address,
        website,
    })

    try {
        const savedUser = await newUser.save();
        res.status(201).send('User created with id: ' + savedUser.id);
    } catch (e) {
        res.status(501).send(e.message);
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser === null) {
        return res.status(501).send('Email not registered');
    }
    bcrypt.compare(password, existingUser.password).then(validPass => {
        // validPass returns true or false
        if (validPass) {
            // return res.status(201).send('Login Successful with ID: '+existingUser._id);
            const payload = {
                id: existingUser.id,
                email: existingUser.email,
            }
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
            return res.status(201).send({ accessToken, id: existingUser.id });
        } else {
            return res.status(501).send('Incorrect Password');
        }
    })
        .catch(err => console.log('error: ' + err));
})


module.exports = router;