/// <reference path="../scripts/typings/angularjs/angular.d.ts" />

module App {
    export interface IMainCtrlScope extends ng.IScope {
        showmain: boolean;
        showjoin: boolean;
        showwaiting: boolean;
        gameid: string;
        playerid: string;

        StartGame(): void;
        JoinGame(): void;
        JoinGameWithPlayer(): void;
        CancelJoinGame(): void;
    }


    export class MainCtrl {


        constructor(private $scope: IMainCtrlScope,
            private $location: ng.ILocationService,
            private apiservice: IApiService,
            private signalrservice: ISignalRService,
            private signalrhubs: ISignalRHubs) {
            debugger;
            $scope.showmain = true;
            $scope.showjoin = false;
            $scope.showwaiting = false;
            $scope.gameid = '';
            $scope.playerid = '';
            $scope.StartGame = function () {
                var me = this;
                this.apiservice.CreateGame(function (result) {
                    me.gameProperties.setGameId(result);
                    me.signalRService.Initialize(function () {
                        me.$location.path('/lobby');
                        me.$apply();
                    });
                });
            }
            $scope.JoinGame = function () {
                this.showmain = false;
                this.showjoin = true;
            }
            $scope.JoinGameWithPlayer = function () {
                var me = this;
                me.gameProperties.setGameId(me.gameid);
                me.apiService.JoinGame(me.gameid, me.playerid, function (result) {
                    me.gameProperties.setPlayerId(me.playerid);
                    me.showmain = false;
                    me.showjoin = false;
                    me.showwaiting = true;
                    if (result) {
                        me.$location.path('/round');
                    } else {
                        me.$location.path('/loading');


                    }
                }, error => {
                    console.log(error);
                });
            }
            $scope.CancelJoinGame = function () {
                var me = this;
                me.showmain = true;
                me.showjoin = false;
            }
        }


    }
    CAH.Module.controller('MainCtrl', MainCtrl);

}