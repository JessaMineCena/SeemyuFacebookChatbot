var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scholarshipInfo = new Schema({
    scholarshipTitle: {
        type: String,
        required: true
    },
    scholarshipDescription: {
        type: String,
        required: true
    },
    informationType: {
        type: String,
        required: true
    },
    accessCode: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('scholarshipInfo', scholarshipInfo);