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


    app.controller('MainCtrl', function ($scope, $location, apiservice, gameproperties, signalrservice) {
        $scope.showmain = true;
        $scope.showjoin = false;
        $scope.gameid = '';
        $scope.playerid = '';

        $scope.StartGame = function () {
            console.log('here');
            apiservice.CreateGame(function(result) {
                gameproperties.setGameId(result);
                signalrservice.Initialize(function() {
                    $location.path('/lobby');
                });
            });
        }
        $scope.JoinGame = function() {
            $scope.showmain = false;
            $scope.showjoin = true;
        }
        $scope.JoinGameWithPlayer = function() {
            apiservice.JoinGame($scope.gameid, $scope.playerid, function(result) {
                console.log(result);
            }, function(error) {
                console.log(result);
            });
        }
        $scope.CancelJoinGame = function() {
            $scope.showmain = true;
            $scope.showjoin = false;
        }
    });

    app.controller('LobbyCtrl', function ($scope, apiservice, gameproperties, signalrservice, signalrhubs) {
        $scope.GameId = gameproperties.getGameId();
        signalrhubs.setOnPlayerAdded(function (message) {
            console.log(message);
        });
    });

    app.controller('JoinCtrl', function ($scope, gameproperties) {
        $scope.Message = 'It worked!';
    });

})();