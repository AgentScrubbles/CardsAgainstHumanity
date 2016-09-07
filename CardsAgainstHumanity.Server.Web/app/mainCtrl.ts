/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="./api.ts"/>

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

        static $inject = ["$scope", "$location", "gameproperties", "apiservice", "signalrservice", "signalrhubs"];
        constructor(private $scope: IMainCtrlScope,
            private $location: ng.ILocationService,
            private gameproperties : IGameProperties,
            private apiservice: ApiService,
            private signalrservice: ISignalRService,
            private signalrhubs: ISignalRHubs) {
            $scope.showmain = true;
            $scope.showjoin = false;
            $scope.showwaiting = false;
            $scope.gameid = '';
            $scope.playerid = '';
            $scope.StartGame = function () {
                var me = this;
               apiservice.CreateGame()
                    .then((result:any) => {
                        gameproperties.setGameId(result);
                        signalrservice.Initialize(() => {
                            $location.path('/lobby');
                            $scope.$apply();
                        });
                    }, (error) => console.log(error));
            }
            $scope.JoinGame = function () {
                this.showmain = false;
                this.showjoin = true;
            }
            $scope.JoinGameWithPlayer = function () {
                var me = this;
                gameproperties.setGameId(me.gameid);

                apiservice.JoinGame(me.gameid, me.playerid)
                    .then((result: any) => {
                        gameproperties.setPlayerId(me.playerid);
                        $scope.showmain = false;
                        $scope.showjoin = false;
                        $scope.showwaiting = true;
                        if (result.data) {
                            $location.path('/round');
                        } else {
                            $location.path('/loading');
                        }
                    }, (error) => console.log(error));
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