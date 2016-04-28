(function() {
    var app = angular.module("cah");

    app.factory("signalrservice", function ($http, gameproperties, signalrhubs) {
        var baseUrl = "http://localhost:63118/";


        var playerHub;
        return {
            Initialize: function (done) {
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
                    done();
                });
            }
        }
    });

    app.factory("signalrhubs", function() {
        var playerAddedFn;
        var gameReadyFn;

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
            }
        }
    });
})();