(function() {
    var app = angular.module("cah");

    app.factory("signalrservice", function ($http, gameproperties, signalrhubs) {
        var baseUrl = "http://localhost:63118/";

        var playerHub;
        return {
            Initialize: function (done) {
                jQuery.support.cors = true;
                var playerHub = $.connection.player;
                $.connection.hub.url = baseUrl + "signalr";
                        // Turn logging on so we can see the calls in the browser console
                $.connection.logging = true;

                $.connection.hub.start({ jsonp: true }).done(function () {
                    playerHub.server.subscribe(gameproperties.getGameId());
                });
                signalrhubs.setPlayerHub(playerHub);
                done();
            }
        }
    });

    app.factory("signalrhubs", function() {
        var playerHub;

        return {
            setPlayerHub(value) {
                playerHub = value;
            },
            setOnPlayerAdded(callback) {
                playerHub.on('playerAdded', function(message) {
                    callback(message);
                });
            }
        }
    });
})();