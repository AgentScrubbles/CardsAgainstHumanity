/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="./gamemodule.ts"/>
/// <reference path="./signalr.ts"/>
/// <reference path="./settings.ts"/>
/// <reference path="./gameservice.ts"/>
/// <reference path="./mainCtrl.ts"/>
/// <reference path="./loadingCtrl.ts"/>

module App {
    'use strict';
   
    var app = CAH.Module; //Allow other places to reach this
    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', { templateUrl: '/pages/main.html', controller: 'MainCtrl' })
            .when('/joingame', { templateUrl: '/pages/JoinGame.html', controller: 'JoinCtrl' })
            .when('/lobby', { templateUrl: '/pages/lobby.html', controller: 'LobbyCtrl' })
            .when('/loading', { templateUrl: '/pages/loading.html', controller: 'LoadingCtrl' })
            .when('/hostround', { templateUrl: '/pages/hostround.html', controller: 'RoundHostCtrl' })
            .when('/round', { templateUrl: '/pages/round.html', controller: 'RoundCtrl' })
            .when('/pickwinner', { templateUrl: '/pages/pickwinner.html', controller: 'PickWinnerCtrl' })
            .when('/scoreboard', { templateUrl: '/pages/scoreboard.html', controller: 'scoreboardCtrl' })
            .when('/error', { templateUrl: '/pages/error.html' })
            .otherwise({ redirectTo: '/error' });
    });
    
}
