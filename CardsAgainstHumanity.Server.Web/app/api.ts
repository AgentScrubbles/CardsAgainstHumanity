/// <reference path="./models/ScoreModel.ts"/>

module App {

    export interface IApiService {
        CreateGame() : ng.IPromise<string>;
        JoinGame(gameid: string, playerid: string) : ng.IPromise<boolean>;
        EndGame(gameid: string) : ng.IPromise<{}>;
        GetScores(gameid: string) : ng.IPromise<Models.GameScoreModel>;
        GameReady(gameid: string) : ng.IPromise<{}>;
        CreateRound(gameid: string) : ng.IPromise<number>;
        GetPlayerRound(gameid: string, playerid: string) : ng.IPromise<Models.PlayerRoundModel>;
        GetHostRound(gameid: string): ng.IPromise<Models.HostRoundModel>;
        SubmitCard(gameid: string, playerid: string, cardids: Array<string>): ng.IPromise<{}>;
        GetSubmissions(gameid: string): ng.IPromise<Models.SubmissionModel>;
        PlayersWhoSubmitted(gameid: string): ng.IPromise<Array<string>>;
        CompleteRound(gameid: string): ng.IPromise<{}>;
        PickRoundWinner(gameid: string, playerid: string) : ng.IPromise<{}>;
    }


    export class ApiService implements IApiService {
        private baseUrl : string;

        constructor(private $http: ng.IHttpService, settings : ISettings) {
            this.baseUrl = settings.BaseApiUrl;
            return this;
        }


        CreateGame(): angular.IPromise<string> {
            return this.$http.get(this.baseUrl + "Match/CreateGame");
        }


        JoinGame(gameid: string, playerid: string): angular.IPromise<boolean> {
            return this.$http.post(this.baseUrl + 'Match/JoinGame', { GameId: gameid, PlayerId: playerid });
        }

        EndGame(gameid: string): angular.IPromise<{}> {
            return this.$http.get(this.baseUrl + 'Game/EndGame?GameId=' + gameid);
        }

        GetScores(gameid: string): angular.IPromise<App.Models.GameScoreModel> {
            return this.$http.get(this.baseUrl + 'Game/Scores?GameId=' + gameid);
        }

        GameReady(gameid: string): angular.IPromise<{}> {
            return this.$http.get(this.baseUrl + 'Game/Start?GameId=' + gameid);
        }

        CreateRound(gameid: string): angular.IPromise<number> {
            return this.$http.get(this.baseUrl + 'Round/Create?GameId=' + gameid);
        }

        GetPlayerRound(gameid: string, playerid: string): angular.IPromise<App.Models.PlayerRoundModel> {
            return this.$http.get(this.baseUrl + 'Round/GetPlayerRound?GameId=' + gameid + '&PlayerId=' + playerid);
        }

        GetHostRound(gameid: string): angular.IPromise<App.Models.HostRoundModel> {
            return this.$http.get(this.baseUrl + 'Round/GetHostRound?GameId=' + gameid);
        }

        SubmitCard(gameid: string, playerid: string, cardids: string[]): angular.IPromise<{}> {
            return this.$http.post(this.baseUrl + 'Round/Submit',
                { GameId: gameid, PlayerId: playerid, CardIds: cardids });
        }

        GetSubmissions(gameid: string): angular.IPromise<App.Models.SubmissionModel> {
            return this.$http.get(this.baseUrl + 'Round/Submissions?GameId=' + gameid);
        }

        PlayersWhoSubmitted(gameid: string): angular.IPromise<string[]> {
            return this.$http.get(this.baseUrl + 'Round/PlayersWhoSubmitted?GameId=' + gameid);
        }

        CompleteRound(gameid: string): angular.IPromise<{}> {
            return this.$http.get(this.baseUrl + 'Round/End?GameId=' + gameid);
        }

        PickRoundWinner(gameid: string, playerid: string): angular.IPromise<{}> {
            return this.$http.post(this.baseUrl + 'Round/SubmitWinner', { GameId: gameid, PlayerId: playerid });
        }
    }
    CAH.Module.factory("apiservice", ApiService);
}
