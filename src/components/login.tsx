import * as React from "react";
import { Navbar } from "./nav/navbar";
import { Link } from "react-router";
import { login, register } from "./auth/auth_actions";
import { connect } from "react-redux";
import { changeApiUrl } from "./config/config_actions";

let setUrl = (dispatch) => (e) => { dispatch(changeApiUrl(e.target.value)); };

class LoginPage extends React.Component<any, any> {
  set(name) {
    return function(event){
      let state = {};
      state[name] = event.target.value;
      this.setState(state);
    };
  }

  submitLogin(e) {
    e.preventDefault();
    let password = (this.state || {}).loginPassword;
    let email = (this.state || {}).loginEmail;
    let url = this.props.config.farmbotApiUrl;
    return this.props.dispatch(login(email, password, url));
  }

  submitRegistration(e) {
    e.preventDefault();
    let state = this.state || {};

    let name = state.regName;
    let email = state.regEmail;
    let password = state.regPass;
    let confirmation = state.regConfirmation;
    let url = this.props.config.farmbotApiUrl;
    let action = register(name, email, password, confirmation, url);

    return this.props.dispatch(action);
  }

  render() {
    return (
      <div>
        <Navbar { ...this.props } />
        <div className="all-content-wrapper">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
              <div className="widget-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="widget-header">
                      <h5 data-l10n-id="login-header">Login</h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <form onSubmit={ this.submitLogin.bind(this) } >
                    <div className="col-sm-12">
                      <div className="widget-content">
                        <div className="input-group">
                          <label data-l10n-id="login-email">Email</label>
                          <input type="text"
                                 onChange={ this.set("loginEmail").bind(this) }>
                          </input>
                          <label data-l10n-id="login-password">Password</label>
                          <input type="password"
                                 onChange={ this.set("loginPassword").bind(this) }>
                          </input>
                        </div>
                        <div className="row">
                          <div className="col-xs-6">
                            <p className="auth-link">
                              <a data-l10n-id="login-password-reset"
							     href={
                                  this.props.config.farmbotApiUrl + "/users/password/new"
                                }>
                                Reset password
                              </a>
                            </p>
                          </div>
                          <div className="col-xs-6">
                            <button data-l10n-id="login-submit"
							        className="button-like button green login">
                              Login
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xs-12">
                          <label data-l10n-id="login-server-url">Server URL (Advanced)</label>
                          <input type="text"
                                 value={ this.props.config.farmbotApiUrl }
                                 onChange={ setUrl(this.props.dispatch) } />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
              <div className="widget-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="widget-header">
                      <h5 data-l10n-id="register-header">Create an Account</h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <form onSubmit={ this.submitRegistration.bind(this) } >
                      <div className="widget-content">
                        <div className="input-group">
                          <label data-l10n-id="register-email">Email</label>
                          <input type="email" onChange={ this.set("regEmail").bind(this) } ></input>
                          <label data-l10n-id="register-name">Name</label>
                          <input type="text" onChange={ this.set("regName").bind(this) }></input>
                          <label data-l10n-id="register-password">Password</label>
                          <input type="password"
                                 onChange={ this.set("regPass").bind(this) }>
                          </input>
                          <label data-l10n-id="register-password-verify">Verfy Password</label>
                          <input type="password"
                                 onChange={
                                   this.set("regConfirmation").bind(this) }>
                          </input>
                        </div>
                        <div className="row">
                          <div className="col-xs-6">
                          </div>
                          <div className="col-xs-6">
                            <div className="auth-button">
                              <button data-l10n-id="register-submit"
							          className="button-like button green create-account">
                                Create Account
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export let Login = connect(state => state)(LoginPage);
