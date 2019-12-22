const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        unique: true
    },
    id: {
        type: Number,
        default: 0
    },
    lid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    players: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    multi: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: null
    },
    rotatin: {
        type: Boolean,
        default: true
    },
    inverted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

schema.set('toJson', {
    virtuals: true
});

module.exports = mongoose.model('Room', schema);