(function() {
    var app = angular.module("cah");
    app.controller('PickWinnerCtrl', function ($scope, apiservice, gameproperties) {
        apiservice.GetSubmissions(gameproperties.getGameId(), function(result) {

        }, function(error) {
            console.log(error);
        });
    });
})();