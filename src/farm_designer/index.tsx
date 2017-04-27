import * as React from "react";
import { GardenMap } from "./map/garden_map";
import { connect } from "react-redux";
import { Link } from "react-router";
import { t } from "i18next";
import { Props } from "./interfaces";
import { mapStateToProps } from "./state_to_props";
import { history } from "../history";
import { Plants } from "./plants/plant_inventory";
import { isMobile } from "../util";

interface State {
  zoomLevel: number;
}

@connect(mapStateToProps)
export class FarmDesigner extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = { zoomLevel: 0.6 };
  }

  zoom = (zoomNumber: number) => {
    this.setState({ zoomLevel: this.state.zoomLevel + zoomNumber });
  }

  childComponent() {
    let fallback = isMobile() ?
      undefined : React.createElement(Plants, this.props as any);
    return this.props.children || fallback;
  }

  render() {
    // Kinda nasty, similar to the old q="NoTab" we used to determine no panels.
    // This one just makes sure the designer can click it's panel tabs without
    // the other headers getting in the way. There's more re-usability in this.
    if (history.getCurrentLocation().pathname === "/app/designer") {
      document.body.classList.add("designer-tab");
    } else {
      document.body.classList.remove("designer-tab");
    }

    return <div className="farm-designer">
      <div className="panel-header gray-panel designer-mobile-nav">
        <div className="panel-tabs">
          <Link to="/app/designer" className="mobile-only active">
            {t("Designer")}
          </Link>
          <Link to="/app/designer/plants">
            {t("Plants")}
          </Link>
          <Link to="/app/designer/farm_events" >
            {t("Farm Events")}
          </Link>
        </div>
      </div>
      <div className="farm-designer-panels">
        {this.childComponent()}
      </div>

      {/* TODO: This actually changes the amount of translation the plants
                receive when performing a drag and drop. Leaving as a todo
                for convenience of doing a production deploy today.
        // let plusBtnColor = this.state.zoomLevel === 1 ? "light-gray" : "green";
        // let minusBtnColor = this.state.zoomLevel === 0.3 ? "light-gray" : "green";

          <div className="zoomer">
            <div className={`plus-button ${plusBtnColor}`}
              onClick={() => this.zoom(0.1)}>
              <i className="fa fa-2x fa-plus" />
            </div>
            <div className={`plus-button ${minusBtnColor}`}
              onClick={() => this.zoom(-0.1)}>
              <i className="fa fa-2x fa-minus" />
            </div>
          </div>

          // This will be added as an attribute to farm-designer-map
          style={{ zoom: this.state.zoomLevel }}
        */}

      <div className="farm-designer-map">
        <GardenMap
          selectedPlant={this.props.selectedPlant}
          crops={this.props.crops}
          dispatch={this.props.dispatch}
          designer={this.props.designer}
          plants={this.props.plants}
          points={this.props.points}
        />
      </div>
    </div>
  }
}
