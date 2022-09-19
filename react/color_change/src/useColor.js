import { useState } from "react";

var color = null;
var setColor = null;
var nextColor = null;

export function useColorHook(props) {
    [color, setColor] = useState(props);

    return [color, setColor];
}

export function setColorHook(props) {
    setColor(props);
}

export function setNextColorHook(props) {
    nextColor = props;
}

export function getNextColorHook() {
    return nextColor;
}