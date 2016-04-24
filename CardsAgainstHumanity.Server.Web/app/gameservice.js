(function() {
    var app = angular.module('cah');
    app.service('gameproperties', function () {
        var gameid = '';

        return {
            getProperty: function () {
                return gameid;
            },
            setProperty: function (value) {
                gameid = value;
            }
        };
    });
})();