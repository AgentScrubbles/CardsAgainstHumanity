(function () {
    var app = angular.module('cah');
    app.controller('RoundHostCtrl', function ($scope, apiservice, gameproperties) {
        apiservice.CreateRound(gameproperties.getGameId(), function (roundNumber) {
            $scope.RoundNumber = roundNumber;
        }, function (error) { console.log(error); })
    });

    app.controller('RoundCtrl', function ($scope) {

    });
})();