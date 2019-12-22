const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    score: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

schema.set('toJson', {
    virtuals: true
});

module.exports = mongoose.model('Score', schema);