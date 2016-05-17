(function () {
    var app = angular.module("cah");
    app.controller('scoreboardCtrl', function ($scope, $location, apiservice, gameproperties) {
        apiservice.GetScores(gameproperties.getGameId(), function (result) {
            $scope.Scores = result;
        }, function (error) {
            console.log(error);
        });

        $scope.GoToHome = function () {
            $location.path('/');
        }
    });

})();