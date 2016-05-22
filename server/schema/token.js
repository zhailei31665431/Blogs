var mongoose   = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt     = require('bcrypt-nodejs');
// User schema
var Token = new Schema({
    email: { type: String, required: true, unique: true },
    token: {
    	type: String,required:true,unique:true
    },
    create_at:{type:Date, default: Date.now},
    // expire: { type: Date, index: { expireAfterSeconds: 600 } }
});
 
Token.pre('save', function(next) {
  next();
});

module.exports = mongoose.model('Token', Token);