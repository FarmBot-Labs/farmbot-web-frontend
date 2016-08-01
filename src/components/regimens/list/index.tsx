import * as React from "react";
import { RegimenListItem } from "./regimen_list_item";
import { ReduxStateAtom } from "../../interfaces";
import { AddRegimen } from "./add_button";

export function RegimensList(props: ReduxStateAtom) {
    return <div>
              <div className="widget-wrapper regimens-widget">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="main-nav-button">
                      <button data-l10n-id="regimens-list-header"
					          className="navbar-toggle hidden-sm hidden-md hidden-lg"
                              data-target="#navbar"
                              data-toggle="collapse"
                              type="button">
                        <span className="glyphicon glyphicon-menu-hamburger" />
                      </button>
                    </div>
                    <AddRegimen dispatch={ props.dispatch }/>
                    <div className="widget-header">
                      <h5 data-l10n-id="regimens-list-header">Regimens</h5>
                      <i className="fa fa-question-circle widget-help-icon">
                        <div data-l10n-id="regimens-list-help"
						     className="widget-help-text">This is a list of all
                        of your regimens. Coming soon: Regimens, and regimen cloning!</div>
                      </i>
                    </div>
                  </div>
                </div>
                <div className="widget-content no-bottom-padding">
                  <div className="row">
                    <div className="col-sm-12">
                      <div>
                        { props
                            .regimens
                            .all
                            .map((regimen, inx) => <RegimenListItem
                                                 dispatch={ props.dispatch }
                                                 regimen={ regimen }
                                                 index={inx}
                                                 key={inx} />)
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>;
}
