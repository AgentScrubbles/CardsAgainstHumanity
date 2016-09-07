module App {
    export interface ILoadingCtrlScope extends ng.IScope {

    }

    export class LoadingCtrl {
        constructor(private $scope: ILoadingCtrlScope,
            private $location: ng.ILocationService,
            private gameproperties: IGameProperties,
            private signalrservice: ISignalRService,
            private signalrhubs: ISignalRHubs) {
            $location.path('/round');
            $scope.$apply();
        }
    }
    CAH.Module.controller('LoadingCtrl', LoadingCtrl);
}