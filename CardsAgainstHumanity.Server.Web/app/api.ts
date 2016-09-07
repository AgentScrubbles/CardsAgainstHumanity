/// <reference path="./models/ScoreModel.ts"/>

module App {

    export interface IApiService {
        CreateGame(): Utilities.IParsedPromise<string>;
        JoinGame(gameid: string, playerid: string) : Utilities.IParsedPromise<boolean>;
        EndGame(gameid: string): Utilities.IParsedPromise<{}>;
        GetScores(gameid: string) : Utilities.IParsedPromise<Models.GameScoreModel>;
        GameReady(gameid: string) : Utilities.IParsedPromise<{}>;
        CreateRound(gameid: string) : Utilities.IParsedPromise<number>;
        GetPlayerRound(gameid: string, playerid: string) : Utilities.IParsedPromise<Models.PlayerRoundModel>;
        GetHostRound(gameid: string): Utilities.IParsedPromise<Models.HostRoundModel>;
        SubmitCard(gameid: string, playerid: string, cardids: Array<string>): Utilities.IParsedPromise<{}>;
        GetSubmissions(gameid: string): Utilities.IParsedPromise<Models.SubmissionModel>;
        PlayersWhoSubmitted(gameid: string): Utilities.IParsedPromise<Array<string>>;
        CompleteRound(gameid: string): Utilities.IParsedPromise<{}>;
        PickRoundWinner(gameid: string, playerid: string) : Utilities.IParsedPromise<{}>;
    }


    export class ApiService implements IApiService {
        private baseUrl : string;

        static $inject = ['$http', 'settings'];
        constructor(private $http: ng.IHttpService, settings : ISettings) {
            this.baseUrl = settings.BaseApiUrl;
            return this;
        }



        CreateGame(): Utilities.IParsedPromise<string> {
            var p = this.$http.get<string>(this.baseUrl + "Match/CreateGame");
            return new Utilities.ParsedPromise<string>(p);
        }


        JoinGame(gameid: string, playerid: string): Utilities.IParsedPromise<boolean> {
            var p = this.$http.post<boolean>(this.baseUrl + 'Match/JoinGame', { GameId: gameid, PlayerId: playerid });

            return new Utilities.ParsedPromise<boolean>(p);
        }

        EndGame(gameid: string): Utilities.IParsedPromise<{}> {
            var p = this.$http.get(this.baseUrl + 'Game/EndGame?GameId=' + gameid);
            return new Utilities.ParsedPromise<{}>(p);
        }

        GetScores(gameid: string): Utilities.IParsedPromise<App.Models.GameScoreModel> {
            var p = this.$http.get(this.baseUrl + 'Game/Scores?GameId=' + gameid);
            return new Utilities.ParsedPromise<Models.GameScoreModel>(p);
        }

        GameReady(gameid: string): Utilities.IParsedPromise<{}> {
            var p = this.$http.get(this.baseUrl + 'Game/Start?GameId=' + gameid);
            return new Utilities.ParsedPromise<{}>(p);
        }

        CreateRound(gameid: string): Utilities.IParsedPromise<number> {
            var p =  this.$http.get(this.baseUrl + 'Round/Create?GameId=' + gameid);
            return new Utilities.ParsedPromise<number>(p);
        }

        GetPlayerRound(gameid: string, playerid: string): Utilities.IParsedPromise<App.Models.PlayerRoundModel> {
            var p =  this.$http.get(this.baseUrl + 'Round/GetPlayerRound?GameId=' + gameid + '&PlayerId=' + playerid);
            return new Utilities.ParsedPromise<Models.PlayerRoundModel>(p);
        }

        GetHostRound(gameid: string): Utilities.IParsedPromise<App.Models.HostRoundModel> {
            var p = this.$http.get(this.baseUrl + 'Round/GetHostRound?GameId=' + gameid);
            return new Utilities.ParsedPromise<Models.HostRoundModel>(p);
        }

        SubmitCard(gameid: string, playerid: string, cardids: string[]): Utilities.IParsedPromise<{}> {
            var p =  this.$http.post(this.baseUrl + 'Round/Submit',
                { GameId: gameid, PlayerId: playerid, CardIds: cardids });
            return new Utilities.ParsedPromise<{}>(p);
        }

        GetSubmissions(gameid: string): Utilities.IParsedPromise<App.Models.SubmissionModel> {
            var p = this.$http.get(this.baseUrl + 'Round/Submissions?GameId=' + gameid);
            return new Utilities.ParsedPromise<Models.SubmissionModel>(p);
        }

        PlayersWhoSubmitted(gameid: string): Utilities.IParsedPromise<string[]> {
            var p = this.$http.get(this.baseUrl + 'Round/PlayersWhoSubmitted?GameId=' + gameid);
            return new Utilities.ParsedPromise<string[]>(p);
        }

        CompleteRound(gameid: string): Utilities.IParsedPromise<{}> {
            var p = this.$http.get(this.baseUrl + 'Round/End?GameId=' + gameid);
            return new Utilities.ParsedPromise<{}>(p);
        }

        PickRoundWinner(gameid: string, playerid: string): Utilities.IParsedPromise<{}> {
            var p = this.$http.post(this.baseUrl + 'Round/SubmitWinner', { GameId: gameid, PlayerId: playerid });
            return new Utilities.ParsedPromise<{}>(p);
        }
    }
    CAH.Module.factory("apiservice", ($http: ng.IHttpService, settings: ISettings) => new ApiService($http ,settings));
}
