(function() {
    var app = angular.module('cah');
    app.service('gameproperties', function () {
        var gameid = '';
        var playerid = '';
        var maxTime = '30';

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
            },
            getMaxTime: function() {
                return maxTime;
            },
            setMaxTime: function(value) {
                maxTime = value;
            }
        };
    });
})();