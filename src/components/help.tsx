import * as React from "react";

/** A help tooltip that shows information about a feature when hovered over.
    Example: "<Help text='helpful information' />".
*/
export class Help extends React.Component<HelpProps, HelpState> {

  constructor(props) {
    super(props);
    this.state = {isHovered: false};
  }

  /** The output of this function is what the user will see when the
      Help icon is hovered over. */
  isHovered({text}) {
    return <div data-l10n-id={ text } className="help-text"></div>;
  }

  /** This is what the user sees when the icon is not hovered over. */
  notHovered(props: HelpProps) {
    // We probably don't need to show anything when not hovered.
    // SEE: render(); for default stuff.
	// mdingena: We probably *should* because L20n is not localizing the non-existent text otherwise.
    return <div></div>;
  }

  render() {
    let Comp = (this.state.isHovered ? this.isHovered : this.notHovered);
    return <div className="help"
                onMouseEnter={() => { this.setState({isHovered: true});}}
                onMouseLeave={() => { this.setState({isHovered: false});}}>
             <i className="fa fa-question-circle help-icon"></i>
             <Comp text={ this.props.text } />
           </div>;
  };
}

interface HelpProps {
  text: string;
}

interface HelpState {
  isHovered: boolean;
}
