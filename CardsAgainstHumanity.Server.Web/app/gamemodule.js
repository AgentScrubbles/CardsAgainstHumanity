var App;
(function (App) {
    //Perform initialization on the module and store it in a safe location for easy access
    var AppContainer = (function () {
        function AppContainer() {
        }
        Object.defineProperty(AppContainer.prototype, "Module", {
            get: function () {
                return this.app;
            },
            set: function (value) {
                this.app = value;
            },
            enumerable: true,
            configurable: true
        });
        return AppContainer;
    }());
    App.AppContainer = AppContainer;
    App.CAH = new AppContainer();
    App.CAH.Module = angular.module('cah', ['ngRoute', 'ui.bootstrap']);
})(App || (App = {}));
