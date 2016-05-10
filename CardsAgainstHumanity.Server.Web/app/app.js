(function() {
    var app = angular.module("cah", ['ngRoute', 'ui.bootstrap']);

    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
          .when('/', { templateUrl: '/pages/main.html', controller: 'MainCtrl' })
          .when('/joingame', { templateUrl: '/pages/JoinGame.html', controller: 'JoinCtrl' })
          .when('/lobby', { templateUrl: '/pages/lobby.html', controller: 'LobbyCtrl' })
          .when('/loading', { templateUrl: '/pages/loading.html', controller: 'LoadingCtrl' })
          .when('/hostround', { templateUrl: '/pages/hostround.html', controller: 'RoundHostCtrl' })
          .when('/round', { templateUrl: '/pages/round.html', controller: 'RoundCtrl' })
          .when('/pickwinner', { templateUrl: '/pages/pickwinner.html', controller: 'PickWinnerCtrl' })
          .when('/error', { templateUrl: '/pages/error.html' })
          .otherwise({ redirectTo: '/error' });
    });

    app.controller('LoadingCtrl', function ($scope, $location, gameproperties, signalrservice, signalrhubs) {
        $scope.gameid = gameproperties.getGameId();
        signalrservice.Initialize(function () {
            signalrhubs.setOnGameReady(function (message) {
                $location.path('/round');
                $scope.$apply();
            });
        });
    });

    app.controller('MainCtrl', function ($scope, $location, apiservice, gameproperties, signalrservice, signalrhubs) {
        $scope.showmain = true;
        $scope.showjoin = false;
        $scope.showwaiting = false;
        $scope.gameid = '';
        $scope.playerid = '';

        $scope.StartGame = function () {
            apiservice.CreateGame(function(result) {
                gameproperties.setGameId(result);
                signalrservice.Initialize(function () {
                    $location.path('/lobby');
                    $scope.$apply();
                });
            });
        }
        $scope.JoinGame = function() {
            $scope.showmain = false;
            $scope.showjoin = true;
        }
        $scope.JoinGameWithPlayer = function () {
            gameproperties.setGameId($scope.gameid);
            apiservice.JoinGame($scope.gameid, $scope.playerid, function (result) {
                gameproperties.setPlayerId($scope.playerid);
                $scope.showmain = false;
                $scope.showjoin = false;
                $scope.showwaiting = true;
                if (result) {
                    $location.path('/round');
                } else {
                    $location.path('/loading');


                }
            }, function(error) {
                console.log(result);
            });
        }
        $scope.CancelJoinGame = function() {
            $scope.showmain = true;
            $scope.showjoin = false;
        }

    });

    app.controller('LobbyCtrl', function ($scope, $location, $timeout, apiservice, gameproperties, signalrservice, signalrhubs) {
        $scope.GameId = gameproperties.getGameId();
        $scope.Players = [];
        $scope.GameIsReady = function () {
            apiservice.GameReady(gameproperties.getGameId(), function (message) {
                $timeout(function () {
                    $location.path('/hostround');
                    $scope.$apply();
                });
            }, function(error){

            });
        }
        signalrhubs.setOnPlayerAdded(function (message) {
            $scope.Players.push(message);
            $scope.$apply();
        });
        signalrhubs.setOnGameReady(function (message) {
            //$location.path('/hostround');
            //$scope.$apply();
        });
    });

    app.controller('JoinCtrl', function ($scope, gameproperties, signalrservice, signalrhubs) {

    });

})();