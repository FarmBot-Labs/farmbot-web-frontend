import * as React from "react";
import { Navbar } from "../nav/navbar";
import { ToggleButton } from "./toggle_button";
import { DirectionButton } from "./direction_button";
import {
  emergencyStop,
  pinToggle,
  homeAll,
  changeStepSize,
  commitAxisChanges,
  changeAxisBuffer
} from "../devices/actions";
import { BotState } from "../devices/interfaces";
import { connect } from "react-redux";
import { Everything } from "../interfaces";
import { WebcamSaveBtn } from "./webcam_save_btn";
import { t } from "i18next";

interface AxisInputBoxProps {
  bot: BotState;
  axis: string;
  label: string;
  dispatch: Function;
};

export class AxisInputBox extends React.Component<AxisInputBoxProps, {}> {

  primary(): string {
    return this.props.bot.axisBuffer[this.props.axis] || "";
  }

  secondary(): string {
    let num = (this.props.bot.hardware as any)[this.props.axis];
    if (_.isNumber(num)) {
      return String(num); // Prevent 0 from being falsy.
    } else {
      return num;
    };
  }

  style() {
    return { border: (this.primary()) ? "1px solid red" : "" };
  }

  change(key: string, dispatch: Function): React.EventHandler<React.FormEvent> {
    return function (event) {
      let num = Number((event.target as HTMLInputElement).value);
      dispatch(changeAxisBuffer(key, num));
    };
  }

  render() {
    return <div className="col-xs-3">
      <label>{this.props.label}</label>
      <input className="move-input"
        type="text"
        style={this.style()}
        onChange={this.change(this.props.axis, this.props.dispatch)}
        value={this.primary() || this.secondary() || "---"} />
    </div>;
  }
}
export class StepSizeSelector extends React.Component<any, any> {
  cssForIndex(num: number) {
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
    return (<div className="move-amount-wrapper">
      {
        this.props.choices.map(
          (item: number, inx: number) => <button
            className={this.cssForIndex(item)}
            onClick={() => this.props.selector(item)}
            key={inx} >{item}</button>
        )
      }
    </div>);
  }
}

@connect<any, any, any>(state => state)
export class Controls extends React.Component<Everything, any> {
  render() {
    let bot = this.props.bot;
    let url = ((this.props.bot.account && this.props.bot.account.webcam_url) ||
      (`${this.props.auth.iss}/webcam_url_not_set.jpeg`));
    let dirty = !!this.props.bot.account.dirty;

    return (
      <div>
        <Navbar { ...this.props } />
        <div className="all-content-wrapper">
          <div className="ng-scope">
            <div className="row ng-scope">
              <div className="col-md-4 col-sm-6 col-xs-12 col-md-offset-1">
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <button
                          className="red button-like widget-control"
                          type="button"
                          onClick={emergencyStop} >

                          E-STOP

                        </button>
                        <div className="widget-header">
                          <h5>Move</h5>
                          <i className="fa fa-question-circle widget-help-icon">
                            <div className="widget-help-text">
                              {t(`Use these manual
                              control buttons to move FarmBot in realtime. Press the
                              arrows for relative movements or type in new
                              coordinates and press GO for an
                              absolute movement. Tip: Press the Home button when
                              you are done so FarmBot is ready to get back to work.
                              Note: Currently all buttons except for Home work.`)}
                            </div>
                          </i>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="widget-content">bot
                          <label className="text-center"> {t("MOVE AMOUNT (mm)")} </label>
                          <div className="row">
                            <div className="col-sm-12">
                              <StepSizeSelector
                                choices={[1, 10, 100, 1000, 10000]}
                                selector={(num: number) => this.props.dispatch(changeStepSize(num))}
                                selected={bot.stepSize} />
                            </div>
                          </div>
                          <div className="row">
                            <table className="jog-table" style={{ border: 0 }}>
                              <tbody>
                                <tr>
                                  <td />
                                  <td />
                                  <td />
                                  <td>
                                    <DirectionButton axis="y"
                                      direction="up"
                                      steps={bot.stepSize || 1000}
                                      {...this.props} />
                                  </td>
                                  <td />
                                  <td />
                                  <td>
                                    <DirectionButton axis="z"
                                      direction="down"
                                      steps={bot.stepSize || 1000}
                                      {...this.props} />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <button
                                      className="button-like i fa fa-home arrow-button"
                                      onClick={
                                        () => homeAll((bot.hardware.s || 100))
                                      } />
                                  </td>
                                  <td />
                                  <td>
                                    <DirectionButton axis="x"
                                      direction="left"
                                      steps={bot.stepSize || 1000}
                                      {...this.props} />
                                  </td>
                                  <td>
                                    <DirectionButton axis="y"
                                      direction="down"
                                      steps={bot.stepSize || 1000}
                                      {...this.props} />
                                  </td>
                                  <td>
                                    <DirectionButton axis="x"
                                      direction="right"
                                      steps={bot.stepSize || 1000}
                                      {...this.props} />
                                  </td>
                                  <td />
                                  <td>
                                    <DirectionButton axis="z"
                                      direction="up"
                                      steps={bot.stepSize || 1000}
                                      {...this.props} />
                                  </td>
                                </tr>
                                <tr>
                                  <td />
                                </tr>
                              </tbody></table>
                          </div>
                          <div className="row">
                            <AxisInputBox axis="x" label="X AXIS" {...this.props} />
                            <AxisInputBox axis="y" label="Y AXIS" {...this.props} />
                            <AxisInputBox axis="z" label="Z AXIS" {...this.props} />
                            <div className="col-xs-3">
                              <button className="full-width green button-like go"
                                onClick={() => this.props.dispatch(commitAxisChanges())} >
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
                          className="gray button-like widget-control"
                          type="button">
                          {t("EDIT")}
                        </button>
                        <div className="widget-header">
                          <h5>Tools</h5>
                          <i className="fa fa-question-circle widget-help-icon">
                            <div className="widget-help-text">
                              {t(`Use these toggle
                              switches to control FarmBot's tools and peripherals
                              in realtime. To edit and create new tools, press
                              the button. Make sure to turn
                              things off when you're done! Coming soon: a working
                              edit button.`)}
                            </div>
                          </i>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="widget-content no-bottom-padding">
                          <div className="row">
                            <div className="col-sm-4">
                              <label>{t("VACUUM PUMP")}</label>
                            </div>
                            <div className="col-sm-4">
                              <p>{t("Pin 9")}</p>
                            </div>
                            <div className="col-sm-4">
                              <ToggleButton toggleval={bot.hardware.pin9}
                                toggleAction={() => pinToggle(9, this.props.bot)} />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4">
                              <label>{t("WATER VALVE")}</label>
                            </div>
                            <div className="col-sm-4">
                              <p>{t("Pin 10")}</p>
                            </div>
                            <div className="col-sm-4">
                              <ToggleButton toggleval={bot.hardware.pin10}
                                toggleAction={() => pinToggle(10, this.props.bot)} />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4">
                              <label>{t("LED")}</label>
                            </div>
                            <div className="col-sm-4">
                              <p>{t("Pin 13")}</p>
                            </div>
                            <div className="col-sm-4">
                              <ToggleButton toggleval={bot.hardware.pin13}
                                toggleAction={() => pinToggle(13, this.props.bot)} />
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
                        <WebcamSaveBtn dispatch={this.props.dispatch}
                          webcamUrl={url}
                          apiUrl={this.props.auth.iss}
                          dirty={dirty} />
                        <div className="widget-header">
                          <h5>{t("Camera")}</h5>
                          <i className="fa fa-question-circle widget-help-icon">
                            <div className="widget-help-text">
                              {t(`Press the button to add the URL of a livestream of
                              your FarmBot. Coming soon: A working edit button and
                              the ability to save your webcam URL in the backend.`)}
                            </div>
                          </i>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div>
                          <label>{t("Set Webcam URL: ")}</label>
                          <input type="text"
                            onChange={updateWebcamUrl(this.props.dispatch)}
                            value={url} />
                        </div>
                        {showUrl(url, dirty)}
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

const showUrl = (url: string, dirty: boolean) => {
  if (dirty) {
    return <p> Press save to view.</p>;
  } else {
    if (~url.indexOf("/webcam_url_not_set.jpeg")) {
      return <img className="webcam-stream-unavailable" src={url}/>;
      //TODO: add text over image: "Camera stream not available. Press <b>EDIT</b> to add a stream"
    } else {
      return <img className="webcam-stream" src={url}/>;
    };
  };
};

const updateWebcamUrl = (dispatch: Function) => (event: React.KeyboardEvent) => {
  dispatch({
    type: "CHANGE_WEBCAM_URL",
    payload: (event.target as HTMLInputElement).value
  });
};
