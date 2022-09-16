import React, { useState } from 'react';

var state = null;
var setState = null;

export function StateHook(initValue) {
    [state, setState] = React.useState(initValue);
  
    // Define whatever you want
    
  
    return [state, setState ]; // pass more 
}

export function setStateHook(val) {
    setState(val);
}

export function getStateHook() {
    return state;
}