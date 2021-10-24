
//Array of Objects 
var quizList = [
  {
    questionText: 'Question 1: Which of the following is a string?',
    answers: ['Hello World', '69', 'false', '{===}'],
    correctAnswerIndex: 0
  },
  {
    questionText: 'Question 2: How to check if they are both true?',
    answers: ['??', '||', '&&', '!!'],
    correctAnswerIndex: 2
  },
  {
    questionText: 'Question 3: What is used to check if one of two values is true?',
    answers: ['&&', '!=', '===', '||'],
    correctAnswerIndex: 3
  },
  {
    questionText: 'How can you acces any element from document in javascript?',
    answers: ['querySelector()', 'document.querySelectorAll()', 'getElementById()', 'querySelectorAll()'],
    correctAnswerIndex: 1
  },
]

var btnOption1 = document.getElementById('Option1');
var btnOption2 = document.getElementById('Option2');
var btnOption3 = document.getElementById('Option3');
var btnOption4 = document.getElementById('Option4');
var questionEl = document.getElementById('questionhere');
var submitScore = document.getElementById('submitScore');
var timer = 60;
var playerScore = 0;
var currentQuestionIndex = 0;
var startButton = document.getElementById('startButton');
var clockEl = document.getElementById('clock');
var timeInterval;
var timeSection = document.getElementById('timeContainer');
var questionSection = document.getElementById('questionContainer');
var startScreen = document.getElementById('startScreen');
var scoreboard = document.getElementById('scoreboard');
var previousScores = JSON.parse(localStorage.getItem("playerScoreList")) || [];

console.log(scoreboard);

function placeQuestionOnPage(question) {

  console.log("CUrrent q ", quizList[currentQuestionIndex]);
  //Display text on question and buttons 
  questionEl.textContent = quizList[currentQuestionIndex].questionText;
  btnOption1.textContent = quizList[currentQuestionIndex].answers[0];
  btnOption2.textContent = quizList[currentQuestionIndex].answers[1];
  btnOption3.textContent = quizList[currentQuestionIndex].answers[2];
  btnOption4.textContent = quizList[currentQuestionIndex].answers[3];

}

function validateAnswer() {
  //console.log("button clicked", this.textContent);
  var correctANsIndex = quizList[currentQuestionIndex].correctAnswerIndex;
  //console.log("Correct ans", quizList[currentQuestionIndex].answers[correctANsIndex]);

  //if else right/wrong 
  if (this.textContent === quizList[currentQuestionIndex].answers[correctANsIndex]) {
    alert("Correct Answer");
    playerScore = playerScore + 1; //increase score 
  } else {
    alert("Incorrect Answer");
    timer = timer - 5; //time deduction 

  }

  //move to the next question 
  currentQuestionIndex++;

  //if run out of questions call game over else 
  //call your displayQA 
  if (quizList.length === currentQuestionIndex) {
    endQuiz();
  } else {
    placeQuestionOnPage();
  }
}

//start the clock 
function countDownTimer() {
  timer--;
  clockEl.textContent = timer;
  if (timer === 0) {
    endQuiz();
  }
}

function startQuiz() {

  console.log("Hello");
  //Call the clock function every second 
  timeInterval = setInterval(countDownTimer, 1000);
  console.log(timeSection);
  //unhide the question container and timecontainer 
  timeSection.removeAttribute('class');
  questionSection.removeAttribute('class');

  startScreen.setAttribute("class", "hide");

  //Display Q&A 
  placeQuestionOnPage();

}

function endQuiz() {
  alert("Game over !!!");
  //stop the clock 
  clearInterval(timeInterval);
  //un-hide  the scoreboard section 
  scoreboard.removeAttribute("class");
  //hiding 
  questionSection.setAttribute("class", "hide");
  var scoreEl = document.getElementById("displayScore"); 
  //setting the score on the html element 
  scoreEl.textContent = playerScore;
}

// function saveScore() {
//   var playerName =  document.getElementById(); 

//   var newPlayeScore = { 
//     initials: playerName, 
//     score: playerScore; 
//   }
//   //Adding the new score to the exisiting playe score list 
//   previousScores.push(newPlayeScore); 

//   //Save it to localstorage 
//   localStorage.setItem("playerScoreList", JSON.stringify(previousScores) ); 
// }



//EVENT LISTINER 
startButton.addEventListener('click', startQuiz);
//add event listiner 
btnOption1.addEventListener('click', validateAnswer);
btnOption2.addEventListener('click', validateAnswer);
btnOption3.addEventListener('click', validateAnswer);
btnOption4.addEventListener('click', validateAnswer);

submitScore.addEventListener('click', saveScore);