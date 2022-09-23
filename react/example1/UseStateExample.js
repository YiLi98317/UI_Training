import React from "react";
import TemperatureInput from "./App"
function toCels(val) {
    return (val - 32)*5/9;
};
function toFahren(val) {
    return (val*9/5)+32;
};

function convertVal(temp, toConvert) {
    var input = parseFloat(temp);
    if(Number.isNaN(input)) {
        return "";
    }
    var outcome = toConvert(input);
    return (Math.round(outcome*1000)/1000).toString()
};

export default class Cals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            temperature:"",
            scale:"c"
        };
        this.handleCelChange = this.handleCelChange.bind(this);
        this.handleFahrenChange = this.handleFahrenChange.bind(this);
    }

    handleCelChange(temperature) {
        console.log('temperature',temperature)
        this.setState({
            scale:"c",
            temperature
        });
    };

    handleFahrenChange(temperature) {
        this.setState({
            scale:"f",
            temperature
        });
    }

        render() {
            var scale = this.state.scale;
            var temperature = this.state.temperature;
            var cels = scale === "f" ? convertVal(temperature, toCels) : temperature;
            var farhen = scale === "c" ? convertVal(temperature, toFahren) : temperature;
            return (
                <div>
                    <TemperatureInput
                    scale="c"
                    temperature={cels}
                    onTemperatureChange={this.handleCelChange}
                    />
                    <TemperatureInput
                    scale="f"
                    temperature={farhen}
                    onTemperatureChange={this.handleFahrenChange}
                    />
                </div>
            );
        }
        
    }
