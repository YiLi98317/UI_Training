/**
 * load data from google sheet
 */
 function loadData() {
    // https://docs.google.com/spreadsheets/d//edit?usp=sharing
    var url = "https://docs.google.com/spreadsheet/pub?key=1H2uejLHcWBs-t7Mwx9ycMMyhcJnOTRFMqs4hZXObdic&single=true&gid=0&range=A1&output=csv";
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById("display").innerHTML = xmlhttp.responseText;
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
  }