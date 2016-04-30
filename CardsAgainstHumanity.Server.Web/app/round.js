(function () {
    var app = angular.module('cah');
    app.controller('RoundHostCtrl', function ($scope, apiservice, gameproperties) {
        apiservice.CreateRound(gameproperties.getGameId(), function (roundNumber) {
            $scope.RoundNumber = roundNumber;
        }, function (error) { console.log(error); })
    });

    app.controller('RoundCtrl', function ($scope, gameproperties, apiservice) {
        console.log('PlayerId: ' + gameproperties.getPlayerId());
        $scope.Items = [];
        $scope.Picks = [];

        $scope.GetPicks = function () {
            var arr = [$scope.BlackCard.Pick];
            for (var i = 0; i < $scope.BlackCard.Pick; i++){
                arr[i] = i;
            }
            return arr;
        };

        function clearPositions() {
            for (var i = 0; i < $scope.Items.length; i++) {
                $scope.Items[i].css = '';
            }
        }

        function format(str) {
            for (var i = 0; i < $scope.BlackCard.Pick; i++) {
                var symbol = '{' + i + '}';
                var pick = $scope.Picks[i];
                if (!pick) {
                    str = str.replace(symbol, '____');
                } else {
                    str = str.replace(symbol, pick.card.Value);
                }
                
            }
            return str;
        }

        function assignPositions() {
            for (var i = 0; i < $scope.Items.length; i++) {
                if (i === 0) {
                    $scope.Items[i].css = 'left-hidden';
                } else if (i === 1) {
                    $scope.Items[i].css = 'left';
                } else if (i === 2) {
                    $scope.Items[i].css = 'middle';
                } else if (i === 3) {
                    $scope.Items[i].css = 'right';
                } else {
                    $scope.Items[i].css = 'right-hidden';
                }
            }

        }

        $scope.scroll = function(direction) {
            if (direction === 'prev') {
                $scope.Items.push($scope.Items.shift());
            } else if (direction === 'next') {
                $scope.Items.unshift($scope.Items.pop());
            }
            clearPositions();
            assignPositions();
        }

        

        $scope.Select = function (index, pick) {
            var chosen = $scope.Items[index];
            $scope.Picks[pick] = chosen;
            $scope.Readout = format($scope.BlackCard.FormattableValue);
        }



        apiservice.GetPlayerRound(gameproperties.getGameId(), gameproperties.getPlayerId(), function (result) {
            clearPositions();
            $scope.WhiteCards = result.WhiteCards;
            for (var i = 0; i < $scope.WhiteCards.length; i++) {
                $scope.Items[i] = {card: $scope.WhiteCards[i], css: '', index: i}
            }
            assignPositions();
            $scope.BlackCard = result.BlackCard;
            $scope.RoundNumber = result.RoundNumber;
            $scope.Readout = $scope.BlackCard.BlankValue;
        }, function (error) { });
    });
})();