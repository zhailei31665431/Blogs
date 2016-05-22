var mongoose   = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt     = require('bcrypt-nodejs');


var List = new Schema({
		title:{type:String},
    content:{ type: String,unique:true},
    create_at:{type:Date, default: Date.now}
});
// Bcrypt middleware on UserSchema

module.exports = mongoose.model('List', List);