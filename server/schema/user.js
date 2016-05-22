var mongoose   = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt     = require('bcrypt-nodejs');


var User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    create_at:{type:Date, default: Date.now},
});
// Bcrypt middleware on UserSchema
User.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

User.methods.comparePassword = function(password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', User);