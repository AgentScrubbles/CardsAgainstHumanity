(function () {
    var app = angular.module("cah");
    app.controller('scoreboardCtrl', function ($scope, $location, apiservice, gameproperties) {
        apiservice.GetScores(gameproperties.GetGameId(), function (result) {
            $scope.Scores = result;
        }, function (error) {
        });

        $scope.GoToHome = function () {
            $location.path('/');
        }
    });

})();