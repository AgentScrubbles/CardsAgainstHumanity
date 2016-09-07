var App;
(function (App) {
    var Settings = (function () {
        function Settings() {
            this._baseApiUrl = "http://localhost:63118/api/";
            this._baseSignalRUrl = "http://localhost:63118/";
            return this;
        }
        Object.defineProperty(Settings.prototype, "BaseApiUrl", {
            get: function () {
                return this._baseApiUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Settings.prototype, "BaseSignalRUrl", {
            get: function () {
                return this._baseSignalRUrl;
            },
            enumerable: true,
            configurable: true
        });
        Settings.prototype.Test = function () { return "Test"; };
        return Settings;
    }());
    App.Settings = Settings;
    App.CAH.Module.factory('settings', function () { return new Settings(); });
})(App || (App = {}));
//# sourceMappingURL=settings.js.map