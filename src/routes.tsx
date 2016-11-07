require("./css/index.scss");
import * as React from "react";

import {
  Provider
} from "react-redux";

import {
  IndexRedirect,
  IndexRoute,
  Redirect,
  Route,
  Router,
  RedirectFunction,
  RouterState
} from "react-router";

import App from "./app";
import Dashboard from "./dashboard";
import { Controls } from "./controls/controls";
import { Devices } from "./devices/devices";
import { Sequences } from "./sequences/sequences";
import { Regimens } from "./regimens/index";
import { FarmDesigner } from "./farm_designer/farm_designer";
import { Login } from "./login";
import { store } from "./redux/store";
import { history } from "./history";
import { Store } from "./redux/interfaces";

interface RootComponentProps {
  store: Store;
}

export class RootComponent extends React.Component<RootComponentProps, {}> {

  requireAuth(nextState: RouterState, replace: RedirectFunction) {
    // Why didn't I just write this.props.auth here...?
    let isAuthed = this
      .props
      .store
      .getState()
      .auth
      .authenticated;
    if (!isAuthed) {
      let token = localStorage["token"];
      if (!token) {
        replace("/app/login");
      }
    }
  };

  // Thanks @noahMiller and @jpierson (Github) for this wonderful fix!
  // Reference:
  //  https://github.com/reactjs/react-router/issues/2704#issuecomment-174067923.

  /*

    /                             => Login
    /app                          => App
    /app/login                    => Login
    /app/dashboard/designer?p1&p2 => FarmDesigner
    /app/dashboard/controls       => Controls
    /app/dashboard/devices        => Devices
    /app/dashboard/sequences      => Sequences
    /app/dashboard/regimens       => Regimens

  */
  routes = (<Route path="app" component={App}>
    <Route path="login" component={Login} />
    <Route path="dashboard"
      component={Dashboard}
      onEnter={this.requireAuth.bind(this)}>
      <Route path="designer(?:p1&?:id)"
        component={FarmDesigner}
        onEnter={this.requireAuth.bind(this)} />
      <Route path="controls"
        component={Controls}
        onEnter={this.requireAuth.bind(this)} />
      <Route path="devices"
        component={Devices}
        onEnter={this.requireAuth.bind(this)} />
      <Route path="sequences"
        component={Sequences}
        onEnter={this.requireAuth.bind(this)} />
      <Route path="regimens"
        component={Regimens}
        onEnter={this.requireAuth.bind(this)} />
      <IndexRoute
        component={Controls} />
      <IndexRedirect to="controls" />
    </Route>
    <IndexRedirect to="dashboard/controls" />
  </Route>);

  render() {
    return (<Provider store={store}>
      <Router history={history}>
        {this.routes}
      </Router>
    </Provider>);
  }
}
