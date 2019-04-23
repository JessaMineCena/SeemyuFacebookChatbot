var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var processInfo = new Schema({
    informationType: {
        type: String,
        required: true
    },
    processTitle: {
        type: String,
        required: true
    },
    processList: [{
        type: String,
        required: true
    }],
    processDate: {
        startDate: {
            type: Date
        },
        endDate: {
            type: String,
        }
    },
    accessCode: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('processInfo', processInfo);