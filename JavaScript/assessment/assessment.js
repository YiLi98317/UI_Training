(function () {
    //global variable
    var totalNum = 0;
    var correctNum = 0;
    var data;

    /**
     * generate quiz from file
     * @param {file} file 
     */
    function generateQuiz(file) {
        console.log("read file...");
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (event) {
            var csv = event.target.result;
            var quizData = $.csv.toObjects(csv);
            data = quizData;
            console.log("file data: ", quizData);
            console.log("generate quiz...");

            for (var i = 0; i < quizData.length; i++) {
                totalNum++;
                var quizElement = quizData[i];
                console.log("quiz element: ", quizElement);
                console.log("quiz ID: ", quizElement['ID']);
                $('#quizContainer')
                    .append(
                        $(document.createElement('label')).prop({
                            for: quizElement.ID
                        }).html(quizElement.Question)
                    )
                    .append(
                        $(document.createElement('select')).prop({
                            id: quizElement.ID,
                            name: quizElement.ID
                        })
                    )

                for (var j = 1; j < 5; j++) {
                    var answer = 'Answer' + j;
                    console.log("Option num: ", answer);
                    console.log("Option desc: ", quizElement[answer]);
                    var selectDropdown = '#' + quizElement.ID;
                    console.log("typeof: ", typeof quizElement[answer]);
                    $(selectDropdown)
                        .append($(document.createElement('option')).prop({
                            value: quizElement[answer],
                            text: quizElement[answer]
                        }))
                }
            }
        }
    }

    /**
     * grade the quiz and store the result to localstorage
     */
    function gradeQuiz() {
        localStorage.setItem("totalNum", totalNum);
        for(var i = 0; i < data.length; i++) {
            var quizID = i+1;
            var answer = $('#Q'+quizID).val();
            var correct = data[i].Correct;
            if(answer === correct) correctNum++;
        }
        localStorage.setItem("correctNum", correctNum);
    }

    /**
     * init: add event listeners
     */
    function addEventListeners() {
        console.log("addEventListeners");

        $('#generateQuizBtn').click(function (evt) {
            console.log("read file...");
            var quizFile = $('#quizFile').get(0).files[0];
            if (!quizFile) {
                alert("No file selected!");
                return;
            }
            console.log("file:", quizFile);
            $('#generateQuizBtn').hide();
            $('#submitQuizBtn').show();
            generateQuiz(quizFile);
        });

        $('#reset').click(function (evt) {
            console.log("reset");
            location.reload();
        });

        $('#submitQuizBtn').click(function(evt) {
            console.log("check quiz...");
            gradeQuiz();
            console.log("submit...");
            window.location.replace("result.html");
        });
    }

    addEventListeners();
    $('#submitQuizBtn').hide();
})();