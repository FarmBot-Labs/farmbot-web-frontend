import * as React from "react";
import { Navbar } from "../components/nav/navbar";
import { ToggleButton } from "./toggle_button";
import { DirectionButton } from "./direction_button";
import { sendCommand,
         changeStepSize,
         changeAxisBuffer,
         commitAxisChanges,
         pinToggle } from "../components/devices/bot_actions";
import { connect } from "react-redux";

export class AxisInputBox extends React.Component<any, any> {

  primary() {
    return this.props.bot.axisBuffer[this.props.axis];
  }

  secondary() {
    let num = this.props.bot.hardware[this.props.axis];
    if (_.isNumber(num)) {
      return String(num); // Prevent 0 from being falsy.
    } else {
      return num;
    };
  }

  style() {
    return { border: (this.primary()) ? "1px solid red" : "" };
  }

  change(key, dispatch) {
    return function(event) {
      dispatch(changeAxisBuffer(key, event.target.value));
    };
  }



  render() {
    return  <div className="col-xs-3">
              <label data-l10n-id={ this.props.l10n }>{ this.props.label }</label>
              <input className="move-input"
                     type="text"
                     style={ this.style() }
                     onChange={ this.change(this.props.axis, this.props.dispatch) }
                     value={ this.primary() || this.secondary() || "---" } />
            </div>;
  }
}
export class StepSizeSelector extends React.Component<any, any> {
  cssForIndex(num) {
    let choices = this.props.choices;
    let css = "move-amount no-radius ";
    if (num === _.first(choices)) {
      css += "leftmost ";
    }
    if (num === _.last(choices)) {
      css += "rightmost ";
    }
    if (num === this.props.selected) {
      css += "move-amount-selected ";
    }
    return css;
  }

  render() {
    return(<div className="move-amount-wrapper">
              {
                this.props.choices.map(
                  (item, inx) => <button
                              className={ this.cssForIndex(item) }
                              onClick={ () => this.props.selector(item) }
                              key={ inx } >{ item }</button>
                )
              }
            </div>);
  }
}

class ControlsPage extends React.Component<any, any> {
  constructor() {
    super();
    this.state ={ url: "http://71.93.48.48:8080/?action=stream" };
  }
  render() {

    let bot = this.props.bot;
    let url = this.state.url;

    return(
      <div>
          <Navbar { ...this.props } />
          <div className="all-content-wrapper">
          <div ng-view className="ng-scope">
            <div className="row ng-scope">
              <div className="col-md-4 col-sm-6 col-xs-12 col-md-offset-1">
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <button
						  data-l10n-id="controls-move-button-stop"
                          className="red button-like widget-control"
                          type="button"
                          onClick={
                            () => this.props.dispatch(sendCommand({name: "emergencyStop" }))
                          } >

                          E-STOP

                        </button>
                        <div className="widget-header">
                          <h5 data-l10n-id="controls-move-header">Move</h5>
                          <i className="fa fa-question-circle widget-help-icon">
                            <div data-l10n-id="controls-move-help"
							     className="widget-help-text">Use these manual
                            control buttons to move FarmBot in realtime. Press the
                            arrows for relative movements or type in new
                            coordinates and press <strong>GO</strong> for an
                            absolute movement. Tip: Press the Home button when
                            you are done so FarmBot is ready to get back to work.
                            Note: Currently all buttons except for Home work.</div>
                          </i>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="widget-content">
                          <label data-l10n-id="controls-move-amount-mm"
						         className="text-center">MOVE AMOUNT (mm)</label>
                          <div className="row">
                            <div className="col-sm-12">
                              <StepSizeSelector
                                choices={ [1,10,100,1000,10000] }
                                selector={ (num) => this.props.dispatch(changeStepSize(num)) }
                                selected={ bot.stepSize } />
                            </div>
                          </div>
                          <div className="row">
                            <table align="center" className="jog-table" style={{border: 0}}>
                              <tbody><tr>
                                  <td />
                                  <td />
                                  <td />
                                  <td>
                                    <DirectionButton axis="y"
                                                     direction="up"
                                                     steps={ bot.stepSize || 1000 }
                                                     {...this.props} />
                                  </td>
                                  <td />
                                  <td />
                                  <td>
                                    <DirectionButton axis="z"
                                                     direction="down"
                                                     steps={ bot.stepSize || 1000 }
                                                     {...this.props} />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <button
                                     className="button-like i fa fa-home arrow-button"
                                     onClick={
                                       () => this.props.dispatch(sendCommand({
                                         name: "homeAll",
                                         speed: (bot.hardware.s || 100)
                                       }))
                                     } />
                                  </td>
                                  <td />
                                  <td>
                                    <DirectionButton axis="x"
                                                     direction="left"
                                                     steps={ bot.stepSize || 1000 }
                                                     {...this.props} />
                                  </td>
                                  <td>
                                    <DirectionButton axis="y"
                                                     direction="down"
                                                     steps={ bot.stepSize || 1000 }
                                                     {...this.props} />
                                  </td>
                                  <td>
                                    <DirectionButton axis="x"
                                                     direction="right"
                                                     steps={ bot.stepSize || 1000 }
                                                     {...this.props} />
                                  </td>
                                  <td />
                                  <td>
                                    <DirectionButton axis="z"
                                                     direction="up"
                                                     steps={ bot.stepSize || 1000 }
                                                     {...this.props} />
                                  </td>
                                </tr>
                                <tr>
                                  <td />
                                </tr>
                              </tbody></table>
                          </div>
                          <div className="row">
                            <AxisInputBox axis="x" l10n="controls-move-axis-x-label" label="X AXIS" {...this.props} />
                            <AxisInputBox axis="y" l10n="controls-move-axis-y-label" label="Y AXIS" {...this.props} />
                            <AxisInputBox axis="z" l10n="controls-move-axis-z-label" label="Z AXIS" {...this.props} />
                            <div className="col-xs-3">
                              <button data-l10n-id="controls-move-button-submit"
							          className="full-width green button-like go"
                                      onClick={ () => this.props.dispatch(commitAxisChanges()) } >
                                GO
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <button
						  data-l10n-id="controls-tools-button-edit"
                          className="gray button-like widget-control"
                          type="button">
                          EDIT
                        </button>
                        <div className="widget-header">
                          <h5 data-l10n-id="controls-tools-header">Tools</h5>
                          <i className="fa fa-question-circle widget-help-icon">
                            <div data-l10n-id="controls-tools-help"
							     className="widget-help-text">Use these toggle
                            switches to control FarmBot's tools and peripherals
                            in realtime. To edit and create new tools, press
                            the <strong>EDIT</strong> button. Make sure to turn
                            things off when you're done! Coming soon: a working
                            edit button.</div>
                          </i>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="widget-content no-bottom-padding">
                          <div className="row">
                            <div className="col-sm-4">
                              <label data-l10n-id="controls-tools-tool-vacuumPump">VACUUM PUMP</label>
                            </div>
                            <div className="col-sm-4">
                              <p data-l10n-id="controls-tools-pin">Pin 9</p>
                            </div>
                            <div className="col-sm-4">
                              <ToggleButton toggleval={ bot.hardware.pin9 }
                                            toggleAction={
                                              () => this.props.dispatch(pinToggle(9))
                                            } />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4">
                              <label data-l10n-id="controls-tools-tool-waterValve">WATER VALVE</label>
                            </div>
                            <div className="col-sm-4">
                              <p data-l10n-id="controls-tools-pin">Pin 10</p>
                            </div>
                            <div className="col-sm-4">
                              <ToggleButton toggleval={ bot.hardware.pin10 }
                                            toggleAction={
                                              () => this.props.dispatch(pinToggle(10))
                                            } />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4">
                              <label data-l10n-id="controls-tools-tool-led">LED</label>
                            </div>
                            <div className="col-sm-4">
                              <p data-l10n-id="controls-tools-pin">Pin 13</p>
                            </div>
                            <div className="col-sm-4">
                              <ToggleButton toggleval={ bot.hardware.pin13 }
                                            toggleAction={
                                              () => this.props.dispatch(pinToggle(13))
                                            } />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-xs-12">
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <button
						  data-l10n-id="controls-camera-url-button-edit"
                          className="gray button-like widget-control"
                          type="button">
                          EDIT
                        </button>
                        <div className="widget-header">
                          <h5 data-l10n-id="controls-camera-header">Camera</h5>
                          <i className="fa fa-question-circle widget-help-icon">
                            <div data-l10n-id="controls-camera-help"
							     className="widget-help-text">Press the <strong>EDIT
                            </strong> button to add the URL of a livestream of
                            your FarmBot. Coming soon: A working edit button and
                            the ability to save your webcam URL in the backend.</div>
                          </i>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <img className="webcam-stream" src={ url } />
                        <div>
                        <label data-l10n-id="controls-camera-url-label">Set Webcam URL:</label>
                        <input type="text"
                               onChange={ (e) => {
                                 return this.setState({url: e.target["value"] });
                                }
                               }
                               value={ url } />
                        </div>
                      </div>
                    </div>
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

export let Controls = connect(state => state)(ControlsPage);
