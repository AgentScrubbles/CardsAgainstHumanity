(function() {
    var app = angular.module("cah");

    app.factory("signalrservice", function ($http, gameproperties, signalrhubs) {
        var baseUrl = "http://localhost:63118/";


        var playerHub;
        return {
            Initialize: function (done) {
                //jQuery.support.cors = true;
                $.connection.hub.url = baseUrl + "signalr";
                var playerHub = $.connection.player;
                playerHub.client.playerAdded = function (message) {
                    signalrhubs.OnPlayerAdded(message);
                }
                playerHub.client.gameReady = function (message) {
                    signalrhubs.OnGameReady(message);
                }
                
                        // Turn logging on so we can see the calls in the browser console
                $.connection.logging = true;
                console.log('Initializing signalr with url ' + $.connection.hub.url);
                $.connection.hub.start({ jsonp: true }).done(function () {

                    playerHub.server.subscribe(gameproperties.getGameId());
                    playerHub.client.playerAdded = function (playerName) {
                        console.log(playerName);
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