(function() {
    var app = angular.module('cah');
    app.service('gameproperties', function () {
        var gameid = '';
        var playerid = '';

        return {
            getGameId: function () {
                return gameid;
            },
            setGameId: function (value) {
                gameid = value;
            },
            getPlayerId: function() {
                return playerid;
            },
            setPlayerId: function(value) {
                playerid = value;
            }
        };
    });
})();