var App;
(function (App) {
    var Models;
    (function (Models) {
        var SubmissionModel = (function () {
            function SubmissionModel() {
            }
            Object.defineProperty(SubmissionModel.prototype, "Submissions", {
                get: function () {
                    return this._submissions;
                },
                set: function (value) {
                    this._submissions = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SubmissionModel.prototype, "BlackCard", {
                get: function () {
                    return this._blackCard;
                },
                set: function (value) {
                    this._blackCard = value;
                },
                enumerable: true,
                configurable: true
            });
            return SubmissionModel;
        }());
        Models.SubmissionModel = SubmissionModel;
        var PlayerSubmissionModel = (function () {
            function PlayerSubmissionModel() {
            }
            Object.defineProperty(PlayerSubmissionModel.prototype, "PlayerId", {
                get: function () {
                    return this._playerId;
                },
                set: function (value) {
                    this._playerId = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PlayerSubmissionModel.prototype, "SubmittedAnswer", {
                get: function () {
                    return this._submittedAnswer;
                },
                set: function (value) {
                    this._submittedAnswer = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PlayerSubmissionModel.prototype, "Cards", {
                get: function () {
                    return this._cards;
                },
                set: function (value) {
                    this._cards = value;
                },
                enumerable: true,
                configurable: true
            });
            return PlayerSubmissionModel;
        }());
        Models.PlayerSubmissionModel = PlayerSubmissionModel;
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
//# sourceMappingURL=SubmissionModels.js.map