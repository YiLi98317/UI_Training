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

const quitBtn = document.getElementById("quit");
quitBtn.addEventListener("click", function(evt){
    window.location.replace("login.html");
});