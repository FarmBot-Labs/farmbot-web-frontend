import { createStore } from "redux";
import { Store } from "./interfaces";
import { rootReducer } from "./root_reducer";
import { registerSubscribers } from "./subscribers";
import { getMiddleware } from "./middlewares";

let ENV = process.env.NODE_ENV as string;

function dev() {
    store = createStore(rootReducer,
        maybeFetchOldState(),
        getMiddleware("development"));
    // Make store global in dev env in case I need to probe it.
    (window as any)["store"] = store;
    return store;
}

function prod() {
    return createStore(rootReducer, ({} as any), getMiddleware("production"));
}

function configureStore(options = {}) {
    let store: Store = (ENV === "production" ? prod() : dev());
    registerSubscribers(store);
    return store;
}

export let store = configureStore();

/** Tries to fetch previous state from `sessionStorage`.
 * Returns {} if nothing is found. Used mostly for hot reloading. */
function maybeFetchOldState() {
    return JSON.parse(sessionStorage["lastState"] || "{}");
}
