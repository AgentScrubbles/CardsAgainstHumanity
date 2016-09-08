/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
var App;
(function (App) {
    var SignalRService = (function () {
        function SignalRService(settings, gameproperties, signalrhubs) {
            this.gameproperties = gameproperties;
            this.signalrhubs = signalrhubs;
            this.baseUrl = settings.BaseSignalRUrl;
            return this;
        }
        SignalRService.prototype.init = function (done) {
            var me = this;
            var j = $;
            var conn = j.connection;
            conn.hub.url = this.baseUrl + "signalr";
            console.log('Initializing SignalR at URL ' + conn.hub.url);
            var playerHub = conn.player;
            playerHub.client.playerAdded = function (message) {
                me.signalrhubs.PlayerAddedFn(message);
            };
            playerHub.client.gameReady = function (message) {
                console.log('game ready was called');
                me.signalrhubs.GameReadyFn(message);
            };
            playerHub.client.playerSubmitted = function (message) {
                me.signalrhubs.PlayerSubmittedFn(message);
            };
            playerHub.client.roundOver = function () {
                me.signalrhubs.RoundOverFn();
            };
            playerHub.client.gameEnded = function () {
                me.signalrhubs.GameEndedFn();
            };
            // Turn logging on so we can see the calls in the browser console
            conn.logging = true;
            console.log('Initializing signalr with url ' + conn.hub.url);
            conn.hub.start({ jsonp: true })
                .done(function () {
                console.log('Subscribing with gameId ' + me.gameproperties.getGameId());
                playerHub.server.subscribe(me.gameproperties.getGameId());
                playerHub.client.playerAdded = function (playerName) {
                };
                playerHub.client.gameReady = function (message) {
                    console.log('made it here for some reason');
                    me.signalrhubs.GameReadyFn(message);
                };
                playerHub.client.playerSubmitted = function (player) {
                    me.signalrhubs.PlayerSubmittedFn(player);
                };
                playerHub.client.roundOver = function () {
                    me.signalrhubs.RoundOverFn();
                };
                playerHub.client.gameEnded = function () {
                    me.signalrhubs.GameEndedFn();
                };
                done();
            });
        };
        SignalRService.prototype.Initialize = function (done) {
            var scriptUrl = this.baseUrl + '/signalr/hubs';
            var me = this;
            $.ajax({
                url: scriptUrl,
                dataType: 'script',
                success: function () {
                    me.init(done);
                },
                error: function (error) {
                    console.log(error);
                },
                async: true
            });
        };
        return SignalRService;
    }());
    App.SignalRService = SignalRService;
    App.CAH.Module.factory("signalrservice", function (settings, gameproperties, signalrhubs) { return new SignalRService(settings, gameproperties, signalrhubs); });
    var SignalRHubs = (function () {
        function SignalRHubs() {
            return this;
        }
        Object.defineProperty(SignalRHubs.prototype, "PlayerAddedFn", {
            get: function () {
                return this._playerAddedFn;
            },
            set: function (value) {
                this._playerAddedFn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalRHubs.prototype, "GameReadyFn", {
            get: function () {
                return this._gameReadyFn;
            },
            set: function (value) {
                this._gameReadyFn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalRHubs.prototype, "PlayerSubmittedFn", {
            get: function () {
                return this._playerSubmittedFn;
            },
            set: function (value) {
                this._playerSubmittedFn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalRHubs.prototype, "RoundOverFn", {
            get: function () {
                return this._roundOverFn;
            },
            set: function (value) {
                this._roundOverFn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalRHubs.prototype, "GameEndedFn", {
            get: function () {
                return this._gameEndedFn;
            },
            set: function (value) {
                this._gameEndedFn = value;
            },
            enumerable: true,
            configurable: true
        });
        return SignalRHubs;
    }());
    App.SignalRHubs = SignalRHubs;
    App.CAH.Module.factory("signalrhubs", function () { return new SignalRHubs(); });
})(App || (App = {}));
