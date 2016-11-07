import { Action, Dispatch } from "redux";
import { Store } from "../redux/interfaces";
import { Everything } from "../interfaces";
import { devices } from "../device";

export function syncMiddleware(store: Store) {
    return function syncMiddlewareNext(next: Dispatch<Everything>) {
        return function syncMiddlewareAction(action: Action | any) {
            maybeSyncBot(action);
            next(action);
        };
    };
};

/** Action names that would require a bot sync. */
const SYNC_EVENTS = [
    "SAVE_PLANTS_OK",
    "SAVE_REGIMEN_OK",
    "SAVE_SEQUENCE_OK",
    "DELETE_REGIMEN_OK",
    "DELETE_SEQUENCE_OK"
];

function maybeSyncBot(action: Action | any) {
    if (action &&
        action.type &&
        SYNC_EVENTS.includes(action.type)) {
        devices
            .current
            .sync();
        console.log("TIME TO SYNC!");
    }
}
