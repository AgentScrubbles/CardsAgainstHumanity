module App {
    export interface IGameProperties {
        getGameId(): string;
        setGameId(value: string): void;
        getPlayerId(): string;
        setPlayerId(value: string): void;
        getMaxTime(): number;
        setMaxTime(value: number): void;
    }

    export class GameProperties implements IGameProperties {
        private gameid: string;
        private playerid: string;
        private maxTime: number;
        constructor() {
            return this;
        }
        getGameId(): string {
            return this.gameid;
        }
        setGameId(value: string): void {
            this.gameid = value;
        }
        getPlayerId(): string {
            return this.playerid;
        }

        setPlayerId(value: string): void {
            this.playerid = value;
        }

        getMaxTime(): number {
            return this.maxTime;
        }

        setMaxTime(value: number): void {
            this.maxTime = value;
        }
    }
    CAH.Module.factory("gameproperties", GameProperties);
}

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