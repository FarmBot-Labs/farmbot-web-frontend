import * as React from "react";
import { BulkSchedulerState } from "./interfaces";
import { Sequence } from "../../sequences/interfaces";
import { AddButton } from "./add_button";
import { SequenceList } from "./sequence_list";
import { TimeInput } from "./time_input";
import { WeekGrid } from "./week_grid";
import { commitBulkEditor } from "./actions";
interface BulkEditorProps {
    sequences: Sequence[];
    editor: BulkSchedulerState;
    dispatch: Function;
}

export function BulkSchedulerWidget({sequences, dispatch, editor}: BulkEditorProps) {
    let click = function() { dispatch(commitBulkEditor(editor)); };
    let active = _.isNumber(editor.currentRegimen);
    return (<div>
        <div className="widget-wrapper bulk-scheduler-widget">
            <div className="row">
                <div className="col-sm-12">
                    <AddButton active={ active } click={ click }/>
                    <div className="widget-header">
                        <h5 data-l10n-id="regimens-scheduler-header">Scheduler</h5>
                        <i className="fa fa-question-circle widget-help-icon">
                            <div data-l10n-id="regimens-scheduler-help"
							     className="widget-help-text">Use this tool to schedule
                                a sequence to run on many days of your regimen.</div>
                        </i>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="widget-content">
                        <div className="row">
                            <div className="col-sm-7">
                                <SequenceList sequences={ sequences }
                                              current={ editor.sequence }
                                              dispatch={ dispatch }/>
                            </div>
                            <div className="col-sm-5">
                                <TimeInput dispatch={ dispatch }
                                           offset={ editor.form.dailyOffsetMs }/>
                            </div>
                        </div>
                    <WeekGrid weeks={ editor.form.weeks } dispatch={ dispatch }/>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
