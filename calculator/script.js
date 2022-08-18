const screen = document.getElementById("answer");

function changeRed() {
    screen.style.color = 'red';
    screen.style.backgroundColor = 'aqua';
}

function changeBack() {
    screen.style.color = 'blue';
    screen.style.backgroundColor = 'white';
}

function appendEquation(string) {
    screen.value += string;
    changeBack();
}

function clearEquation() {
    screen.value = "";
    changeBack();
}

function calculateEquation() {
    screen.value = eval(calc.input.value);
    changeRed();
}