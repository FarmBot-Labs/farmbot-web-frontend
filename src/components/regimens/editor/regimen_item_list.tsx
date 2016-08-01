import * as React from "react";
import { RegimenItem } from "../interfaces";
import * as moment from "moment";
import { duration } from "moment";
import { removeRegimenItem } from "../actions";

interface RegimenItemListProps {
  items: RegimenItem[];
  dispatch: Function;
}

export function RegimenItemList({ items, dispatch }: RegimenItemListProps) {
  let groups = _.groupBy<RegimenItem>(items, function(item: RegimenItem) {
    return Math.round(duration(item.timeOffset).asDays());
  });

  let list = _.map(groups, function(innerItems, day) {
    return <RegimenItemDayGroup day={ day }
                                items={ innerItems }
                                key={ day }
                                dispatch={ dispatch }/>;
  });
  let display = list.length ? list : <EmptyList/>
  return <div>
    <hr/>
    { display }
  </div>;
}

function EmptyList({}) {
  return <div>
    <p> This regimen doesn't have any items! </p>
    <p> <i className="fa fa-arrow-left"/>You can add items by using the "bulk scheduler" </p>
  </div>;
}

interface RegimenItemStepProps {
  item: RegimenItem;
  dispatch: Function;
}
function RegimenItemStep({ item, dispatch }: RegimenItemStepProps) {
  let d = duration(item.timeOffset);
  let time = moment({
    hour: d.hours(),
    minute: d.minutes()
  }).format("h:mm a");

  return <div className="regimen-event">
  <span className="regimen-event-title"> { item.sequence.name } </span>
  <span className="regimen-event-time"> { time } </span>
  <i className="fa fa-trash regimen-control"
     onClick={ () => dispatch(removeRegimenItem(item)) } />
  </div>;
}

interface RegimenItemDayGroupProps {
    day: string;
    items: RegimenItem[];
    dispatch: Function;
}

function RegimenItemDayGroup({ day,
                               items,
                               dispatch }: RegimenItemDayGroupProps) {
	var l10n = { dayNumber : day };
    return <div className="regimen-day">
        <label data-l10n-id="regimens-editor-day" data-l10n-args={ JSON.stringify( l10n ) }>Day { day }</label>
        { items.map(function(item, inx) {
            return <RegimenItemStep item={ item }
                                    key={ inx }
                                    dispatch={ dispatch } />;
        }) }
    </div>;
}
