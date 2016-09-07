/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="./api.ts"/>
var App;
(function (App) {
    var MainCtrl = (function () {
        function MainCtrl($scope, $location, gameproperties, apiservice, signalrservice, signalrhubs) {
            this.$scope = $scope;
            this.$location = $location;
            this.gameproperties = gameproperties;
            this.apiservice = apiservice;
            this.signalrservice = signalrservice;
            this.signalrhubs = signalrhubs;
            $scope.showmain = true;
            $scope.showjoin = false;
            $scope.showwaiting = false;
            $scope.gameid = '';
            $scope.playerid = '';
            $scope.StartGame = function () {
                var me = this;
                apiservice.CreateGame()
                    .then(function (result) {
                    gameproperties.setGameId(result);
                    signalrservice.Initialize(function () {
                        $location.path('/lobby');
                        $scope.$apply();
                    });
                }, function (error) { return console.log(error); });
            };
            $scope.JoinGame = function () {
                this.showmain = false;
                this.showjoin = true;
            };
            $scope.JoinGameWithPlayer = function () {
                var me = this;
                gameproperties.setGameId(me.gameid);
                apiservice.JoinGame(me.gameid, me.playerid)
                    .then(function (result) {
                    gameproperties.setPlayerId(me.playerid);
                    $scope.showmain = false;
                    $scope.showjoin = false;
                    $scope.showwaiting = true;
                    if (result.data) {
                        $location.path('/round');
                    }
                    else {
                        $location.path('/loading');
                    }
                }, function (error) { return console.log(error); });
            };
            $scope.CancelJoinGame = function () {
                var me = this;
                me.showmain = true;
                me.showjoin = false;
            };
        }
        MainCtrl.$inject = ["$scope", "$location", "gameproperties", "apiservice", "signalrservice", "signalrhubs"];
        return MainCtrl;
    }());
    App.MainCtrl = MainCtrl;
    App.CAH.Module.controller('MainCtrl', MainCtrl);
})(App || (App = {}));
//# sourceMappingURL=mainCtrl.js.map