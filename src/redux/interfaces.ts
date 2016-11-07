import { Everything } from "../interfaces";
import { Store } from "redux";

export type Store = Store<Everything>;

export interface ReduxAction<T> {
    readonly type: string;
    readonly payload: T;
};

/** The "getState()" function, typically passed in by Redux Thunk Middleware. */
export type GetState = () => Everything;

/** A Redux Thunk function. */
export interface Thunk {
    (dispatch: Function, getState: GetState): any;
};

export type EnvName = "production" | "development" | "*";
