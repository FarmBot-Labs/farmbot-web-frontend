import * as React from "react";

interface AddButtonProps {
  active: boolean;
  click: Function;
}

export function AddButton({active, click}: AddButtonProps) {
  if (!active) { return <div />; }
  return <button data-l10n-id="regimens-scheduler-add"
                 className="green button-like widget-control" onClick={ click }>
          Add
         </button>;

}
