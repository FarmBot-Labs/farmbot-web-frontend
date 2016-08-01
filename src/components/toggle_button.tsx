import * as React from "react";

export class ToggleButton extends React.Component<any, any> {
  caption() {
    let captions = {                // moved to L20n
      "0":         "CAPTION_zero",	//"no",
      "false":     "CAPTION_false",	//"no",
      "off":       "CAPTION_off",   //"no",
      "1":         "CAPTION_one",   //"yes",
      "true":      "CAPTION_true",  //"yes",
      "on":        "CAPTION_on",    //"yes",
      "undefined": "CAPTION_undef"  //"---"
    };

    return captions[String(this.props.toggleval)] || "---";
  }

  css() {
    let redCSS    = "button-like red";
    let greenCSS  = "button-like green";
    let yellowCSS = "button-like yellow";

    let cssClasses = {
      "0":         redCSS,
      "false":     redCSS,
      "off":       redCSS,
      "1":         greenCSS,
      "true":      greenCSS,
      "on":        greenCSS,
      "undefined": yellowCSS
    };

    return cssClasses[String(this.props.toggleval)] || yellowCSS;
  }

  render() {
    return <button data-l10n-id={ this.caption() }
	               className={ this.css() }
                   onClick={ this.props.toggleAction }> { this.caption() }</button>;
  }
}
