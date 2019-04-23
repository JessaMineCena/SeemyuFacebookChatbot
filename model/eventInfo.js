var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventInfo = new Schema ({
    informationType:{
        type: String,
        required: true
    },
    dateTime:{
        'startDateTime': {
            type: Date,
            required: true
        },
        'endDateTime': {
            type: Date,
            required: true
        }
    },
    accessCode:{
        type: String,
        required: true
    },
    eventTitle:{
        type: String,
        required: true
    },
    eventDetails:{
        type: String,
        required: true
    },
    eventPlace:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('eventInfo', eventInfo);