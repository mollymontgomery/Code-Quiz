//arrray of the quiz questions, avaialble choices, and correct answers     
var currentQuestions = [{
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

var questionIndex = 0;
var time = questions.length * 15;
var timeContainer;

var startButton = document.getElementById("start")
var questionsEl = document.getElementById("questions"); 
var questionChoices = document.getElementById("choices"); 
var resultsEl = document.getElementById("results"); 
var initialsEl = document.getElementById("initials"); 
var finalResults = document.getElementById("finalresults"); 
var submitButton = document.getElementById("submit");
var timerEl = document.getElementById("time");

function startQuiz() { 
    var startScreenEl = document.getElementById("start-screen"); 
    startScreenEl.setAttribute("class", "hide"); 
  
    questionsEl.removeAttribute("class"); 
   
    timerContainer = setInterval(updatedTime, 1000); 
  
    timerEl.textContent = time;  
  
    getQuestion();  
  }
  
  function getQuestion() {
    var currentQuestion = questions[questionsIndex]; //reference the questions-array.js
  
    var titleEl = document.getElementById("questiontitle");
    titleEl.textContent = currentQuestion.title;
  