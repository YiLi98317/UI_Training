import React from "react";

function getVal(val) {
  if(val == "c") {
    return "Celcius"
  }
  else {
    return "Fahrenheit";
  }
}
export default class TemperatureInput extends React.Component {

  constructor(props) {
    super(props)
    this.handleChanges = this.handleChanges.bind(this);
  }

  handleChanges(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    var x = this.props.temperature;
    var y = this.props.scale;
    return(
      <fieldset>
        <legend>Enter temp value {getVal(y)}:</legend>
        <input value={x} onChange={this.handleChanges}></input>
      </fieldset>
    )
  }
}