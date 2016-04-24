(function() {
    var app = angular.module("cah", ['ngRoute']);

    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
          .when('/', { templateUrl: '/pages/main.html', controller: 'MainCtrl' })
          .when('/joingame', { templateUrl: '/pages/JoinGame.html', controller: 'JoinCtrl' })
          .when('/lobby', {templateUrl: '/pages/lobby.html', controller: 'LobbyCtrl'})
          .when('/error', { templateUrl: '/pages/error.html' })
          .otherwise({ redirectTo: '/error' });
    });


    app.controller('MainCtrl', function ($scope, $location, apiservice, gameproperties) {
        $scope.StartGame = function () {
            console.log('here');
            apiservice.CreateGame(function(result) {
                gameproperties.setProperty(result);
                $location.path('/lobby');
            });
        }
    });

    app.controller('LobbyCtrl', function($scope, apiservice, gameproperties) {
        $scope.GameId = gameproperties.getProperty();
    });

    app.controller('JoinCtrl', function ($scope, gameproperties) {
        $scope.Message = 'It worked!';
    });

})();