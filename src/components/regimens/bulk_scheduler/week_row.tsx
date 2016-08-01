import * as React from "react";
import { Week } from "./interfaces";
import { toggleDay } from "./actions";

interface WeekRowProps {
  week: Week;
  index: number;
  dispatch: Function;
}

let DAYS = [ 1, 2, 3, 4, 5, 6, 7 ];

export function WeekRow({index, dispatch, week}: WeekRowProps) {
  var l10n = { weekNumber : ( index + 1 ) };
  return <div className="week-row">
            <label data-l10n-id="regimens-scheduler-week-row" data-l10n-args={ JSON.stringify( l10n ) } className="week-label">Week { index + 1 }</label>
            {
              DAYS.map(function(day) {
                let id = `${index}-${day}`;
                let lookup = `day${day}`;
                return <Day day={day}
                            week={index}
                            dispatch={dispatch}
                            id={id}
                            key={id}
                            active={week.days[lookup]}/>;
              })
            }
        </div>;
}

interface DayProps {
  day: number;
  week: number;
  dispatch: Function;
  id: string;
  active: boolean;
}

let select = (dispatch, day, week) => () => dispatch(toggleDay({day, week}));

function Day({day, id, dispatch, week, active}) {

  return <div className="day-selector-wrapper">
    <input type="checkbox"
           id={id}
           className="day"
           onClick={ select(dispatch, day, week) }
           checked={ active }
           readOnly="1"
           />
    <label className="day-label left-most" htmlFor={id}>
      { (week * 7) + day }
    </label>
  </div>;
}
