var score = require('../schemas/score');
exports.getScoresAll = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin', 'regular']
  },
  handler: function(request, reply){
    var scores = score.find({});
    reply(scores);
  }
}
exports.getScoresUser = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin', 'regular']
  },
  handler: function(request, reply){

    var scores = score.find({composer: request.auth.credentials});
    reply(scores);
  }
}

exports.createScore = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin','regular']
  },
  handler: function(request, reply){
    var newScore = new score({
      composer: request.auth.credentials,
      name: request.payload.name,
      clef: request.payload.clef,
      tempo: request.payload.tempo,
      timeSignature: request.payload.timeSignature,
      key: request.payload.key
    });
    newScore.save();
    console.log('Score saved');
    return reply('ok');
  }
}
