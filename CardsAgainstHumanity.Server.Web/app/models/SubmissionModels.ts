module App {
    export module Models {
        export class SubmissionModel {
            private _submissions: Array<PlayerSubmissionModel>;
            private _blackCard: BlackCardModel;

            get Submissions(): Array<PlayerSubmissionModel> {
                return this._submissions;
            }
            set Submissions(value: Array<PlayerSubmissionModel>) {
                this._submissions = value;
            }
            get BlackCard(): BlackCardModel {
                return this._blackCard;
            }
            set BlackCard(value: BlackCardModel) {
                this._blackCard = value;
            }
        }

        export class PlayerSubmissionModel {
            private _playerId: string;
            private _submittedAnswer: string;
            private _cards: Array<WhiteCardModel>;

            get PlayerId(): string {
                return this._playerId;
            }
            set PlayerId(value: string) {
                this._playerId = value;
            }
            get SubmittedAnswer(): string {
                return this._submittedAnswer;
            }
            set SubmittedAnswer(value: string) {
                this._submittedAnswer = value;
            }
            get Cards(): Array<WhiteCardModel> {
                return this._cards;
            }
            set Cards(value: Array<WhiteCardModel>) {
                this._cards = value;
            }
        }
        
    }
}