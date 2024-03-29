﻿(function() {
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
            EndGame: function(gameid, callback, errorfn){
                $http.get(baseUrl + 'Game/EndGame?GameId=' + gameid).then(function (result) { callback(result.data); }, errorfn);
            },
            GetScores: function(gameid, callback, error){
                $http.get(baseUrl + 'Game/Scores?GameId=' + gameid).then(function (result) { callback(result.data); }, error);
            },
            GameReady: function (gameid, callback, errorfn) {
                $http.get(baseUrl + 'Game/Start?GameId=' + gameid).then(function (result) { callback(result.data) }, errorfn);
            },
            CreateRound: function (gameid, callback, errorfn) {
                $http.get(baseUrl + 'Round/Create?GameId=' + gameid).then(function (result) { callback(result.data) }, errorfn);
            },
            GetPlayerRound: function (gameid, playerid, callback, errorfn) {
                $http.get(baseUrl + 'Round/GetPlayerRound?GameId=' + gameid + '&PlayerId=' + playerid).then(function (result) { callback(result.data) }, errorfn);
            },
            GetHostRound: function (gameid, callback, errorfn) {
                $http.get(baseUrl + 'Round/GetHostRound?GameId=' + gameid).then(function (result) { callback(result.data) }, errorfn);
            },
            SubmitCard: function (gameid, playerid, cardids, callback, errorfn) {
                $http.post(baseUrl + 'Round/Submit', { GameId: gameid, PlayerId: playerid, CardIds: cardids }).then(function (result) { callback(result.data) }, errorfn);
            },
            GetSubmissions: function (gameid, callback, errorfn) {
                $http.get(baseUrl + 'Round/Submissions?GameId=' + gameid).then(function (result) { callback(result.data), errorfn });
            },
            PlayersWhoSubmitted: function(gameId, callback, errorfn) {
                $http.get(baseUrl + 'Round/PlayersWhoSubmitted?GameId=' + gameId).then(function(result) { callback(result.data), errorfn });
            },
            CompleteRound: function(gameId, callback, errorfn) {
                $http.get(baseUrl + 'Round/End?GameId=' + gameId).then(function(result) { callback(result.data) }, errorfn);
            },
            PickRoundWinner: function(gameId, playerId, callback, errorfn) {
                $http.post(baseUrl + 'Round/SubmitWinner', { GameId: gameId, PlayerId: playerId }).then(function(result) { callback(result.data) }, errorfn);
            }
        }
    });

})();