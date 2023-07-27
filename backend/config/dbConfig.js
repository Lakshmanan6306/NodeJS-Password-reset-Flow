const mongoose = require('mongoose');
const validate = require('validator');
require('dotenv').config();

mongoose.connect(process.env.URI);

const user = new mongoose.Schema({
    email: {
        type: String, validate: (email) => {
            return validate.isEmail(email);
        }
    },
    password: { type: String, required: true },
    role: { type: String, required: true }
})

const userModel = mongoose.model('user', user);


module.exports = { userModel }