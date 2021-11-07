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

//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //proceed to end the game function when timer is below 0 at any time
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//stop the timer to end the game 
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="Initials"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 
<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
    Harry Potter Quiz!
</h1>
<h3>
    Click to play!   
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
timeLeft -= 15; 
next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
score += 20;
next();
}

//loops through the questions 
function next() {
currentQuestion++;

if (currentQuestion > questions.length) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}