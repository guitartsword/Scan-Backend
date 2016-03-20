var mongoose = require('mongoose');
var ScoreSchema = new mongoose.Schema({
	composer: {required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //Compositor
	name : {required: true, type: String, trim:true},  //Nombre de la partitura
	clef : {required: true, type: String, trim:true}, //Tipo de Clave //Sol Fa
	tempo: {required: true, type:Number}, //Tiempo de Negra
	timeSignature: {required: true, type: String, trim:true}, //Tipo de Compas (4/4, 3/4, etc)
	key: {required: true, type: String, trim:true} //Key signature (Armadura)
});

module.exports = mongoose.model('Score', ScoreSchema);