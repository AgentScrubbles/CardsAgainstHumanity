module App {
    export module Models {
        export class WhiteCardModel {
            private _whiteCardId: string;
            private _value: string;

            get WhiteCardId() : string {
                return this._whiteCardId;
            }
            set WhiteCardId(value: string) {
                this._whiteCardId = value;
            }
            get Value(): string {
                return this._value;
            }
            set Value(value: string) {
                this._value = value;
            }
        }

        export class BlackCardModel {
            private _blackCardId: string;
            private _rawValue: string;
            private _pick: number;
            private _blankValue: string;
            private _formattableValue: string;

            get BlackCardId(): string {
                return this._blackCardId;
            }
            set BlackCardId(value: string) {
                this._blackCardId = value;
            }
            get RawValue(): string {
                return this._rawValue;
            }
            set RawValue(value: string) {
                this._rawValue = value;
            }
            get Pick(): number {
                return this._pick;
            }
            set Pick(value: number) {
                this._pick = value;
            }
            get BlankValue(): string {
                return this._blankValue;
            }
            set BlankValue(value: string) {
                this._blankValue = value;
            }
            get FormattableValue() : string {
                return this._formattableValue;
            }
            set FormattableValue(value: string) {
                this._formattableValue = value;
            }
        }
    }
}