//arrray of the quiz questions, avaialble choices, and correct answers     
var questions = [{
    title: "Which London Train Station can you catch the Hogwarts Express?",
    choices: ["a. King's Cross Station", "b. London Bridge Station", "c. Victoria Station", "d. Waterloo Station"],
    answer: "a. King's Cross Station"
},
{
    title: "What are the names of Harry Potter's parents?",
    choices: ["a. John & Leah", "b. Jim & Pam", "c. James & Lily", "d. Jerry & Laura"],
    answer: "c. James & Lily"
},
{
    title: "What position does Harry play on his Qudditch team?",
    choices: ["a. Keeper", "b. Bludger", "c. Chaser", "d. Seeker"],
    answer: "d. Seeker"
},
{
    title: "What Hogwarts house does Cedric Diggory belong to?",
    choices:["a. Gryffindor", "b. Hufflepuff", "c. Ravenclaw", "d. Slytherin"],
    answer: "b. Hufflepuff"
},
{
    title: "What's Voldemorts real name?",
    choices: ["a. Tim Roddle", "b. Ron Timble", "c. Thomas Raddle", "d. Tom Riddle"],
    answer: "d. Tom Riddle"
},
{
    title: "What power do the dementors have over people?",
    choices: ["a. The cause them to harm one another", "b. They drain them of all happiness", "c. The make them do their bidding", "d. They make them go crazy"],
    answer: "b. The drain them of all happiness"
},
{
    title: "Who kills Professor Dumbledore?",
    choices: ["a. Severus Snape", "b. Bellatrix LeStrange", "c. Draco Malfoy", "d. Lucius Malfoy"],
    answer: "a. Severus Snape"
},
{
    title: "How does Harry catch his first snitch?",
    choices: ["a. With his hands", "b. With his feet", "c. In his mouth", "d. In his pocket"],
    answer: "c. In his mouth"
},
{
    title: "How are Hogwarts students placed in their houses?",
    choices: ["a. They're assigned by a professor", "b. They draw straws", "c. They are in the same house as their parents", "d. The Sorting Hat"],
    answer: "d. The Sorting Hat"
},
{
    title: "What does the Marauder's Map show?",
    choices: ["a. The location of everyone at Hogwarts", "b. The Room of Requirement", "c. The Password to Dumbledore's office", "d. Hidden Treasure"],
    answer: "a. The location of everyone at Hogwarts"
}
]

var questionDiv = document.getElementById("questions");
var choicesElement = document.getElementById("choices");
var timerElement = document.getElementById("time");
var submitInitialsBtn = document.getElementById("submitInitials");
// referencing startBtn by id on html
var startBtn = document.getElementById("startBtn");
startBtn.onclick = startQuiz;

// Setting up the variables
var currentQuestionIndex = 0;
var time = 60;
var timerId;
var correct = 0;
var initials = "";
var finalScore = "";

// The start quiz function
function startQuiz(){
  var startScreenDiv = document.getElementById("startScreen");
  startScreenDiv.setAttribute("class", "hide")

  questionDiv.removeAttribute("class");

  timerId = setInterval(startTimer, 1000)

  displayQuestion()
}

  function startTimer(){
    time--;
    timerElement.textContent = time;

    if(time === 0){
      endQuiz();
    }
  }

  // This function gets the questions to display
  function displayQuestion(){
    var currentQuestion = questions[currentQuestionIndex];

    var questionTitle = document.getElementById("questionTitle");
    questionTitle.textContent = currentQuestion.title;

    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i){

      var choiceBtn = document.createElement("button");
      choiceBtn.setAttribute("class", "choice");
      choiceBtn.setAttribute("value", choice);

      choiceBtn.textContent = i + 1 + ". " + choice;

      choiceBtn.onclick = handleClick;
      choicesElement.append(choiceBtn);
    })   
  }

  function handleClick(){
    // This if statement is saying if you answer incorrectly, it is taking 10 seconds off your time
    if(this.value !== questions[currentQuestionIndex].answer ){
      time -= 10;
    } else {
      correct++;
    }

    if(time < 0){
      endQuiz();
    }

    currentQuestionIndex++;

    if(currentQuestionIndex === questions.length){
      endQuiz();
    } else {
      displayQuestion();
    }
  }

  // This is the function to end the quiz
  function endQuiz(){

    clearInterval(timerId);

    var endScreen = document.getElementById("endScreen");
    endScreen.removeAttribute("class");

    questionDiv.setAttribute("class", "hide");

    var score = correct / questions.length;
    var userScore = score.toFixed(2);
    var finalScore = userScore.split("0.")

    console.log("userScore", finalScore[1] + "%")

    var finalScoreElement = document.getElementById("finalScore");
    finalScoreElement.textContent = finalScore[1] + "%";

    var submitInitials = document.getElementById("submitInitials");
    submitInitials.onclick = saveHighScore;

  }


// This is the function to save the high scores
  var saveHighScore = function () {
   
    var initials = submitInitials

    if (initials !== "") {
      var highscores = 
      JSON.parse(window.localStorage.getItem("highscores")) || [];
      

      var newScore = {
        initials: initials,
        score: finalScore
      };
      

      highscores.push(newScore);
      window.localStorage.setItem("highscores", 
      JSON.stringify(highscores));

      
    }
  };

  

  submitInitialsBtn.onclick = saveHighScore;