import {changeRed, changeBack, calculate} from './script';
import React, { useState } from 'react';
import {setStateHook, getStateHook} from './stateHook';

function Button(props) {
    const value = props.values.equationValue;
    const state = getStateHook();
    const className = props.values.class;

    function eq() {
        const newState = calculate(state.data);
        setStateHook({data: newState});
        changeRed();
        return;
    }

    function clear() {
        setStateHook({data: ""});
        changeBack();
        return;
    }

    function add() {
        setStateHook({data: state.data + value});
        changeBack();
        return;
    }

    return(
        <input type="button"
            value = {props.values.displayValue}
            onClick = {() => {
                if(className === "eq") eq();
                else if(className === "clear") clear();
                else add();
            }}
            class = {className}
        />
    );
}

export default Button;