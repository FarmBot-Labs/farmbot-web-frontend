import * as _ from "lodash";
import { AuthState } from "./interfaces";
import { generateReducer } from "../redux/generate_reducer";

const initialState: AuthState = {
  token: "NOT LOGGED IN",
  sub: "NOT LOGGED IN",
  jti: "NOT LOGGED IN",
  iss: "NOT LOGGED IN",
  mqtt: "NOT LOGGED IN",
  bot: "NOT LOGGED IN",
  os_update_server: "NOT LOGGED IN",
  fw_update_server: "NOT LOGGED IN",
  authenticated: false,
  iat: 0,
  exp: 0
};

export let authReducer = generateReducer<AuthState>(initialState)
  .add<AuthState>("LOGOUT", function (s, a) {
    return initialState;
  })
  .add<AuthState>("LOGIN_OK", function (s, a) {
    _.assign(s, a.payload, { authenticated: true });
    // TODO: Side effects don't belong in reducers.
    // Move this into an action creator.
    localStorage["token"] = JSON.stringify(s);
    return s;
  })
  .add<void>("LOGIN_ERR", function (s, a) {
    s.authenticated = false;
    return s;
  });
