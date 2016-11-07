import { Store } from "./interfaces";
import thunk from "redux-thunk";
import { applyMiddleware, compose, Middleware, GenericStoreEnhancer } from "redux";
import { EnvName } from "./interfaces";
import { syncMiddleware } from "../devices/sync_middleware";

interface MiddlewareConfig {
    fn: Middleware;
    env: EnvName;
};

/** To make it easier to manage all things watching the state tree,
 * we keep subscriber functions in this array. */
export let mwConfig: MiddlewareConfig[] = [
    {
        env: "*",
        fn: thunk
    }
    , {
        env: "development",
        fn: require("redux-immutable-state-invariant")()
    }
    , {
        env: "*",
        fn: syncMiddleware
    }
];

export function getMiddleware(env: EnvName) {
    let middlewareFns = mwConfig
        .filter(function (mwc) {
            return (mwc.env === env) || (mwc.env === "*");
        })
        .map((mwc) => mwc.fn);
    let dtCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const composeEnhancers = dtCompose || compose;
    let middlewares = applyMiddleware(...middlewareFns);

    return composeEnhancers(middlewares);
};
