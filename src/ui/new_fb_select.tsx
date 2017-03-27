import * as React from "react";
import { DropDownItem } from "./fb_select";
import { fancyDebug } from "../util";

interface Props {
  /** Value to show. */
  value: DropDownItem | undefined;
  /** Notifies component user that something was clicked. */
  onChange(selection: DropDownItem): void;
  /** All possible select options */
  list: DropDownItem[];
};

type State = {
  isOpen: boolean;
};

type OptionComponent = React.ComponentClass<DropDownItem>
  | React.StatelessComponent<DropDownItem>;

export interface SelectState {
  touched: boolean;
  label: string;
  isOpen: boolean;
  value: string | number | undefined;
}

/** Used as a placeholder for a selection of "none" when allowEmpty is true. */
export const NULL_CHOICE: DropDownItem = Object.freeze({
  label: "None",
  value: ""
});

export class NewFBSelect extends React.Component<Props, Partial<State>> {
  constructor() {
    super();
    this.state = { isOpen: false };
  }

  toggleDropdown = () => { this.setState({ isOpen: !this.state.isOpen }); }

  normlItemList = () => {
    return this.props.list.map((option: DropDownItem, i) => {
      let { label } = option;
      fancyDebug(option)
      // TODO: Put this in a shared function when we finish debugging callbacks.
      return <div key={option.value}
        className="select-result"
        onMouseDown={() => { this.props.onChange(option); }}>
        <label>{label}</label>
      </div>;
    });
  }

  render() {
    let { isOpen } = this.state;
    return <div className="select" onClick={this.toggleDropdown}>
      <div className="select-search-container">
        <input type="text" placeholder="Search..." id="" />
      </div>
      <div
        className={"select-results-container is-open-" + !!isOpen}>
        {this.props.list}
      </div>
    </div>;
  }
}
