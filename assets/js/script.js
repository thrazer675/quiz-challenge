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
var finalEl = document.getElementById("final");
var scoreEl = document.getElementById("score");
var hsInput = document.getElementById("input");
var submitScore = document.getElementById("submit");
var hsContainer = document.getElementById("hs-container");
var hsPrompt = document.getElementById("hs-prompt");
var hsNameDisplay = document.getElementById("hs-name");
var highScore = document.getElementById("high-score");
var theEnd = document.getElementById("end");
var finalQuestionIndex = questions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

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

// FUNCTION TO GENERATE QUESTIONS/ANSWERS
function generateQuestions() {
    finalEl.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
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
        timeLeft-=5;
        quizTime.textContent = "Time Left: " + timeLeft;

        if(timeLeft === 0) {
            clearInterval(timerInterval);
            displayScore();
        }
    }, 1000);
    quizDiv.style.display = "block";
}

// FUNCTION THAT DISPLAYS SCORE AT GAME END
function displayScore() {
    quizDiv.style.display = "none";
    finalEl.style.display = "flex";
    clearInterval(timerInterval)
}

