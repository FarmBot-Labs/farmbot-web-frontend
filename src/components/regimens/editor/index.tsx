import * as React from "react";
import { RegimensState } from "../interfaces";
import { SaveButton } from "./save_button";
import { DeleteButton } from "./delete_button";
import { EmptyEditor } from "./empty_editor";
import { ActiveEditor } from "./active_editor";

interface RegimenEditorWidgetProps {
  regimens: RegimensState;
  dispatch: Function;
}
export function RegimenEditorWidget({regimens, dispatch}: RegimenEditorWidgetProps) {
    let regimen = regimens.all[regimens.current];
    // Hmm... this might be "unsafe" for type checker...
    let Wow = regimen ? ActiveEditor : EmptyEditor;
    return( <div>
              <div className="widget-wrapper regimen-editor-widget">
                <div className="row">
                  <div className="col-sm-12">
                    <SaveButton regimen={ regimen } dispatch={ dispatch } />
                    <DeleteButton regimen={ regimen } dispatch={ dispatch } />
                    <div className="widget-header">
                      <h5 data-l10n-id="regimens-editor-header">Regimen Editor</h5>
                      <i className="fa fa-question-circle widget-help-icon">
                        <div data-l10n-id="regimens-editor-help"
						     className="widget-help-text">Regimens allow FarmBot
                        to take care of a plant throughout its entire life. A
                        regimen consists of many sequences that are scheduled to run
                        based on the age of the plant. Regimens are applied to
                        plants from the farm designer and can be re-used on many
                        plants growing at the same or different times. Multiple
                        regimens can be applied to any one plant. Coming soon: Regimens!</div>
                      </i>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="widget-content">
                      <Wow regimen={ regimen } dispatch={ dispatch } />
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  }
