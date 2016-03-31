var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
	name: {
		first: { type: String, required: true, trim: true},
		last: { type: String, required: true, trim: true}
	},
	mail: {type: String, unique: true, required: true},
	username : {type: String, unique: true, required: true},
	password : {type: String, required:true},
	scope : [String],
	friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);
