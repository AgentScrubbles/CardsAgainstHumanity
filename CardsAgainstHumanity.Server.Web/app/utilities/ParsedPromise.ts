/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />

module App {
    export module Utilities {
        export interface IParsedPromise<T> {
            then(complete: (T) => void, error: Function);
            then(complete: (T) => void);
        }

        export class ParsedPromise<T> implements  IParsedPromise<T> {

            private _complete: (T) => void;
            private _error : Function;

            constructor(private promise: ng.IPromise<T>) {
                promise.then((result: any) => this._complete(result.data), (result) => (this._error ? this._error(result) : () => undefined));
            }

            then(complete: (param: T) => void, error: Function);
            then(complete: (param: T) => void);
            then(complete: (param: T) => void, error?: Function) {
                this._complete = complete;
                this._error = error;
            }
        }
    }
}