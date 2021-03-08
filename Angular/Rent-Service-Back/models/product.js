const mongoose = require('mongoose');
const user = require('./user');
const ratings = require('./ratings')
var productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    owner: {
        type: Object
    },
    uploadeddate: {
        type: Date
    },
    address: {
        type: String
    },
    rentperday: {
        type: Number
    },
    deposits: {
        type: Number
    },
    images: {
        type: [String]
    },
    ratings: {
        type: [ratings]
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
});
module.exports = mongoose.model('Product', productSchema);