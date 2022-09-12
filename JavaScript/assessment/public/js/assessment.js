import { checkToken } from './checkToken.js';
(function () {
    //global variable
    var totalNum = 0;
    var correctNum = 0;
    var data;
    const array = [];
    var fileList;

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
                    .append("<p>"+quizElement.Question+"</p>");

                for (var j = 1; j < 5; j++) {
                    var answer = 'Answer' + j;
                    console.log("Option num: ", answer);
                    console.log("Option desc: ", quizElement[answer]);
                    console.log("Option ID: ", quizElement.ID);
                    var selectDropdown = '#' + quizElement.ID;
                    console.log("typeof: ", typeof quizElement[answer]);
                    $('#quizContainer')
                        .append(
                            $('<input>').prop({
                                type: 'radio',
                                id: answer,
                                name: quizElement.ID,
                                value: quizElement[answer]
                            })
                        ).append(
                            $('<label>').prop({
                                for: answer
                            }).html(quizElement[answer])
                        )
                }
            }
        }
    }

    /**
     * grade the quiz and store the result to localstorage
     */
    function gradeQuiz() {
        localStorage.setItem("totalNum", totalNum);
        for (var i = 0; i < data.length; i++) {
            var quizID = i + 1;
            var answer = $('#Q' + quizID).val();
            const radioString = 'input[name="Q'+quizID+'"]:checked';
            console.log(radioString);
            var answerRadio = $(radioString).val();
            console.log("Q#: ", quizID);
            console.log("answer: ", answerRadio);
            var correct = data[i].Correct;
            data[i].Answer = answerRadio;
            console.log("answer in data: ", data[i].Answer);
            if (answer === correct) correctNum++;
            if (answerRadio === correct) correctNum++;
        }
        localStorage.setItem("correctNum", correctNum);
        localStorage.setItem("data", JSON.stringify(data));
    }

    /**
     * create file list
     * @param {array} values 
     */
    function generateList(values) {
        $('#file-selector')
            .append(
                $(document.createElement('label')).prop({
                    for: 'file-list'
                }).html('Choose your file from the directory you selected to generate quiz: ')
            )
            .append(
                $(document.createElement('select')).prop({
                    id: 'file-list',
                    name: 'file-list'
                })
            )

        for (const val of values) {
            $('#file-list').append($(document.createElement('option')).prop({
                value: val,
                text: val
            }))
        }
    }

    /**
     * refresh the file list to display all file in the directory
     * @param {files} file s
     */
    function refreshList(files) {
        fileList = files;
        $('#file-list').remove();
        $('#file-selector').append(
            $(document.createElement('select')).prop({
                id: 'file-list',
                name: 'file-list'
            })
        );
        var i = 0;
        for (const file of files) {
            console.log(file);
            if (file.type !== 'text/csv') {
                i++;
                continue;
            }
            $('#file-list').append($(document.createElement('option')).prop({
                value: i,
                text: file.name
            }));
            i++;
        }
    }

    /**
     * init: add event listeners
     */
    function addEventListeners() {
        console.log("addEventListeners");

        $('#generateQuizBtn').click(function (evt) {
            console.log("read file...");
            try {
                var quizFileFromList = fileList[$('#file-list').val()];
                var quizFile = $('#quizFile').get(0).files[0];  
            } catch(e) {
                console.log(e);
            }
            
            if (!quizFileFromList && !quizFile) {
                alert("No file selected!");
                return;
            }
            console.log("file:", quizFile);
            console.log("quizFileFromList:", quizFileFromList);
            $('#generateQuizBtn').hide();
            $('#submitQuizBtn').show();
            if (quizFile) generateQuiz(quizFile);
            if (quizFileFromList) generateQuiz(quizFileFromList);
        });

        $('#reset').click(function (evt) {
            console.log("reset");
            location.reload();
        });

        $('#submitQuizBtn').click(function (evt) {
            console.log("check quiz...");
            gradeQuiz();
            console.log("submit...");
            window.location.replace("result.html");
        });

        $('#dirPicker').change(function (evt) {
            refreshList(evt.target.files);
        });
    }

    checkToken("assessment.html", "login.html"); // token check
    $('#submitQuizBtn').hide();
    addEventListeners();
    generateList(array);
    
})();

