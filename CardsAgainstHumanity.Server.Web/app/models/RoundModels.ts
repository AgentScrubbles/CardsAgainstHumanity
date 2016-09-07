/// <reference path="./CardModel.ts"/>

module App {
    export module Models {
        export class PlayerRoundModel {
            private _whiteCards: Array<WhiteCardModel>;
            private _blackCard: BlackCardModel;
            private _roundId: number;
            private _playerId: string;

            get WhiteCards(): Array<WhiteCardModel> {
                return this._whiteCards;
            }

            set WhiteCards(value: Array<WhiteCardModel>) {
                this._whiteCards = value;
            }

            get BlackCard(): BlackCardModel {
                return this._blackCard;
            }

            set BlackCard(value: BlackCardModel) {
                this._blackCard = value;
            }

            get RoundId(): number {
                return this._roundId;
            }

            set RoundId(value: number) {
                this._roundId = value;
            }

            get PlayerId(): string {
                return this._playerId;
            }

            set PlayerId(value: string) {
                this._playerId = value;
            }
        }

        export class HostRoundModel {
            private _blackCard: BlackCardModel;
            private _players: Array<string>;

            get BlackCard(): BlackCardModel {
                return this._blackCard;
            }
            set BlackCard(value: BlackCardModel) {
                this._blackCard = value;
            }
            get Players() : Array<string> {
                return this._players;
            }
            set Players(value: Array<string>) {
                this._players = value;
            }
        }
    }
}