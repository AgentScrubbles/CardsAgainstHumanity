var App;
(function (App) {
    var Models;
    (function (Models) {
        var GameScoreModel = (function () {
            function GameScoreModel() {
            }
            Object.defineProperty(GameScoreModel.prototype, "Scores", {
                get: function () {
                    return this._scores;
                },
                set: function (value) {
                    this._scores = value;
                },
                enumerable: true,
                configurable: true
            });
            return GameScoreModel;
        }());
        Models.GameScoreModel = GameScoreModel;
        var ScoreModel = (function () {
            function ScoreModel() {
            }
            Object.defineProperty(ScoreModel.prototype, "PlayerId", {
                get: function () {
                    return this._playerId;
                },
                set: function (value) {
                    this._playerId = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScoreModel.prototype, "Score", {
                get: function () {
                    return this._score;
                },
                set: function (value) {
                    this._score = value;
                },
                enumerable: true,
                configurable: true
            });
            return ScoreModel;
        }());
        Models.ScoreModel = ScoreModel;
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
