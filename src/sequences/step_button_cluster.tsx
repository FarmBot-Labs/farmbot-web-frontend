import * as React from "react";
import { StepButton } from "./step_buttons/index";
import { t } from "i18next";

export function StepButtonCluster({dispatch}: { dispatch: Function }) {
    const ALL_THE_BUTTONS = [
        <StepButton dispatch={dispatch}
            step={{
                kind: "move_absolute",
                args: { x: 0, y: 0, z: 0, speed: 100 }
            }}
            color="blue">
            {t("MOVE ABSOLUTE")}
        </StepButton >,
        <StepButton dispatch={dispatch}
            step={{
                kind: "move_relative",
                args: { x: 0, y: 0, z: 0, speed: 100 }
            }}
            color="green" >
            {t("MOVE RELATIVE")}
        </StepButton >,
        <StepButton dispatch={dispatch}
            step={{
                kind: "write_pin",
                args: { pin_number: 0, pin_value: 0, pin_mode: 0 }
            }}
            color="orange" >
            {t("WRITE PIN")}
        </StepButton >,
        <StepButton dispatch={dispatch}
            step={{
                kind: "read_pin",
                args: {
                    pin_number: 0,
                    pin_mode: 0,
                    data_label: "---"
                }
            }}
            color="yellow" >
            {t("READ PIN")}
        </StepButton >,
        <StepButton dispatch={dispatch}
            step={{
                kind: "wait",
                args: { milliseconds: 0 }
            }}
            color="brown" >
            {t("WAIT")}
        </StepButton >,
        <StepButton dispatch={dispatch}
            step={{
                kind: "send_message",
                args: { message: "Bot is at position {{ x }}, {{ y }}, {{ z }}." }
            }}
            color="red" >
            {t("SEND MESSAGE")}
        </StepButton >,
        <StepButton dispatch={dispatch}
            step={{
                kind: "if_statement",
                args: { lhs: "x", op: "is", rhs: 0, sub_sequence_id: 0 }
            }}
            color="purple" >
            {t("IF STATEMENT")}
        </StepButton >,
        <StepButton dispatch={dispatch}
            step={{
                kind: "execute",
                args: { sub_sequence_id: 0 }
            }}
            color="gray" >
            {t("EXECUTE")}
        </StepButton >
    ];
    return (<div>
        <div className="widget-wrapper">
            <div className="row">
                <div className="col-sm-12">
                    <div className="widget-header">
                        <h5>{("Commands")}</h5>
                        <i className="fa fa-question-circle widget-help-icon">
                            <div className="widget-help-text">
                                {(`These commands are
                            the most basic things FarmBot can do. Combine them
                            into sequences to create more complex operations for
                            watering, planting seeds, measuring soil properties,
                            and more. Coming soon: drag and drop commands!`)}
                            </div>
                        </i>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="widget-content no-bottom-padding">
                        <div className="row">
                            {
                                ALL_THE_BUTTONS.map(function (el, inx) {
                                    return <div key={inx}>
                                        {el}
                                    </div>;
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >);
}
