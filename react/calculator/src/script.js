const screen = document.getElementById("screen");

function changeRed() {
    screen.style.color = 'red';
    screen.style.backgroundColor = 'aqua';
}

function changeBack() {
    screen.style.color = 'blue';
    screen.style.backgroundColor = 'white';
}

function calculate(s) {
    console.log(s);
    var curr = 0;
    var result = 0;
    var last = 0;
    var op = '+';

    for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);

        if (!isNaN(parseInt(c))) curr = curr * 10 + parseInt(c);

        if (isNaN(parseInt(c)) || i === s.length - 1) {
            if (op === '+' || op === '-') {
                result += last;
                last = op === '+' ? curr : -1 * curr;
            } else if (op === '*') {
                last *= curr;
            } else {
                last /= curr;
            }
            curr = 0;
            op = c;
        }
    }

    result += last;
    return result;
}

export {changeRed, changeBack, calculate};