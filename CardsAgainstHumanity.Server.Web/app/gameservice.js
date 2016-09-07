var App;
(function (App) {
    var GameProperties = (function () {
        function GameProperties() {
            return this;
        }
        GameProperties.prototype.getGameId = function () {
            return this.gameid;
        };
        GameProperties.prototype.setGameId = function (value) {
            this.gameid = value;
        };
        GameProperties.prototype.getPlayerId = function () {
            return this.playerid;
        };
        GameProperties.prototype.setPlayerId = function (value) {
            this.playerid = value;
        };
        GameProperties.prototype.getMaxTime = function () {
            return this.maxTime;
        };
        GameProperties.prototype.setMaxTime = function (value) {
            this.maxTime = value;
        };
        return GameProperties;
    }());
    App.GameProperties = GameProperties;
    App.CAH.Module.factory("gameproperties", function () { return new GameProperties(); });
})(App || (App = {}));
//(function () {
//    var app = angular.module('cah');
//    app.service('gameproperties', function () {
//        var gameid = '';
//        var playerid = '';
//        var maxTime = '30';
//        return {
//            getGameId: function () {
//                return gameid;
//            },
//            setGameId: function (value) {
//                gameid = value;
//            },
//            getPlayerId: function () {
//                return playerid;
//            },
//            setPlayerId: function (value) {
//                playerid = value;
//            },
//            getMaxTime: function () {
//                return maxTime;
//            },
//            setMaxTime: function (value) {
//                maxTime = value;
//            }
//        };
//    });
//})(); 
//# sourceMappingURL=gameservice.js.map