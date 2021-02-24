const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const product = require('./product');
require('dotenv').config()
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'name cannot be empty'
    },
    email_id: {
        type: String,
        unique: true
    },
    isActivated: {
        type: String,
        default: "No"
    },
    mobile_no: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ["regular", "admin", "shipment"]
    },
    cart: {
        type: [String]
    }
});


module.exports = mongoose.model('User', userSchema);