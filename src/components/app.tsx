import * as React from "react";
import 'l20n/dist/bundle/web/l20n';

// The default template for the whole app. We're not doing much with it.
// TODO: Maybe put the navbar in here?
export default class App extends React.Component<any, any> {
  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }
}
