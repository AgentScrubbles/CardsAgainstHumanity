module App {
    export interface ISettings {
        BaseApiUrl : string;
        BaseSignalRUrl: string;
        Test() :string;
    }

    export class Settings implements ISettings{
        private _baseApiUrl: string;
        private _baseSignalRUrl: string;

        constructor() {
            this._baseApiUrl = "http://localhost:63118/api/";
            this._baseSignalRUrl = "http://localhost:63118/";
            return this;
        }

        get BaseApiUrl(): string {
            return this._baseApiUrl;
        }

        get BaseSignalRUrl(): string {
            return this._baseSignalRUrl;
        }

        Test(): string { return "Test"; }
    }

    CAH.Module.factory('settings', () => new Settings());
}