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
            var p = this.$http.get(this.baseUrl + "Match/CreateGame");
            return new App.Utilities.ParsedPromise(p);
        };
        ApiService.prototype.JoinGame = function (gameid, playerid) {
            var p = this.$http.post(this.baseUrl + 'Match/JoinGame', { GameId: gameid, PlayerId: playerid });
            return new App.Utilities.ParsedPromise(p);
        };
        ApiService.prototype.EndGame = function (gameid) {
            var p = this.$http.get(this.baseUrl + 'Game/EndGame?GameId=' + gameid);
            return new App.Utilities.ParsedPromise(p);
        };
        ApiService.prototype.GetScores = function (gameid) {
            var p = this.$http.get(this.baseUrl + 'Game/Scores?GameId=' + gameid);
            return new App.Utilities.ParsedPromise(p);
        };
        ApiService.prototype.GameReady = function (gameid) {
            var p = this.$http.get(this.baseUrl + 'Game/Start?GameId=' + gameid);
            return new App.Utilities.ParsedPromise(p);
        };
        ApiService.prototype.CreateRound = function (gameid) {
            var p = this.$http.get(this.baseUrl + 'Round/Create?GameId=' + gameid);
            return new App.Utilities.ParsedPromise(p);
        };
        ApiService.prototype.GetPlayerRound = function (gameid, playerid) {
            var p = this.$http.get(this.baseUrl + 'Round/GetPlayerRound?GameId=' + gameid + '&PlayerId=' + playerid);
            return new App.Utilities.ParsedPromise(p);
        };
        ApiService.prototype.GetHostRound = function (gameid) {
            var p = this.$http.get(this.baseUrl + 'Round/GetHostRound?GameId=' + gameid);
            return new App.Utilities.ParsedPromise(p);
        };
        ApiService.prototype.SubmitCard = function (gameid, playerid, cardids) {
            var p = this.$http.post(this.baseUrl + 'Round/Submit', { GameId: gameid, PlayerId: playerid, CardIds: cardids });
            return new App.Utilities.ParsedPromise(p);
        };
        ApiService.prototype.GetSubmissions = function (gameid) {
            var p = this.$http.get(this.baseUrl + 'Round/Submissions?GameId=' + gameid);
            return new App.Utilities.ParsedPromise(p);
        };
        ApiService.prototype.PlayersWhoSubmitted = function (gameid) {
            var p = this.$http.get(this.baseUrl + 'Round/PlayersWhoSubmitted?GameId=' + gameid);
            return new App.Utilities.ParsedPromise(p);
        };
        ApiService.prototype.CompleteRound = function (gameid) {
            var p = this.$http.get(this.baseUrl + 'Round/End?GameId=' + gameid);
            return new App.Utilities.ParsedPromise(p);
        };
        ApiService.prototype.PickRoundWinner = function (gameid, playerid) {
            var p = this.$http.post(this.baseUrl + 'Round/SubmitWinner', { GameId: gameid, PlayerId: playerid });
            return new App.Utilities.ParsedPromise(p);
        };
        ApiService.$inject = ['$http', 'settings'];
        return ApiService;
    }());
    App.ApiService = ApiService;
    App.CAH.Module.factory("apiservice", function ($http, settings) { return new ApiService($http, settings); });
})(App || (App = {}));
//# sourceMappingURL=api.js.map