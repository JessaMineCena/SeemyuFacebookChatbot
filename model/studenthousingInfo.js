var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studenthousingInfo = new Schema ({
    informationType: {
        type: String,
        required: true
    },
    studentHousing: {
        type: String,
        required: true
    }, 
    housingDetails: {
        type: String,
        required: true
    },
    contactPerson: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    accessCode: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('studenthousingInfo', studenthousingInfo);