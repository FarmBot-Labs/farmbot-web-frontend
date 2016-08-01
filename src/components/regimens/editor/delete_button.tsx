import * as React from "react";
import { RegimenProps } from "../interfaces";
import { deleteRegimen } from "../actions";

function remove({regimen, dispatch}: RegimenProps) {
  return event => dispatch(deleteRegimen(regimen));
}

export function DeleteButton({regimen, dispatch}: RegimenProps) {
  if (!regimen) { return <span /> };
  return <button data-l10n-id="regimens-editor-delete"
                 className="red button-like widget-control"
                 onClick={ remove({dispatch, regimen}) }>
          Delete
        </button>;
}
