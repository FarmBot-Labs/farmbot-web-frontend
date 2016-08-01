import * as React from "react";
import { editRegimen } from "../actions";
import { RegimenProps } from "../interfaces";

function write({dispatch, regimen}: RegimenProps) {
  return (event) => {
    let action = editRegimen(regimen, { name: event.target.value});
    dispatch(action);
  };
}

export function RegimenNameInput({regimen, dispatch}: RegimenProps) {
  return <input data-l10n-id="regimens-editor-name"
                id="right-label"
                placeholder="Regimen Name"
                type="text"
                onChange={ write({dispatch, regimen}) }
                value={ regimen.name }/>;
}
