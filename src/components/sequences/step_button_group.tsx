import * as React from "react";
import { pushStep } from "./sequence_actions";
import { Help } from "../help";
import { UnplacedStep,
    StepCommand as Command,
    messageType } from "./interfaces";

let addStep = (dispatch) =>
    (step: UnplacedStep) =>
        (event) => { dispatch(pushStep(step)); };

let step = function(message_type: messageType,
    command: Command = {}): UnplacedStep {
    return { message_type, command };
};

export function StepButtonGroup({dispatch}) {
    let clickToAdd = addStep(dispatch);
    // TODO Farmbot does not natively support an "EXECUTE" (unconditional jmp)
    // command. For now we're sneakily making it an if_statement that is always
    // true.
    let temporaryHack = clickToAdd({
      message_type: "if_statement",
      command: {}
    });
    return (<div>
        <div className="widget-wrapper">
            <div className="row">
                <div className="col-sm-12">
                    <div className="widget-header">
                        <h5 data-l10n-id="sequences-commands-header">Commands</h5>
                        <i className="fa fa-question-circle widget-help-icon">
                          <div data-l10n-id="sequences-commands-help"
						       className="widget-help-text">These commands are
                          the most basic things FarmBot can do. Combine them into
                          sequences to create more complex operations for
                          watering, planting seeds, measuring soil properties,
                          and more. Coming soon: drag and drop commands!</div>
                        </i>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="widget-content no-bottom-padding">
                        <div className="row">
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button data-l10n-id="sequences-commands-move-abs"
									        className=
                                        "full-width text-left blue-block block-header block"
                                        onClick={ clickToAdd(step("move_absolute")) }>
                                        MOVE ABSOLUTE
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button data-l10n-id="sequences-commands-move-rel"
									        className=
                                        "full-width text-left green-block block-header block"
                                        onClick={ clickToAdd(step("move_relative")) }>
                                        MOVE RELATIVE
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button data-l10n-id="sequences-commands-pin-write"
									        className=
                                        "full-width text-left orange-block block-header block"
                                        onClick={ clickToAdd(step("pin_write")) }>
                                        WRITE PIN
                                    </button>
                                    <i className="fa fa-arrows block-control" />
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button data-l10n-id="sequences-commands-pin-read"
									        className=
                                        "full-width text-left yellow-block block-header block"
                                        onClick={ clickToAdd(step("read_pin")) }>
                                        READ PIN
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button data-l10n-id="sequences-commands-wait"
									        className=
                                        "full-width text-left brown-block block-header block"
                                        onClick={ clickToAdd(step("wait")) }>
                                        WAIT
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button data-l10n-id="sequences-commands-message"
									        className="full-width text-left red-block block-header"
                                        onClick={ clickToAdd(step("send_message")) }>
                                        SEND MESSAGE
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button data-l10n-id="sequences-commands-if"
									        className=
                                        "full-width text-left purple-block block-header block"
                                        onClick={ clickToAdd(step("if_statement")) }>
                                        IF STATEMENT <Help text="Coming soon" />
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button data-l10n-id="sequences-commands-execute"
									        className=
                                        "full-width text-left gray-block block-header block"
                                        onClick={ temporaryHack }>
                                        EXECUTE
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);

}
