var scoresController = require('./controllers/scoresController');
var usersController = require('./controllers/usersController');
var authController = require('./controllers/authController');

exports.endpoints = [{method: 'GET', path: '/', config: {handler: function(request, reply){reply('Isaias es el mejor')}}},
	{method: 'GET', path: '/v1/scores', config: scoresController.getScoresAll}, //Obtiene todas las partituras en la base de datos
	{method: 'GET', path: '/v1/scoresUser', config: scoresController.getScoresUser}, //Obtiene partituras del usuario con sesion inciada
	{method: 'POST', path: '/v1/score', config: scoresController.createScore}, //Crea una partitura
	{method: 'POST', path: '/v1/register', config: usersController.createUser}, //Crea(registra) un usuario
	{method: 'GET', path: '/v1/users', config: usersController.getAllUsers}, //Obtiene todos los usuario
	{method: 'POST', path: '/v1/login', config: authController.login}, //Un usuario inicia sesion
	{method: 'GET', path: '/v1/logout', config: authController.logout} //Un usuario cierra sesion
];
