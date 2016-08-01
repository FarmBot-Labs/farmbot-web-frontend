import * as React from "react";
import { newRegimen } from "../actions";

interface AddRegimenProps {
  dispatch: Function;
}
export function AddRegimen({dispatch}) {
  return <button data-l10n-id="regimens-list-add"
                 className="green button-like widget-control"
                 onClick={ add(dispatch) }>
    Add
  </button>;
}

function add(dispatch) {
  return (event) => dispatch(newRegimen());
}
