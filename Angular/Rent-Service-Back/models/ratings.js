const mongoose = require('mongoose');
const { allowedNodeEnvironmentFlags } = require('process');
const user = require('./user');

var ratings = {
    rater: {
        type: user
    },
    daterated: {
        type: Date
    },
    description: {
        type: String
    }
};
module.exports