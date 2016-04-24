(function() {
    var app = angular.module("cah");

    app.factory("apiservice", function ($http) {

        var baseUrl = "http://localhost:63118/api/";
        return {
            CreateGame: function (callback, errorFn) {
                $http.get(baseUrl + "Match/CreateGame").then(function (result){callback(result.data)}, errorFn);
            }
        }
    });

})();