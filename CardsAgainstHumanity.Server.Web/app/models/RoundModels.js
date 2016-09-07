/// <reference path="./CardModel.ts"/>
var App;
(function (App) {
    var Models;
    (function (Models) {
        var PlayerRoundModel = (function () {
            function PlayerRoundModel() {
            }
            Object.defineProperty(PlayerRoundModel.prototype, "WhiteCards", {
                get: function () {
                    return this._whiteCards;
                },
                set: function (value) {
                    this._whiteCards = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PlayerRoundModel.prototype, "BlackCard", {
                get: function () {
                    return this._blackCard;
                },
                set: function (value) {
                    this._blackCard = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PlayerRoundModel.prototype, "RoundId", {
                get: function () {
                    return this._roundId;
                },
                set: function (value) {
                    this._roundId = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PlayerRoundModel.prototype, "PlayerId", {
                get: function () {
                    return this._playerId;
                },
                set: function (value) {
                    this._playerId = value;
                },
                enumerable: true,
                configurable: true
            });
            return PlayerRoundModel;
        }());
        Models.PlayerRoundModel = PlayerRoundModel;
        var HostRoundModel = (function () {
            function HostRoundModel() {
            }
            Object.defineProperty(HostRoundModel.prototype, "BlackCard", {
                get: function () {
                    return this._blackCard;
                },
                set: function (value) {
                    this._blackCard = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HostRoundModel.prototype, "Players", {
                get: function () {
                    return this._players;
                },
                set: function (value) {
                    this._players = value;
                },
                enumerable: true,
                configurable: true
            });
            return HostRoundModel;
        }());
        Models.HostRoundModel = HostRoundModel;
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
