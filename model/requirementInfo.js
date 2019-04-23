var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requirementInfo = new Schema ({
    informationType: {
        type: String,
        required: true
    },
    deadlineDate: {
        type: Date,
        required: false
    },
    requirementTitle: {
        type: String,
        required: true
    },
    requirementList:[{
        type: String,
        required: true
    }],
    accessCode: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('requirementInfo', requirementInfo);