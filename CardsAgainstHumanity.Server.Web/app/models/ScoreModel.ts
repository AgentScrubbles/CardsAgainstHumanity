module App {
    export module Models {
        export class GameScoreModel {
            private _scores: Array<ScoreModel>;

            get Scores(): Array<ScoreModel> {
                return this._scores;
            }
            set Scores(value: Array<ScoreModel>) {
                this._scores = value;
            }
        }

        export class ScoreModel {
            private _playerId: string;
            private _score: number;

            get PlayerId(): string {
                return this._playerId;
            }
            set PlayerId(value: string) {
                this._playerId = value;
            }

            get Score(): number {
                return this._score;
            }
            set Score(value: number) {
                this._score = value;
            }
        }
    }
}