/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
var App;
(function (App) {
    var Utilities;
    (function (Utilities) {
        var ParsedPromise = (function () {
            function ParsedPromise(promise) {
                var _this = this;
                this.promise = promise;
                promise.then(function (result) { return _this._complete(result.data); }, function (result) { return (_this._error ? _this._error(result) : function () { return undefined; }); });
            }
            ParsedPromise.prototype.then = function (complete, error) {
                this._complete = complete;
                this._error = error;
            };
            return ParsedPromise;
        }());
        Utilities.ParsedPromise = ParsedPromise;
    })(Utilities = App.Utilities || (App.Utilities = {}));
})(App || (App = {}));
//# sourceMappingURL=ParsedPromise.js.map