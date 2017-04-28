import * as React from "react";
import { defensiveClone } from "../util";

interface Props extends React.HTMLProps<HTMLImageElement> {
  src: string;
  fallback: string;
}

type State = Partial<{ needsFallback: boolean }>;
/** Like a normal `<img>`, but it has a `fallback` URL if the image does not
 * load*/
export class FallbackImg extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = { needsFallback: false };
  }

  componentWillReceiveProps(next: Props) {
    // Sorry. The webcam page needs live updates. <img/> tag was acting wonky.
    (next.src !== this.props.src) && this.setState({ needsFallback: false });
  }

  fallback = () => <img src={this.props.fallback} />;

  dontFallback = () => {
    let imgProps = defensiveClone(this.props);
    delete imgProps.fallback; // React will complain otherwise.
    return <img onError={() => this.setState({ needsFallback: true })}
      src={this.props.src} />;
  }

  render() {
    return ((this.state.needsFallback) ? this.fallback : this.dontFallback)();
  }
}
