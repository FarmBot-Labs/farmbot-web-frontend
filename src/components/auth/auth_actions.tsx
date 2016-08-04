import { fetchDevice } from "../../components/devices/bot_actions";
import { push } from "../../history";
import { fetchSequences } from "../sequences/sequence_actions";
import { post } from "axios";
import { error } from "../../logger";
import { AuthState } from "./interfaces";
import { fetchPlants } from "../farm_designer/actions";

export interface AuthResponseToken {
    unencoded: AuthToken;
    encoded: string;
};

export interface AuthResponse {
  token: AuthResponseToken;
};

export function didLogin(authState: AuthState, dispatch) {
    setToken(authState.token);
    dispatch(loginOk(authState));
    dispatch(fetchDevice(authState.token));
    dispatch(fetchSequences());
    dispatch(fetchPlants(authState.iss, authState.token));
};

// We need to handle OK logins for numerous use cases (Ex: login AND registration)
export function onLogin(dispatch: Function) {
  return (response: AuthResponse) => {
    let tokenData: AuthResponseToken = _.cloneDeep<any>(response.token);
    let authState: AuthState = {
      token: tokenData.encoded,
      sub: tokenData.unencoded.sub,
      jti: tokenData.unencoded.jti,
      iss: tokenData.unencoded.iss,
      mqtt: tokenData.unencoded.mqtt,
      bot: tokenData.unencoded.bot,
      iat: tokenData.unencoded.iat,
      exp: tokenData.unencoded.exp,
      authenticated: true
    };
    didLogin(authState, dispatch);
    push("/app/dashboard/controls");
  };
};

export function login(username, password, url) {
  return dispatch => {
    return requestToken(username, password, url).then(
      onLogin(dispatch),
      (err) => dispatch(loginErr(err))
    );
  };
}

function loginErr(err) {
  return {
    type: "LOGIN_ERR",
    payload: err
  };
}

export interface AuthToken {
  sub: string;
  iat: number;
  jti: string;
  iss: string;
  exp: number;
  mqtt: string;
  bot: string;
  authenticated: boolean;
}

export interface LoginOk {
  type: "LOGIN_OK";
  payload: AuthState;
};

export function loginOk(token: AuthState) {
  return {
    type: "LOGIN_OK",
    payload: token
  };
}

export function register(name, email, password, confirmation, url) {
  return dispatch => {
    let p = requestRegistration(name,
                                email,
                                password,
                                confirmation,
                                url);
    return p.then((r) => onLogin(dispatch)(r.data),
                  onRegistrationErr(dispatch));
  };
}

export function onRegistrationErr(dispatch) {
  return (err) => {
    let msg = _.values(err.data)
               .join(". ")
               .replace(/nil/g, "empty") || "error-m-REGISTRATION_ERROR";
    error(msg);
    dispatch({
      type: "REGISTRATION_ERROR",
      payload: err
    });
  };
}

function requestRegistration(name, email, password, confirmation, url) {
  let form = {
    user: {
      email: email,
      password: password,
      password_confirmation: confirmation,
      name: name
    }
  };
  return post<AuthResponse>(url + "/api/users", form);
}


function requestToken(email, password, url) {
  return $.ajax({
    url: url + "/api/tokens",
    type: "POST",
    data: JSON.stringify({ user: { email: email, password: password } }),
    contentType: "application/json"
  });
}

// TODO Someday, we will stop using jQuery. This is mostly for legacy support.
function setToken(token) {
  $.ajaxSetup({
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", token);
    }
  });
}
