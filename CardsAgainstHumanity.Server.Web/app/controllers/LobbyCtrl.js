var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var LobbyCtrl = (function () {
            function LobbyCtrl($scope, $location, $timeout, apiservice, gameproperties, signalrservice, signalrhubs) {
                this.$scope = $scope;
                this.$location = $location;
                this.$timeout = $timeout;
                this.apiservice = apiservice;
                this.gameproperties = gameproperties;
                this.signalrservice = signalrservice;
                this.signalrhubs = signalrhubs;
                $scope.GameId = gameproperties.getGameId();
                $scope.Players = [];
                $scope.GameIsReady = function () {
                    apiservice.GameReady(gameproperties.getGameId()).then(function (message) {
                        $timeout(function () {
                            $location.path('/hostround');
                            $scope.$apply();
                        });
                    }, function (error) { return console.log(error); });
                };
                signalrhubs.PlayerAddedFn = function (message) {
                    $scope.Players.push(message);
                    $scope.$apply();
                };
                signalrhubs.GameReadyFn = function (message) {
                    //$location.path('/hostround');
                    //$scope.$apply();
                };
            }
            LobbyCtrl.$inject = ['$scope', '$location', '$timeout', 'apiservice', 'gameproperties', 'signalrservice', 'signalrhubs'];
            return LobbyCtrl;
        }());
        Controllers.LobbyCtrl = LobbyCtrl;
        App.CAH.Module.controller('LobbyCtrl', function ($scope, $location, $timeout, apiservice, gameproperties, signalrservice, signalrhubs) {
            return new LobbyCtrl($scope, $location, $timeout, apiservice, gameproperties, signalrservice, signalrhubs);
        });
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=LobbyCtrl.js.map