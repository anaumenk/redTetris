const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new Schema({
    _id: {
        type: Number
    },
    name: {
        type: String,
        unique: true
    },
    access: {
        type: Boolean,
        default: true
    },
    lid: {
        type: String
    }
},
{
    timestamps: true
}).plugin(AutoIncrement);

schema.set('toJson', {
    virtuals: true
});

module.exports = mongoose.model('Room', schema);