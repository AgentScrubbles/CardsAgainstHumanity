/// <reference path="../scripts/typings/jquery/jquery.d.ts" />


module App {
    export interface ISignalRService {
        Initialize(done: Function);
    }

    export class SignalRService implements ISignalRService {

        private baseUrl: string;

        constructor(settings: ISettings, private gameproperties: IGameProperties, private signalrhubs: ISignalRHubs) {
            this.baseUrl = settings.BaseSignalRUrl;
            return this;
        }

        private init(done: Function) {
            var me = this;


            var j: any = $;
            var conn: any = j.connection;

            conn.hub.url = this.baseUrl + "signalr";
            console.log('Initializing SignalR at URL ' + conn.hub.url);
            var playerHub = conn.player;
            playerHub.client.playerAdded = function(message) {
                me.signalrhubs.PlayerAddedFn(message);
            }
            playerHub.client.gameReady = function(message) {
                console.log('game ready was called');
                me.signalrhubs.GameReadyFn(message);
            }
            playerHub.client.playerSubmitted = function(message) {
                me.signalrhubs.PlayerSubmittedFn(message);
            }
            playerHub.client.roundOver = function() {
                me.signalrhubs.RoundOverFn();
            }
            playerHub.client.gameEnded = function() {
                me.signalrhubs.GameEndedFn();
            }

            // Turn logging on so we can see the calls in the browser console
            conn.logging = true;
            console.log('Initializing signalr with url ' + conn.hub.url);
            conn.hub.start({ jsonp: true })
                .done(function() {
                    console.log('Subscribing with gameId ' + me.gameproperties.getGameId());
                    playerHub.server.subscribe(me.gameproperties.getGameId());
                    playerHub.client.playerAdded = function(playerName) {
                    }
                    playerHub.client.gameReady = function(message) {
                        console.log('made it here for some reason');
                        me.signalrhubs.GameReadyFn(message);
                    }
                    playerHub.client.playerSubmitted = function(player) {
                        me.signalrhubs.PlayerSubmittedFn(player);
                    }
                    playerHub.client.roundOver = function() {
                        me.signalrhubs.RoundOverFn();
                    }
                    playerHub.client.gameEnded = function() {
                        me.signalrhubs.GameEndedFn();
                    }
                    done();
                });
        }


        Initialize(done: Function) {
            var scriptUrl = this.baseUrl + '/signalr/hubs';
            var me = this;
            $.ajax({
                url: scriptUrl,
                dataType: 'script',
                success() {
                    me.init(done);
                },
                error(error) {
                    console.log(error);
                },
                async: true
            });
        }
    }
    CAH.Module.factory("signalrservice", (settings: ISettings, gameproperties: IGameProperties, signalrhubs: ISignalRHubs) => new SignalRService(settings, gameproperties, signalrhubs));

    export interface ISignalRHubs {
        PlayerAddedFn: Function;
        GameReadyFn: Function;
        PlayerSubmittedFn: Function;
        RoundOverFn: Function;
        GameEndedFn : Function;
    }

    export class SignalRHubs implements ISignalRHubs {
        private _playerAddedFn: Function;
        private _gameReadyFn: Function;
        private _playerSubmittedFn: Function;
        private _roundOverFn: Function;
        private _gameEndedFn: Function;
        constructor() {
            return this;
        }
        get PlayerAddedFn(): Function {
            return this._playerAddedFn;
        }
        set PlayerAddedFn(value: Function) {
            this._playerAddedFn = value;
        }
        get GameReadyFn(): Function {
            return this._gameReadyFn;
        }
        set GameReadyFn(value: Function) {
            this._gameReadyFn = value;
        }
        get PlayerSubmittedFn(): Function {
            return this._playerSubmittedFn;
        }
        set PlayerSubmittedFn(value: Function) {
            this._playerSubmittedFn = value;
        }
        get RoundOverFn() : Function{
            return this._roundOverFn;
        }
        set RoundOverFn(value: Function) {
            this._roundOverFn = value;
        }
        get GameEndedFn() : Function {
            return this._gameEndedFn;
        }
        set GameEndedFn(value: Function) {
            this._gameEndedFn = value;
        }
    }
    CAH.Module.factory("signalrhubs", () => new SignalRHubs());
}

