import React from "react";

export default class AddToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            interval: 10
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleAdd() {
        this.props.onAdd(this.state);
        this.setState({text: ""});
    }

    handleChange(e) {
        this.setState({interval: e.target.value});
    }

    render() {
        const timeInterval = [0.5, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const optionList = timeInterval.map((time) => {
            return <option key={time} value={time}>{time*60} minutes</option>
        });

        return(
            <div className="center">
                <input 
                    type="text"
                    value={this.state.text}
                    onChange={(e) => this.setState({text: e.target.value})}
                />
                <select
                    label="time interval"
                    defaultValue={0.5}
                    onChange={this.handleChange}
                >
                    {optionList}
                </select>
                <button onClick={this.handleAdd}>
                    Add
                </button>
            </div>
            
        );
    }
}