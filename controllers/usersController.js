var user = require('../schemas/user');
var SHA3 = require("crypto-js/sha3");
var boom = require('boom');
//buscar usuarios por nombre
//agreagar y listar amigos
//una imagen
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
        name : request.payload.name,
        mail : request.payload.mail,
        proPic : request.payload.proPic
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
exports.addFriend = {
  auth: {
    mode:'required',
    strategy:'session',
    scope:['regular']
  },
  handler: function(request,reply){ //Sends a username
    user
    .findById(request.auth.credentials._id)
    .populate('friend')
    .exec(function(err, loggedIn){
      if(err) reply (err);
      console.log(loggedIn.friends);
      user.findOne({username: request.payload.username}, function(err, friend){
        if(err) reply (err);
        //VALIDAR SI YA TIENE ESE AMIGO
        //TAMBIEN VALIDAR QUE NO SE PUEDA AGREGAR A SI MISMO DE AMIGO
        loggedIn.friends.push(friend._id);
        loggedIn.save();
        reply("Added Successfully");
      });
    });
  }
}
exports.listFriends = {
  auth: {
    mode:'required',
    strategy:'session',
    scope:['regular']
  },
  handler: function(request, reply){
  user.findById(request.auth.credentials._id,function(err,users){
    if(err){
      reply(err);
    }
    reply(users.friends);
  });/*
    console.log(request.auth.credentials._id);
    console.log(request.auth.credentials.username);
    console.log(request.auth.credentials.friends );
    console.log(loggedUser);
    reply(loggedUser[0].friends);
    */
  }
}
