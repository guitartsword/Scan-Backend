var scoresController = require('./controllers/scoresController');
var usersController = require('./controllers/usersController');
var authController = require('./controllers/authController');

exports.endpoints = [{method: 'GET', path: '/', config: {handler: function(request, reply){reply('API v1, Scores')}}},
	{method: 'GET', path: '/v1/scores', config: scoresController.getScoresAll},
	{method: 'GET', path: '/v1/scoresUser', config: scoresController.getScoresUser},
	{method: 'POST', path: '/v1/score', config: scoresController.createScore},
	//usersController
	{method: 'GET', path: '/v1/user/{username}', config: usersController.getUser},
	{method: 'POST', path: '/v1/register', config: usersController.createUser},
	{method: 'GET', path: '/v1/users', config: usersController.getAllUsers},
	{method: 'GET', path: '/v1/user/friends', config: usersController.listMyFriends},
	{method: 'PUT', path: '/v1/user/addFriend', config: usersController.addFriend},
	{method: 'PUT', path: '/v1/user/deleteFriend', config: usersController.deleteFriend},
	//TODO:{method: 'GET', path: '/v1/user/{username}'}, config: usersController.searchUser}
	//authController
	{method: 'POST', path: '/v1/login', config: authController.login},
	{method: 'GET', path: '/v1/logout', config: authController.logout}
];
