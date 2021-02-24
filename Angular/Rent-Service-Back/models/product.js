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
        type: user
    },
    uploadeddate: {
        type: Date
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
    }
});
module.exports = mongoose.model('Product', productSchema);