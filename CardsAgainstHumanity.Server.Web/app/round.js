(function () {
    var app = angular.module('cah');
    app.controller('RoundHostCtrl', function ($scope, $location, apiservice, gameproperties, signalrservice, signalrhubs) {
        $scope.GameId = gameproperties.getGameId();
        $scope.CountdownEnabled = true;
        $scope.MaxTime = 30; //Thirty seconds max
        $scope.RemainingSeconds = $scope.MaxTime;

        var allplayerssubmitted = function() {
            var all = true;
            for (var i in $scope.Players) {
                all = all && $scope.Players[i];
            }
            if (all) {
                $scope.RoundOver = all;
            }
            return all;
        }

        var completeRound = function() {
            apiservice.CompleteRound(gameproperties.getGameId(), function() {
                $location.path('/pickwinner');
            });
        }


        var countdown = function () {
            var refreshId = setInterval(function () {
                if ($scope.CountdownEnabled) {
                    if ($scope.RemainingSeconds <= 0) {
                        clearInterval(refreshId);
                        completeRound();
                    } else {
                        $scope.RemainingSeconds = $scope.RemainingSeconds - 1;
                        $scope.$apply();
                    }
                }
            }, 1000);
        }

        var startround = function () {
            $scope.RoundOver = false;
            apiservice.CreateRound(gameproperties.getGameId(), function(roundNumber) {
                $scope.RoundNumber = roundNumber;
                apiservice.GetHostRound($scope.GameId, function(result) {
                    $scope.Players = {};
                    for (var i = 0; i < result.Players.length; i++) {
                        var player = result.Players[i];
                        $scope.Players[player] = false;
                    }
                    $scope.BlackCard = result.BlackCard;
                }, function(error) {
                    console.log(error);
                });
                if ($scope.CountdownEnabled) {
                    countdown();
                }
            }, function(error) { console.log(error); });
        }

        signalrhubs.setOnPlayerSubmitted(function (playeraddedid) {
            $scope.Players[playeraddedid] = true;
            allplayerssubmitted();
            $scope.$apply();
        });


        startround();
    });

    app.controller('RoundCtrl', function ($scope, gameproperties, apiservice, signalrservice, signalrhubs) {
        console.log('PlayerId: ' + gameproperties.getPlayerId());
        $scope.Items = [];
        $scope.Picks = [];
        $scope.HasSubmitted = false;
        $scope.RoundOver = false;
        $scope.PlayersWhoSubmitted = [];

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

        function getFromId(whiteCardId) {
            for (var index in $scope.Items) {
                if ($scope.Items[index].card.WhiteCardId === whiteCardId) {
                    return $scope.Items[index];
                }
            }
        }

        $scope.scroll = function (direction) {
            clearPositions();
            if (direction === 'prev') {
                var itemToShift = $scope.Items.shift();
                $scope.Items.push(itemToShift);
            } else if (direction === 'next') {
                var pop = $scope.Items.pop();
                $scope.Items.unshift(pop);
            }
            assignPositions();
        }

        $scope.Submit = function () {
            var cardIds = [];
            for (var i = 0; i < $scope.Picks.length; i++) {
                cardIds[i] = $scope.Picks[i].card.WhiteCardId;
            }
            apiservice.SubmitCard(gameproperties.getGameId(), gameproperties.getPlayerId(), cardIds, function (result) {
                $scope.HasSubmitted = true;
                apiservice.PlayersWhoSubmitted(gameproperties.getGameId(), function(result) {
                    $scope.PlayersWhoSubmitted = result;

                }, function(error) {
                    console.log(error);
                })
                //Do something while waiting
            }, function (error) {
                console.log(error);
            });
        }

        $scope.Select = function (id, pick) {
            var chosen = getFromId(id);
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
        signalrhubs.setOnPlayerSubmitted(function (playeraddedid) {
            $scope.PlayersWhoSubmitted.push(playeraddedid);
        });
        signalrhubs.setOnRoundOver(function () {
            $scope.RoundOver = true;
        });
    });
})();