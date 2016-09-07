module App {
    //Perform initialization on the module and store it in a safe location for easy access


    export class AppContainer {
        private app: ng.IModule;
        get Module() {
            return this.app;
        }
        set Module(value: ng.IModule) {
            this.app = value;
        }
    }

    export var CAH: AppContainer;
    CAH = new AppContainer();
    CAH.Module = angular.module('cah', ['ngRoute', 'ui.bootstrap']);
}