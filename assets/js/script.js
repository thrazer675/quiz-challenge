// DEFINE VARIABLES
var quizTime = document.getElementById("timer");
var startQuiz = document.getElementById("launch");
var startBtn = document.getElementById("startbtn")
var quizDiv = document.getElementById("quiz");
var questionEl = document.getElementById("questions");
var button1 = document.getElementById("1");
var button2 = document.getElementById("2");
var button3 = document.getElementById("3");
var button4 = document.getElementById("4");
var answerEl = document.getElementById("answer");
var questionResultEl = document.getElementById("question-result");
var finalEl = document.getElementById("final");
var scoreEl = document.getElementById("score");
var hsInput = document.getElementById("input");
var submitScore = document.getElementById("submit");
var hsContainer = document.getElementById("hs-container");
var hsPrompt = document.getElementById("hs-prompt");
var hsNameDisplay = document.getElementById("hs-name");
var highScore = document.getElementById("high-score");
var theEnd = document.getElementById("end");
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;
const savedScoreStorageKey = "savedScores";

// QUIZ QUESTIONS
var questions = [{

    question: "What is javascript?",
    choice1: "An application used for styling html",
    choice2: "Cursive coffee",
    choice3: "A sequence of statements to be executed by the browser",
    choice4: "An internet service provider",
    correctAnswer: "3"},
    {
    question: "What is the name for the way we type variables and functions in js?",
    choice1: "camelCase",
    choice2: "bumpCase",
    choice3: "lumpyText",
    choice4: "unevenType",
    correctAnswer: "1"},
    {
    question: "Are semicolons required for ending a statement?",
    choice1: "Yes, always",
    choice2: "Sometimes",
    choice3: "No, but it allows for multiple statements on one line",
    choice4: "Which one is a semicolon?",
    correctAnswer: "3"},
    {
    question: "What is a 'var'?",
    choice1: "Vastly Applicable Resource",
    choice2: "A variable that holds data value",
    choice3: "The way a pirate might say 'fire'",
    choice4: "Unrelated to js",
    correctAnswer: "2"},
    {
    question: "When should you use an 'if' statement?",
    choice1: "When you are uncertain of the desired outcome",
    choice2: "There is no such thing in js",
    choice3: "When you don't want to use a 'for sure' statement",
    choice4: "When executing code when a specified condition is true",
    correctAnswer: "4"},
];

var finalQuestionIndex = questions.length;

// FUNCTION TO GENERATE QUESTIONS/ANSWERS
function generateQuestions() {
    finalEl.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return displayScore();
    }
    var currentQuestion = questions[currentQuestionIndex];
    questionEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    button1.innerHTML = currentQuestion.choice1;
    button2.innerHTML = currentQuestion.choice2;
    button3.innerHTML = currentQuestion.choice3;
    button4.innerHTML = currentQuestion.choice4;
};

// STARTS QUIZ AND TIMER
function quizStart() {
    finalEl.style.display = "none";
    quizDiv.style.display = "none";
    generateQuestions();

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTime.textContent = "Time Left: " + timeLeft;

        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            displayScore();
            console.log("hey we're here stop the timers.");
        }
        
    }, 1000);
    quizDiv.style.display = "block";
}

// FUNCTION THAT DISPLAYS SCORE AT GAME END
function displayScore() {
    quizDiv.style.display = "none";
    finalEl.style.display = "block";
    clearInterval(timerInterval);
    hsInput.value = "";
    scoreEl.innerHTML = "You got " + score + " out of " + questions.length + " with " + timeLeft + " seconds left!";
    startQuiz.style.display = "none";
    hsContainer.style.display = "block";
    hsPrompt.style.display = "block";
    theEnd.style.display = "block";
    questionResultEl.style.display = "none";

    generateScores();
}

function displayHighScore() {
    quizDiv.style.display = "none";
    finalEl.style.display = "none";
    clearInterval(timerInterval);
    hsInput.value = "";
    scoreEl.innerHTML = "You got " + score + " out of " + questions.length + " with " + timeLeft + " seconds left!";
    startQuiz.style.display = "none";
    hsContainer.style.display = "block";
    hsPrompt.style.display = "none";
    theEnd.style.display = "block";
    questionResultEl.style.display = "none";

    generateScores();
}

// SUBMIT BUTTON EVENT LISTENER AND LOCAL STORAGE
submitScore.addEventListener("click", function highScore() {

    if(hsInput.value === "") {
        alert("Initials cannot be blank");
        return false;
    }
    else {
        var savedScores = JSON.parse(localStorage.getItem(savedScoreStorageKey)) || [];
        var currentUser = hsInput.value.trim();
        var currentScore = {
            name: currentUser,
            score: timeLeft
        };

        finalEl.style.display = "none";
        hsContainer.style.display = "block";
        hsPrompt.style.display = "block";
        theEnd.style.display = "block";

        savedScores.push(currentScore);
        localStorage.setItem(savedScoreStorageKey, JSON.stringify(savedScores));
        generateScores();
    }
});

function generateScores() {
    hsNameDisplay.innerHTML = "";
    highScore.innerHTML = "";
    var highScores = JSON.parse(localStorage.getItem(savedScoreStorageKey)) || [];
    var newName = document.createElement("ul");
    var newScore = document.createElement("ul");
    console.log("high scores", highScores);
    for (i = 0; i < highScores.length; i++) {
        var nameScoreItem = document.createElement("li");
        nameScoreItem.innerHTML = highScores[i].name + " - " + highScores[i].score;
        newName.appendChild(nameScoreItem);

    }

    hsNameDisplay.appendChild(newName);
    highScore.appendChild(newScore);

}

// CLEARS SCORES/NAMES FROM LOCAL STORAGE
function eraseScore() {
    window.localStorage.clear();
    hsNameDisplay.textContent = "";
    highScore.textContent = "";
}

// FUNCTION TO RESET QUIZ TO ORIGINAL STATE
function resetQuiz() {
    hsContainer.style.display = "none";
    finalEl.style.display = "none";
    startQuiz.style.display = "block";
    theEnd.style.display = "none";
    questionResultEl.style.display = "none";
    timeLeft = 60;
    score = 0;
    currentQuestionIndex = 0;
}

// CHECKING FOR CORRECT ANSWERS
function checkAnswer(answer) {
    correct = questions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        // alert("Correct!");
        displayQuestionResult("correct");
        currentQuestionIndex++;
        generateQuestions();
    }
    else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        // alert("Wrong!");
        displayQuestionResult("wrong");
        timeLeft = timeLeft - 10;
        currentQuestionIndex++;
        generateQuestions();
    }
    else {
        displayScore();
    }
}

function displayQuestionResult(result) {
    questionResultEl.innerHTML = result;
    questionResultEl.style.display = "block";
}
startBtn.addEventListener("click", quizStart);