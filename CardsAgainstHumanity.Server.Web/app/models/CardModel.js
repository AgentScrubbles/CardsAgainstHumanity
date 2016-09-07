var App;
(function (App) {
    var Models;
    (function (Models) {
        var WhiteCardModel = (function () {
            function WhiteCardModel() {
            }
            Object.defineProperty(WhiteCardModel.prototype, "WhiteCardId", {
                get: function () {
                    return this._whiteCardId;
                },
                set: function (value) {
                    this._whiteCardId = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WhiteCardModel.prototype, "Value", {
                get: function () {
                    return this._value;
                },
                set: function (value) {
                    this._value = value;
                },
                enumerable: true,
                configurable: true
            });
            return WhiteCardModel;
        }());
        Models.WhiteCardModel = WhiteCardModel;
        var BlackCardModel = (function () {
            function BlackCardModel() {
            }
            Object.defineProperty(BlackCardModel.prototype, "BlackCardId", {
                get: function () {
                    return this._blackCardId;
                },
                set: function (value) {
                    this._blackCardId = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BlackCardModel.prototype, "RawValue", {
                get: function () {
                    return this._rawValue;
                },
                set: function (value) {
                    this._rawValue = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BlackCardModel.prototype, "Pick", {
                get: function () {
                    return this._pick;
                },
                set: function (value) {
                    this._pick = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BlackCardModel.prototype, "BlankValue", {
                get: function () {
                    return this._blankValue;
                },
                set: function (value) {
                    this._blankValue = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BlackCardModel.prototype, "FormattableValue", {
                get: function () {
                    return this._formattableValue;
                },
                set: function (value) {
                    this._formattableValue = value;
                },
                enumerable: true,
                configurable: true
            });
            return BlackCardModel;
        }());
        Models.BlackCardModel = BlackCardModel;
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
//# sourceMappingURL=CardModel.js.map