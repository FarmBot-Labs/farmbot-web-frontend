import * as React from "react";
import { WeekRow } from "./week_row";
import { Week } from "./interfaces";
import { pushWeek, popWeek } from "./actions";

interface WeekGridProps {
 weeks: Week[];
 dispatch: Function;
};

export function WeekGrid({weeks, dispatch}: WeekGridProps) {
    return <div>
        <div className="row">
            <div className="col-sm-12">
                <label data-l10n-id="regimens-scheduler-days"
				       className="center margin-top margin-left">Days</label>
                { weeks.map(function(week, i) {
                  return <WeekRow key={i} index={i} week={week} dispatch={ dispatch }/>;
                }) }
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12">
            <button className="green button-like left widget-control"
                    onClick={ () => dispatch(pushWeek()) }>
              <i className="fa fa-plus" /> <span data-l10n-id="regimens-scheduler-week-button">Week</span>
            </button>
            <button className="red button-like left widget-control"
                    onClick={ () => dispatch(popWeek()) }>
              <i className="fa fa-minus" /> <span data-l10n-id="regimens-scheduler-week-button">Week</span>
            </button>
            </div>
        </div>
    </div>;
};
