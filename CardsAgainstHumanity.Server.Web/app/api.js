(function() {
    var app = angular.module("cah");

    app.factory("apiservice", function ($http) {

        var baseUrl = "http://localhost:63118/api/";
        return {
            CreateGame: function (callback, errorFn) {
                $http.get(baseUrl + "Match/CreateGame").then(function (result){callback(result.data)}, errorFn);
            },
            JoinGame: function (gameid, playerid, callback, errorfn) {
                $http.post(baseUrl + 'Match/JoinGame', { GameId: gameid, PlayerId: playerid }).then(function (result) { callback(result.data) }, errorfn);
            },
            GameReady: function (gameid, callback, errorfn) {
                $http.get(baseUrl + 'Game/Start?GameId=' + gameid).then(function (result) { callback(result.data) }, errorfn);
            },
            CreateRound: function (gameid, callback, errorfn) {
                $http.get(baseUrl + 'Round/Create?GameId=' + gameid).then(function (result) { callback(result.data) }, errorfn);
            }
        }
    });

})();