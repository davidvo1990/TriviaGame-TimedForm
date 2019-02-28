$(document).ready(function () {

    function createStart() {
        var startPage = $("<button class='startButton btn text-center' type='button'>Game Start!</button>");
        $(".body").html(startPage);

        //END createStart()
    };

    ///////////////////////
    //run all function here
    createStart();
    game();
    ///////////////////////

    //question data and answer
    var questions = [
        "1. This is a dark and ghost type Pokemon. It has jewels for eyes and razor sharp claws. It comes from the Hoenn region. Who's that Pokemon?",
        "2. This Pokemon is a flying type, although it is not a bird. It has no eyes and uses its senses to move around. It resembles a bat. Who's that Pokemon?",
        "3. This Pokemon is a Ground type. It is a legendary Pokemon from the Hoenn region and it is chased down by team Magma. Who's that Pokemon?",
        "4. This is a water type Pokemon from the Sinnoh region. It has two tails and it's at its first stage of evolution. Who's that Pokemon? ",
        "5. This Pokemon is an electric type. It is known as the gleaming eyes Pokemon, and it's at its final stage of evolution. It is black, blue and yellow. Who's that Pokemon?",
        "6. This is a fire type Pokemon and it is in the Johto region. It is a starter Pokemon and at its first stage of evolution. Who's that Pokemon?",
        "7. This is a Pokemon from the Kanto region. It is a small worm and it's at its first stage of evolution. When it evolves it turns into a yellow cocoon-like Pokemon. Who's that Pokemon?",
        "8. This is a dragon type. It is a legendary Pokemon from Hoenn. This Pokemon is red and it can fly. It has one Pokemon that is similar to it. Who's that Pokemon?",
        "9. This is an ice and ghost type. It is the final stage of evolution, and it floats in the air. It is one of the evolutions from Snorunt. Who's that Pokemon?",
        "10. This is an electric type Pokemon, and it is from the Kanto region. It is one of the evolutions of Eevee. Who's that Pokemon?"
    ];

    var answers = [
        ["Duskull", "Sableye", "Haunter", "Misdreavus"],
        ["Ralts", "Golbat", "Zubat", "Crobat"],
        ["Kyogre", "Latias", "Raquaza", "Groudon"],
        ["Buizel", "Prinplup", "Floatzel", "Marill"],
        ["Luxio", "Manectric", "Electrike", "Luxray"],
        ["Chikorita", "Quilava", "Cyndaquil", "Totodile"],
        ["Kakuna", "Caterpie", "Weedle", "Beedrill"],
        ["Mewtwo", "Latios", "Latias", "Mew"],
        ["Glalie", "Glaceon", "Gallade", "Froslass"],
        ["Leafeon", "Vaporeon", "Jolteon", "Flareon"]
    ];

    var correctAns = [
        "Sableye",
        "Zubat",
        "Groudon",
        "Buizel",
        "Luxray",
        "Cyndaquil",
        "Weedle",
        "Latias",
        "Froslass",
        "Jolteon"
    ];


    var counter = 60;
    var time;
    var box;
    var main;
    var correct = 0;
    var wrong = 0;
    var unanswer = questions.length;
    var timeout;
    var pick;

    //decrease counter each time it call
    function countdown() {
        if (counter > 0) {
            counter--;
        }

        if (counter === 0) {
            clearInterval(time);
            resultPage();
            //unanswer++;
        }
        //console.log(counter);
        $(".timer").html(counter);
        //END countdown();
    };


    //call countdown() per one sec
    function timeOut() {
        time = setInterval(countdown, 1000);

        //END timeOut()
    };


    //create the four question in div box
    function createTrivia() {
        main = $("<div class='main'></div>");
        var timer = $("<div class='remain'>Time remaining is : <span class='timer'>60</span></div>");
        box = $("<div class='box'></div>");
        var submitButton = $("<div class= 'submit'><button class='submitButton btn text-center' type='button'>Submit!</button></div>");

        next();

        $(".body").html(timer).append(main);
        main.append(box).append(submitButton);

    };

    //run a bunch of thing when click the button 
    function start() {
        createTrivia();
        timeOut();
        pickAns();
        submit()
        //END start()
    };


    //create the question page when click on the start game button
    function game() {
        $(".startButton").on("click", function () {
            start();
        });
        //END game()
    };


    //enable click to choose answer from the 4 answers provide
    function pickAns() {
        $(".inans").on("click", function () {
            //var pick = document.querySelector('input[name="answer"]:checked').value
            //var pick = $('input[name="answer0"]:checked').val();
            //console.log("You had select: " + pick);
            var uncheck = 0;
            var amountCorrect = 0;
            var select;
            for (var i = 0; i < questions.length; i++) {
                var radios = document.getElementsByName('answer' + i);
                for (var j = 0; j < radios.length; j++) {
                    var radio = radios[j];
                    if (radio.value === correctAns[i] && radio.checked) {
                        amountCorrect++;
                    }
                    if (!radio.checked) {
                        uncheck++;
                    }
                    if (radio.checked) {
                        select = radio.value;
                    }

                }
            }
            correct = amountCorrect;
            unanswer = uncheck - questions.length * 4 + questions.length;
            wrong = questions.length - correct - unanswer;
            pick = select;

            console.log("You had selected: " + pick);
            console.log("Total correct Responses is: " + correct);
            console.log("Total Wrong Responses is: " + wrong);
            console.log("Total Unanswer Responses is: " + unanswer);
            console.log("----------------------------------");

        })
        //END pickAns()
    };



    //move to the next screen if answer had been pick after 5 sec
    function next() {

        for (var i = 0; i < questions.length; i++) {
            var form = $("<div class='questform'></div>")
            var question = $("<div class='question'>" + questions[i] + "</div>");
            var answersChoice = $("<form class='answerChoice'></form>");
            var firstAnswer = $("<span class='ans first'><input class='inans firstAnswer' type='radio' name='answer" + i + "' value='" + answers[i][0] + "' >" + answers[i][0] + "</span>");
            var secondAnswer = $("<span class='ans second'><input class='inans secondAnswer' type='radio' name='answer" + i + "' value='" + answers[i][1] + "' >" + answers[i][1] + "</span>");
            var thirdAnswer = $("<span class='ans third'><input class='inans thirdAnswer' type='radio' name='answer" + i + "' value='" + answers[i][2] + "' >" + answers[i][2] + "</span>");
            var fourthAnswer = $("<span class='ans fourth'><input class='inans fourthAnswer' type='radio' name='answer" + i + "' value='" + answers[i][3] + "' >" + answers[i][3] + "</span>");


            box.append(form);
            form.append(question).append(answersChoice);
            answersChoice.append(firstAnswer).append(secondAnswer).append(thirdAnswer).append(fourthAnswer);

            //end for loop
        }
        //END next()
    };


    //return result page if out of time and click submit button
    function resultPage() {
        var endline = $("<div>All done, here's how you did!</div>")
        var correctAns = $("<div>Correct Answers: <span>" + correct + "</span></div>")
        var wrongAns = $("<div>Wrong Answers: <span>" + wrong + "</span></div>")
        var unAns = $("<div>Unanswered: <span>" + unanswer + "</span></div>")
        var reset = $("<button class='resetButton btn text-center' type='button'>Restart the Game!</button>");
        $(".main").html(endline).append(correctAns).append(wrongAns).append(unAns).append(reset);
        resetpage();
        clearInterval(time);
        //
    }


    //return result page if click submit button
    function submit() {
        $(".submitButton").on("click", function () {
            resultPage();

        })
        //END submit()
    }


    //reset the game again when click reset button
    function resetpage() {
        $(".resetButton").on("click", function () {

            counter = 60;
            correct = 0;
            wrong = 0;
            unanswer = questions.length;
            start();

        })
        //END resetpage()
    };


    // change color as time pass for fun
    setInterval(function () {
        $(".title").attr("style", "color:red");
        $(".startButton, .submitButton, .resetButton").attr("style", "background:rgb(85, 22, 233)");
        $(".question").attr("style", "color:green");
    }, 2000);
    setInterval(function () {
        $(".title").attr("style", "color:yellow");
        $(".startButton, .submitButton, .resetButton").attr("style", "background:rgb(18, 219, 219)");
        $(".question").attr("style", "color:brown");
    }, 3000);
    setInterval(function () {
        $(".title").attr("style", "color:blue");
        $(".startButton, .submitButton, .resetButton").attr("style", "background:rgb(213, 18, 219)");
        $(".question").attr("style", "color:purple");
    }, 5000);
    setInterval(function () {
        $(".title").attr("style", "color:rgb(9, 245, 40)");
        $(".startButton, .submitButton, .resetButton").attr("style", "background:black");
        $(".question").attr("style", "color:blue");
    }, 7000);
    setInterval(function () {
        $(".title").attr("style", "color:rgb(213, 18, 219)");
        $(".startButton, .submitButton, .resetButton").attr("style", "background:blue");
        $(".question").attr("style", "color:orange");
    }, 11000)
    setInterval(function () {
        $(".title").attr("style", "color:rgb(18, 219, 219)");
        $(".startButton, .submitButton, .resetButton").attr("style", "background:yellow");
        $(".question").attr("style", "color:violet");
    }, 17000);
    setInterval(function () {
        $(".title").attr("style", "color:rgb(85, 22, 233)");
        $(".startButton, .submitButton, .resetButton").attr("style", "background:red");
        $(".question").attr("style", "color:red");
    }, 7000);

    // sound for fun
    var audio = new Audio("assets/sound/1-Pokemon Theme (Season Theme).mp3");
    setInterval(function () {
        audio.play();
    }, 1000);
    //END

    //END ready()
});