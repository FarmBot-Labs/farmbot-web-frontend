import { error } from "../../logger";
import * as _ from "lodash";
import { LoginOk, AuthToken } from "./auth_actions";
import { AuthState } from "./interfaces";

let action_handlers = {
  DEFAULT: function(state, action) {
    return state;
  },
  LOGIN_ERR: function(state, action) {
    error("error-m-ERR_AUTH_FAIL");
    return _.assign({},
                    state,
                    { token: "",
                      authenticated: false });
  },
  LOGIN_OK: function(state: AuthToken, action: LoginOk) {
    let update = _.cloneDeep<AuthState>(action.payload);
    let newState = _.assign({}, update, {authenticated: true});
    return newState;
  }
};

let initialState: AuthState = {
  token: "NOT LOGGED IN",
  sub: "NOT LOGGED IN",
  jti: "NOT LOGGED IN",
  iss: "NOT LOGGED IN",
  mqtt: "NOT LOGGED IN",
  bot: "NOT LOGGED IN",
  authenticated: false,
  iat: 0,
  exp: 0,
};

export function authReducer(state = initialState, action) {
  let handler = (action_handlers[action.type] || action_handlers.DEFAULT);
  return handler(state, action);
}
