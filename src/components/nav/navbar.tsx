import * as React from "react";
import { Link } from "react-router";
import { sendCommand } from "../devices/bot_actions";
import { AuthState } from "../auth/interfaces";
import { BotState } from "../devices/interfaces";
import { Ticker } from "../ticker/ticker";

interface NavButtonState {
  auth: AuthState;
  dispatch: Function;
  bot: BotState;
}

let LogoutButton = ({ auth }: NavButtonState) => {
  if (!auth.authenticated) { return <span></span>; }
  return <a data-l10n-id="nav-logout"
      className="logout-button"
      onClick={() => {
        sessionStorage.clear();
        location.reload();
      } }>
      Log Out
    </a>;
};

let SyncButton = ({auth, dispatch}: NavButtonState) => {
  if (!auth.authenticated) { return <span></span>; }
  return <button data-l10n-id="nav-sync"
                 className="nav-sync button-like green"
                 onClick={
                   () => dispatch(sendCommand({name: "syncSequence"}))
                 }>
      Sync
    </button>;
};

let EStopButton = ({auth, dispatch}: NavButtonState) => {
  if (!auth.authenticated) { return <span></span>; }
  return <button data-l10n-id="nav-e-stop"
            className="nav-e-stop button-like red"
            type="button"
            onClick={ () => dispatch(sendCommand({name: "emergencyStop" })) } >
    E-Stop
    </button>;
};

let links = {
  "Farm Designer" : { "url" : "/app/dashboard/designer",  "l10n" : "designer" },
  "Controls"      : { "url" : "/app/dashboard/controls",  "l10n" : "controls" },
  "Devices"       : { "url" : "/app/dashboard/devices",   "l10n" : "devices" },
  "Sequences"     : { "url" : "/app/dashboard/sequences", "l10n" : "sequences" },
  "Regimens"      : { "url" : "/app/dashboard/regimens",  "l10n" : "regimens" }
};

// TODO: Convert to ES6 class or stateless component and add a display name.
export function Navbar(props) {
  return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header drop-shadow">
            <button className="navbar-toggle"
                    data-target="#navbar"
                    data-toggle="collapse"
                    type="button">
              <span className="glyphicon glyphicon-menu-hamburger" />
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav">
              {
                Object.keys(links).map((description) => {
                  let url = links[description].url;
                  return (
                          <li key={url}>
                            <Link to={url} data-l10n-id={"nav-link-"+links[description].l10n}>{description}</Link>
                          </li>
                        );
                })
              }
            </ul>
            <SyncButton { ...props }/>
            <Ticker { ...props }/>
            <LogoutButton { ...props }/>
            <EStopButton { ...props }/>
          </div>
        </div>
      </nav>
    );
  };
