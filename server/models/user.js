const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    token: {
        type: String,
        unique: true,
    },
    score: {
        type: Schema.Types.ObjectId,
        ref: 'Score'
    }
},
{
    timestamps: true
});

schema.set('toJson', {
    virtuals: true
});

schema.pre('save', function(next) {
    const user = this;
    //console.log(user);
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    user.password = bcrypt.hashSync(user.password, 10);
    user.token = jwt.sign({ id: user.name }, "SECRET");
    next();
});

// schema.methods.comparePassword = (candidatePassword, cb) => {
//     console.log('pass: ' + candidatePassword);
//     console.log('thispass: ' + cb);
//   r eturn bcrypt.compareSync(password, this.password);
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

module.exports = mongoose.model('User', schema);