(function() {
    var app = angular.module("cah");
    app.controller('PickWinnerCtrl', function ($scope, $location, apiservice, gameproperties) {

        $scope.Submissions = [];

        $scope.ShowSelected = false;

        apiservice.GetSubmissions(gameproperties.getGameId(), function(result) {
            $scope.Submissions = result.Submissions;
            $scope.BlackCard = result.BlackCard;
        }, function(error) {
            console.log(error);
        });

        var find = function(playerId) {
            for (var index in $scope.Submissions) {
                if ($scope.Submissions[index].PlayerId === playerId) {
                    return $scope.Submissions[index];
                }
            }
        }

        $scope.SelectSubmission = function(playerId) {
            $scope.Selection = find(playerId);
            $scope.ShowSelected = true;
        }

        $scope.PickRoundWinner = function(playerId) {
            apiservice.PickRoundWinner(gameproperties.getGameId(), playerId, function (result) {
                $location.path('/hostround');
            }, function (error) {
                console.log(error);
            });
        }
    });
})();