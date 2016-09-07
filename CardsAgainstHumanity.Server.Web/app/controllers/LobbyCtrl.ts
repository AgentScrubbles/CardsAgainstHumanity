module App {
    export module Controllers {

        export interface ILobbyScope extends ng.IScope {
            GameId : string;
            Players: string[];
            GameIsReady : Function;
        }



        export class LobbyCtrl {


            static $inject = ['$scope', '$location', '$timeout', 'apiservice', 'gameproperties', 'signalrservice', 'signalrhubs']
            constructor(private $scope : ILobbyScope, private $location : ng.ILocationService, private $timeout : ng.ITimeoutService, private apiservice : IApiService, private gameproperties : IGameProperties, private signalrservice : ISignalRService, private signalrhubs : ISignalRHubs) {
                $scope.GameId = gameproperties.getGameId();
                $scope.Players = [];
                $scope.GameIsReady = function () {
                    apiservice.GameReady(gameproperties.getGameId()).then(message => {
                        $timeout(() => {
                            $location.path('/hostround');
                            $scope.$apply();
                        });
                    }, (error) => console.log(error));
                }
                signalrhubs.PlayerAddedFn = message => {
                    $scope.Players.push(message);
                    $scope.$apply();
                };
                signalrhubs.GameReadyFn = message => {
                    //$location.path('/hostround');
                    //$scope.$apply();
                };
            }
        }

        CAH.Module.controller('LobbyCtrl',
        ($scope: ILobbyScope,
            $location: ng.ILocationService,
            $timeout: ng.ITimeoutService,
            apiservice: IApiService,
            gameproperties: IGameProperties,
            signalrservice: ISignalRService,
            signalrhubs: ISignalRHubs) => new LobbyCtrl($scope,
            $location,
            $timeout,
            apiservice,
            gameproperties,
            signalrservice,
            signalrhubs));
    }
}