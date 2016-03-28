var user = require('../schemas/user');
var SHA3 = require("crypto-js/sha3");
var boom = require('boom');

exports.createUser = {
  auth: {
    mode:'try',
    strategy:'session'
  },
    handler: function(request, reply) {
      console.log(request.payload);
      var newUser = new user({
        username : request.payload.username,
        password : SHA3(request.payload.password),
        scope : request.payload.scope,
        mail : request.payload.mail,
        name : request.payload.name
      });
      console.log("saveFunction");
      newUser.save(function (err) {
        console.log(err);
      if(err){
        return reply(boom.notAcceptable('Username must be unique: ' + err));
      }else{
        return reply('ok');
      };
    });
  }
};

exports.getAllUsers = {
  handler: function(request, reply){
    console.log(user.find({}));
    reply(user.find({}));
  }
}
