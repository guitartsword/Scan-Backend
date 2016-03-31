var user = require('../schemas/user');
var SHA3 = require("crypto-js/sha3");
var boom = require('boom');
//buscar usuarios por nombre
//agreagar, eliminar y listar amigos
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
        mail : request.payload.mail,
        name: {first : request.payload.name.first, last : request.payload.name.last}
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
  auth: {
    mode:'try',
    strategy:'session'
  },
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
    .populate('friends')
    .exec(function(err, loggedIn){
      if(err) reply (err);
      user.findOne({username: request.payload.username}, function(err, friend){
        if(err) reply (err);
        if(friend == undefined){
          reply("User not found");
        }else{
          var newFriend = loggedIn.friends.find(function(hasFriend){
            console.log("hasFriend:  "+ hasFriend._id);
            console.log("friend._id: "+friend._id);
            return String(hasFriend._id) === String(friend._id);
          });
          if(newFriend != undefined){
            reply("Already your friend");
          }else if(request.auth.credentials._id == friend._id){
            reply("Can't add yourself as friend");
          }else{
            loggedIn.friends.push(friend._id);
            loggedIn.save();
            reply("Added Successfully");
          }
        }
      });
    });
  }
}
exports.deleteFriend ={
  auth: {
    mode:'required',
    strategy:'session',
    scope:['regular']
  },
  handler: function(request, reply){
    user
    .findById(request.auth.credentials._id)
    .populate('friends')
    .exec(function(err, loggedIn){
      if(err) reply (err);
      user.findOne({username: request.payload.username}, function(err, friend){
        var toRemove = -1;
        loggedIn.friends.find(function(friendToRemove, index){
          if(String(friendToRemove._id) === String(friend._id)){
            toRemove = index;
            return true;
          }
        });
        if(toRemove != -1){
          loggedIn.friends.splice(toRemove,1);
          loggedIn.save();
          reply("Friend deleted correctly");
        }else{
          reply("Friend not found");
        }
      });
    });
  }
}
exports.listMyFriends = {
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
  });
  }
}
