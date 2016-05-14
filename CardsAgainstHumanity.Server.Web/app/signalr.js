(function() {
    var app = angular.module("cah");

    app.factory("signalrservice", function ($http, gameproperties, signalrhubs) {
        var baseUrl = "http://localhost:63118/";

        var init = function(done){
            
            //jQuery.support.cors = true;
            $.connection.hub.url = baseUrl + "signalr";
            console.log('Initializing SignalR at URL ' + $.connection.hub.url);
            var playerHub = $.connection.player;
            playerHub.client.playerAdded = function (message) {
                signalrhubs.OnPlayerAdded(message);
            }
            playerHub.client.gameReady = function (message) {
                console.log('game ready was called');
                signalrhubs.OnGameReady(message);
            }
            playerHub.client.playerSubmitted = function (message) {
                signalrhubs.OnPlayerSubmitted(message);
            }
            playerHub.client.roundOver = function() {
                signalrhubs.OnRoundOver();
            }
            playerHub.client.gameEnded = function () {
                signalrhubs.OnGameOver();
            }
                
            // Turn logging on so we can see the calls in the browser console
            $.connection.logging = true;
            console.log('Initializing signalr with url ' + $.connection.hub.url);
            $.connection.hub.start({ jsonp: true }).done(function () {
                console.log('Subscribing with gameId ' + gameproperties.getGameId());
                playerHub.server.subscribe(gameproperties.getGameId());
                playerHub.client.playerAdded = function (playerName) {
                }
                playerHub.client.gameReady = function (message) {
                    console.log('made it here for some reason');
                    signalrhubs.OnGameReady(message);
                }
                playerHub.client.playerSubmitted = function (player) {
                    signalrhubs.OnPlayerSubmitted(player);
                }
                playerHub.client.roundOver = function () {
                    signalrhubs.OnRoundOver();
                }
                playerHub.client.gameEnded = function () {
                    signalrhubs.OnGameOver();
                }
                done();
            });
        }


        var playerHub;
        return {
            Initialize: function (done) {
                var scriptUrl = baseUrl + '/signalr/hubs';
                    $.ajax({
                        url: scriptUrl,
                        dataType: 'script',
                        success: function () { init(done); },
                        error: function(error) { console.log(error);},
                        async: true
                    });

            }
        }
    });

    app.factory("signalrhubs", function() {
        var playerAddedFn;
        var gameReadyFn;
        var playerSubmittedFn;
        var roundOverFn;
        var gameEndedFn;

        return {
            OnPlayerAdded(data) {
                playerAddedFn(data);
            },
            setOnPlayerAdded(callback) {
                playerAddedFn = callback;
            },
            OnGameReady(data) {
                gameReadyFn(data);
            },
            setOnGameReady(callback) {
                gameReadyFn = callback;
            },
            OnPlayerSubmitted(data) {
                playerSubmittedFn(data);
            },
            setOnPlayerSubmitted(callback) {
                playerSubmittedFn = callback;
            },
            OnRoundOver() {
                roundOverFn();
            },
            setOnRoundOver(callback) {
                roundOverFn = callback;
            },
            OnGameOver() {
                gameEndedFn();
            },
            setOnGameover(callback) {
                gameEndedFn = callback;
            }
        }
    });
})();