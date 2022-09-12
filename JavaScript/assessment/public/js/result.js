// import { checkToken } from './checkToken.js';

// checkToken("result.html", "login.html");

const data = JSON.parse(localStorage.getItem("data"));
const quitBtn = document.getElementById("quit");

var xValues = ["Correct", "Wrong"];
var yValues = [localStorage.getItem("correctNum"), localStorage.getItem("totalNum") - localStorage.getItem("correctNum")];
var barColors = [
    "green",
    "red"
];

new Chart("myChart", {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    }
});


quitBtn.addEventListener("click", function (evt) {
    window.location.replace("login.html");
});

//create the result detail
for (const question of data) {
    $('#resultDetail')
        .append("<p>" + question.Question +"</p>")


    if(question.Answer !== question.Correct) {
        $('#resultDetail')
        .append("<p> Your answer: <b style='color: red'>"+ question.Answer +"</b> " + "Correct answer: <b>"+ question.Correct + "</b></p>")
    } else {
        $('#resultDetail')
        .append("<p> Your answer: <b style='color: green'>"+ question.Answer +"</b></p>")
    }
        
}
