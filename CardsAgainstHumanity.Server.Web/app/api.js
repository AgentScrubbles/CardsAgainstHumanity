/// <reference path="./models/ScoreModel.ts"/>
var App;
(function (App) {
    var ApiService = (function () {
        function ApiService($http, settings) {
            this.$http = $http;
            this.baseUrl = settings.BaseApiUrl;
            return this;
        }
        ApiService.prototype.CreateGame = function () {
            return this.$http.get(this.baseUrl + "Match/CreateGame");
        };
        ApiService.prototype.JoinGame = function (gameid, playerid) {
            return this.$http.post(this.baseUrl + 'Match/JoinGame', { GameId: gameid, PlayerId: playerid });
        };
        ApiService.prototype.EndGame = function (gameid) {
            return this.$http.get(this.baseUrl + 'Game/EndGame?GameId=' + gameid);
        };
        ApiService.prototype.GetScores = function (gameid) {
            return this.$http.get(this.baseUrl + 'Game/Scores?GameId=' + gameid);
        };
        ApiService.prototype.GameReady = function (gameid) {
            return this.$http.get(this.baseUrl + 'Game/Start?GameId=' + gameid);
        };
        ApiService.prototype.CreateRound = function (gameid) {
            return this.$http.get(this.baseUrl + 'Round/Create?GameId=' + gameid);
        };
        ApiService.prototype.GetPlayerRound = function (gameid, playerid) {
            return this.$http.get(this.baseUrl + 'Round/GetPlayerRound?GameId=' + gameid + '&PlayerId=' + playerid);
        };
        ApiService.prototype.GetHostRound = function (gameid) {
            return this.$http.get(this.baseUrl + 'Round/GetHostRound?GameId=' + gameid);
        };
        ApiService.prototype.SubmitCard = function (gameid, playerid, cardids) {
            return this.$http.post(this.baseUrl + 'Round/Submit', { GameId: gameid, PlayerId: playerid, CardIds: cardids });
        };
        ApiService.prototype.GetSubmissions = function (gameid) {
            return this.$http.get(this.baseUrl + 'Round/Submissions?GameId=' + gameid);
        };
        ApiService.prototype.PlayersWhoSubmitted = function (gameid) {
            return this.$http.get(this.baseUrl + 'Round/PlayersWhoSubmitted?GameId=' + gameid);
        };
        ApiService.prototype.CompleteRound = function (gameid) {
            return this.$http.get(this.baseUrl + 'Round/End?GameId=' + gameid);
        };
        ApiService.prototype.PickRoundWinner = function (gameid, playerid) {
            return this.$http.post(this.baseUrl + 'Round/SubmitWinner', { GameId: gameid, PlayerId: playerid });
        };
        return ApiService;
    }());
    App.ApiService = ApiService;
    App.CAH.Module.factory("apiservice", ApiService);
})(App || (App = {}));
