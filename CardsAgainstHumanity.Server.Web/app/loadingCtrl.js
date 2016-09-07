var App;
(function (App) {
    var LoadingCtrl = (function () {
        function LoadingCtrl($scope, $location, gameproperties, signalrservice, signalrhubs) {
            this.$scope = $scope;
            this.$location = $location;
            this.gameproperties = gameproperties;
            this.signalrservice = signalrservice;
            this.signalrhubs = signalrhubs;
            $location.path('/round');
            $scope.$apply();
        }
        return LoadingCtrl;
    }());
    App.LoadingCtrl = LoadingCtrl;
    App.CAH.Module.controller('LoadingCtrl', LoadingCtrl);
})(App || (App = {}));
//# sourceMappingURL=loadingCtrl.js.map