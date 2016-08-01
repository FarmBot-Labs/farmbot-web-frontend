import * as React from "react";
import { changeStep, removeStep, pushStep } from "./sequence_actions";
import { assign } from "lodash";
import { Step } from "./interfaces";
import { Help } from "../help";
import { ExecuteBlock } from "./execute_block";
import { Sequence } from "./interfaces.ts";

interface CopyParams {
  dispatch: Function;
  step: Step;
}

export function copy({dispatch, step}: CopyParams) {
  let copy = assign<{}, Step>({}, step);
  dispatch(pushStep(copy));
};

interface RemoveParams {
  index: number;
  dispatch: Function;
}

export function remove({dispatch, index}: RemoveParams) {
  dispatch(removeStep(index));
}

interface UpdateStepParams {
  dispatch: Function;
  step: Step;
  index: number;
  field: string; // "x"|"y"|"z"|"speed";
}

let updateStep = function ({ dispatch,
                             step,
                             index,
                             field }: UpdateStepParams) {
  return (e) => {
    let update = assign<{}, Step>({}, step);
    update.command[field] = e.target.value;
    let action = changeStep(index, update);
    dispatch(action);
  };
};

interface IStepInput {
  step: Step;
  field: "speed"
         | "pin"
         | "value"
         | "mode"
         | "operator"
         | "x"
         | "y"
         | "z"
         | "stub" // For unimplemented features.
         | "variable"
         ;
  dispatch: Function;
  index: number;
}

export function StepInputBox({step, field, dispatch, index}: IStepInput) {
  return <input type="text"
                value={ step.command[field] }
                onChange={ updateStep({dispatch, step, index, field}) } />;
}

export interface StepParams {
  dispatch: Function;
  step: Step;
  index: number;
  sequence: Sequence;
  sequences: Sequence[];
}

export type StepTile = (input: StepParams) => JSX.Element;

interface StepDictionary {
  [stepName: string]: StepTile;
};

let Pending = ({ dispatch, index }: StepParams) => {
  return <div>
              <Help text="Not done yet :(" />
              Coming soon!
              Delete: <i className="fa fa-trash step-control"
                         onClick={ () => remove({dispatch, index}) } />
         </div>;
};

export let stepTiles: StepDictionary = {
  emergency_stop: Pending,
  home_all: Pending,
  home_x: Pending,
  home_y: Pending,
  home_z: Pending,
  read_status: Pending,
  write_parameter: Pending,
  read_parameter: Pending,
  if_statement: ExecuteBlock,
  execute: Pending,
  move_relative: function({dispatch, step, index}: StepParams) {
      return( <div>
                <div className="step-wrapper">
                <div className="row">
                    <div className="col-sm-12">
                      <div className="step-header move-relative-step">
                        <input data-l10n-id="sequences-editor-step-label-move-rel" className="step-label" placeholder="Move Relative"/>
                        <i className="fa fa-arrows-v step-control" />
                        <i className="fa fa-clone step-control"
                           onClick={ () => copy({dispatch, step}) } />
                        <i className="fa fa-trash step-control"
                           onClick={ () => remove({dispatch, index}) } />
                        <Help text="mdingena-test" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="step-content move-relative-step">
                        <div className="row">
                          <div className="col-xs-6 col-md-3">
                            <label data-l10n-id="sequences-step-move-x">X (mm)</label>
                            <StepInputBox dispatch={dispatch}
                                          step={step}
                                          index={index}
                                          field="x"/>
                          </div>
                          <div className="col-xs-6 col-md-3">
                            <label data-l10n-id="sequences-step-move-y">Y (mm)</label>
                            <StepInputBox dispatch={dispatch}
                                          step={step}
                                          index={index}
                                          field="y"/>
                          </div>
                          <div className="col-xs-6 col-md-3">
                            <label data-l10n-id="sequences-step-move-z">Z (mm)</label>
                            <StepInputBox dispatch={dispatch}
                                          step={step}
                                          index={index}
                                          field="z"/>
                          </div>
                          <div className="col-xs-6 col-md-3">
                            <label data-l10n-id="sequences-step-move-speed">Speed</label>
                            <StepInputBox dispatch={dispatch}
                                          step={step}
                                          index={index}
                                          field="speed"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> );
  },
  "move_absolute": function({dispatch, step, index}: StepParams){
    return( <div>
              <div className="step-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-header move-absolute-step">
                      <input data-l10n-id="sequences-editor-step-label-move-abs" className="step-label" placeholder="Move Absolute"/>
                      <i className="fa fa-arrows-v step-control" />
                      <i className="fa fa-clone step-control"
                         onClick={ () => copy({dispatch, step}) } />
                      <i className="fa fa-trash step-control"
                         onClick={ () => remove({dispatch, index}) } />
                      <Help text="The Move Absolute step instructs FarmBot to \
                      move to the specified coordinate regardless of the current \
                      position. For example, if FarmBot is currently at X=1000, \
                      Y=1000 and it receives a Move Absolute where X=0 and Y=3000, \
                      then FarmBot will move to X=0, Y=3000. If FarmBot must move in \
                      multiple directions, it will move diagonally. If you \
                      require straight movements along one axis at a time, \
                      use multiple Move Absolute steps. Coming soon: Offsets \
                      allow you to more easily instruct FarmBot to move to a \
                      location, but offset from it by the specified amount. For \
                      example moving to just above where a tool is located. Using \
                      offsets lets FarmBot do the math for you." />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-content move-absolute-step">
                      <div className="row">
                        <div className="col-xs-6 col-md-3">
                          <label data-l10n-id="sequences-step-move-x">X (mm)</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="x"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label data-l10n-id="sequences-step-move-y">Y (mm)</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="y"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label data-l10n-id="sequences-step-move-z">Z (mm)</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="z"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label data-l10n-id="sequences-step-move-speed">Speed</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="speed"/>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-6 col-md-3">
                          <label data-l10n-id="sequences-step-move-offset-x">X-Offset (mm)</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="stub"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label data-l10n-id="sequences-step-move-offset-y">Y-Offset (mm)</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="stub"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label data-l10n-id="sequences-step-move-offset-z">Z-Offset (mm)</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="stub"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );
  },
  "pin_write": function({dispatch, step, index}: StepParams){
    return( <div>
              <div className="step-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-header write-pin-step">
                      <input data-l10n-id="sequences-editor-step-label-pin-write" placeholder="Write Pin"/>
                      <i className="fa fa-arrows-v step-control" />
                      <i className="fa fa-clone step-control"
                         onClick={ () => copy({dispatch, step}) } />
                      <i className="fa fa-trash step-control"
                         onClick={ () => remove({dispatch, index}) } />
                      <Help text="The Write Pin step instructs FarmBot to \
                      set the specified pin on the Arduino to the specified mode \
                      and value. A Pin Mode of 0 is for on/off control, while \
                      a Pin Mode of 1 is for PWM (pulse width modulation)." />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-content write-pin-step">
                      <div className="row">
                        <div className="col-xs-6 col-md-3">
                          <label data-l10n-id="sequences-step-pin-id">Pin Number</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="pin"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label data-l10n-id="sequences-step-pin-value">Value</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="value"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label data-l10n-id="sequences-step-pin-mode">Pin Mode</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="mode"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  },
  "wait": function({dispatch, step, index}: StepParams){
    return( <div>
              <div className="step-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-header wait-step">
                      <input data-l10n-id="sequences-editor-step-label-wait" className="step-label" placeholder="Wait"/>
                      <i className="fa fa-arrows-v step-control" />
                      <i className="fa fa-clone step-control"
                         onClick={ () => copy({dispatch, step}) } />
                      <i className="fa fa-trash step-control"
                         onClick={ () => remove({dispatch, index}) } />
                      <Help text="The Wait step instructs FarmBot to wait for the \
                      specified amount of time. Use it in combination with the \
                      Pin Write step to water for a length of time." />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-content wait-step">
                      <div className="row">
                        <div className="col-xs-6 col-md-3">
                          <label data-l10n-id="sequences-step-wait-timeout">Time in milliseconds</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="value"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  },
  "send_message": function({dispatch, step, index}: StepParams){
    return( <div>
              <div className="step-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-header send-message-step">
                      <input data-l10n-id="sequences-editor-step-label-message" className="step-label" placeholder="Send Message"/>
                      <i className="fa fa-arrows-v step-control" />
                      <i className="fa fa-clone step-control"
                         onClick={ () => copy({dispatch, step}) } />
                      <i className="fa fa-trash step-control"
                         onClick={ () => remove({dispatch, index}) } />
                      <Help text="The Send Message step instructs FarmBot to \
                      send a custom message to the logs. This can help you with \
                      debugging your sequences. Eventually you will be able to \
                      receive push notifications and email alerts of these messages!" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-content send-message-step">
                      <div className="row">
                        <div className="col-xs-12">
                          <label data-l10n-id="sequences-step-message-text">Message</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="value"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  },
  "read_pin": function({dispatch, step, index}: StepParams){
    return( <div>
              <div className="step-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-header read-pin-step">
                      <input data-l10n-id="sequences-editor-step-label-pin-read" className="step-label" placeholder="Read Pin"/>
                      <i className="fa fa-arrows-v step-control" />
                      <i className="fa fa-clone step-control"
                         onClick={ () => copy({dispatch, step}) } />
                      <i className="fa fa-trash step-control"
                         onClick={ () => remove({dispatch, index}) } />
                      <Help text="The Read Pin step instructs FarmBot to \
                      read the current value of the specified pin. Coming soon: \
                      This data point is given the label you specified and then \
                      stored in your web app account to be later viewed" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-content read-pin-step">
                      <div className="row">
                        <div className="col-xs-6 col-md-3">
                          <label data-l10n-id="sequences-step-pin-id">Pin Number</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="pin"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label data-l10n-id="sequences-step-pin-data-label">Data Label</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="stub"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  },
};
