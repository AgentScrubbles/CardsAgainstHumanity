(function () {
    var app = angular.module('cah');
    app.controller('RoundHostCtrl', function ($scope, apiservice, gameproperties) {
        apiservice.CreateRound(gameproperties.getGameId(), function (roundNumber) {
            $scope.RoundNumber = roundNumber;
        }, function (error) { console.log(error); })
    });

    app.controller('RoundCtrl', function ($scope, gameproperties, apiservice) {
        console.log('PlayerId: ' + gameproperties.getPlayerId());
        apiservice.GetPlayerRound(gameproperties.getGameId(), gameproperties.getPlayerId(), function (result) {
            console.log(result);
            $scope.WhiteCards = result.WhiteCards;
            $scope.BlackCard = result.BlackCard;
            $scope.RoundNumber = result.RoundNumber;
        }, function (error) { });
    });
})();