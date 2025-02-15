// Defines all mathematical operators used in equations
const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => b !== 0 ? a / b : 'undefined'
};

/**
 * Used for formatting the equation that is displayed to the user.
 * Called by equationDifficulty() after difficulty specific properties are applied.
 * Returns equation as string and numerical solution to it.
 * @param {number[]} numbers: array containing all numbers included in current expression.
 * @param {string[]} operators: array containing all allowed operators for the current difficulty level.
 */
function formatEquation(numbers, operators){
  let equation = '';
  // Solution begins with first number
  let solution = numbers[0];
  const numTerms = numbers.length;

  for (let i = 0; i < numTerms - 1; i++){
    const currentOperator = operators[Math.floor(Math.random() * operators.length)]
    equation += `${numbers[i]} ${currentOperator} `;
    // Calculate solution
    if (currentOperator === "/" && currentGrade < 4){
      numbers[i + 1] = (Math.floor(Math.random() * maxDivision) + 1);
    }
    solution = operations[currentOperator](solution, numbers[i + 1]);
  }

  // Add final number not followed by operator
  equation += `${numbers[numTerms - 1]}`;
  
  return {equation, solution};
}

/**
* Generates a random math equation for the user to solve.
* @param {int} grade: 0 = Kindergarden, 1 = 1st Grade, 2 = 2nd Grade, etc. up to 12.
* @param {float} progressScore: How close the user is to advancing to the next grade level. Used to adjust difficulty within a grade level.
*/
function equationDifficulty(progressScore) {
  let operators = ['+', '-'];
  let equation = '';
  let maxNum;
  switch(currentGrade){
    case 12:
    
    case 11:
    
    case 10:
    
    case 9:
    
    case 8:
    
    case 7:
    
    case 6:
    
    case 5:
    
    case 4:
    
    case 3:
    
    case 2:
    
    case 1:{
      operators.push('*', '/');
      let maxDivision;
      let maxMultiply;
      if (progressScore >= 0.5){
        maxNum = 30;
        maxDivision = 4;
        maxMultiply = 9;
      }
      else{
        maxNum = 20;
        maxDivision = 3;
        maxMultiply = 5;
      }
      const num1 =  Math.floor(Math.random() * maxNum) + 1;
      const num2 =  Math.floor(Math.random() * maxNum) + 1;
      equation = formatEquation([num1, num2], operators);
    }
      break;
    case 0:{
      if (progressScore >= 0.5){
        // Increases largest possible number to 20
        maxNum = 20;
      }
      else{
        maxNum = 10;
      }
      const num1 = Math.floor(Math.random() * maxNum) + 1;
      const num2 = Math.floor(Math.random() * maxNum) + 1;
      if (progressScore >=  0.75 && Math.random() < (1/3)){
        // 1 in 3 chance that the expression contains 3 operands
        const num3 = Math.floor(Math.random() * maxNum) + 1;
        equation = formatEquation([num1, num2, num3], operators);
      }
      else{
        equation = formatEquation([num1, num2], operators);
      }
    }
  }

  // Display current problem
  document.getElementById("problem").innerText = `${equation.equation}\n`;
  // Return the correct solution
  return equation;
}

const grades = ["Kindergarten", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
let currentGrade = 0;
let score = 0;
let progressScore = 0;

// Initial and max time in seconds
let timer = 30;
const maxTime = 90;
let intervalId;

// Timer for how long it takes the user to answer the current problem
let currentProblemTimer = 0;

// Initial problem solution
let initialEquation = equationDifficulty(0, 0);
let solution = initialEquation.solution;
document.getElementById("problem").innerText = `${initialEquation.equation}\n`;

// Display initial progress bar
updateTimerBar();
// Start the countdown timer
startTimer();

// Check answer when the user presses "Enter"
document.getElementById("userAnswer").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
      checkAnswer();
  }
});

/**
 * Starts the countdown timer and updates the progress bar.
 */
function startTimer() {
    intervalId = setInterval(() => {
        timer -= 1;
        currentProblemTimer += 1;
        document.getElementById("time-remaining").textContent = timer;
        updateTimerBar();

        if (timer <= 0) {
            clearInterval(intervalId);
            alert("Time's up! Game over.");
            // TODO: reset or end game here
        }
    }, 1000); // Update every second
}

/**
 * Updates the width of the progress bar based on the remaining time.
 */
function updateTimerBar() {
    const timerBar = document.getElementById("timer-bar");
    timerBar.style.width = `${(timer / maxTime) * 100}%`;
    if (timer <= 10) {
        timerBar.style.backgroundColor = "#e74c3c"; // Change to red when time is low
    } else {
        timerBar.style.backgroundColor = "#13c359"; // Reset to green otherwise
    }
}

function updateProgressBar(){
  const progressBar = document.getElementById("progress-score-bar");
  progressBar.style.width = `${(progressScore * 100)}%`;
}

/**
 * Used for advancing the user to the next grade.
 * Called when progressScore = 1.
 */

function advanceGrade(){
  progressScore = 0;
  currentGrade += 1;
  document.getElementById("currentGrade").textContent = grades[currentGrade];
}

function addScore(){
  score += 100 * currentGrade;
}

/**
 * Checks to see if the user's answer is correct.
 */
function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById("userAnswer").value);
    const feedback = document.getElementById("feedback");

    // Correct answer
    if (userAnswer === solution) {
        feedback.style.color = "green";
        feedback.innerText = "Correct!";

        //Updating progress
        console.log(currentProblemTimer);
        progressScore = Math.min(progressScore + (1 / (3 * currentProblemTimer)), 1);
        if (progressScore == 1){
          advanceGrade();
        }

        //Updating score
        addScore();

        // Increase time by 5 seconds for correct answer
        timer = Math.min(timer + 5, 90); // Ensure timer doesn't exceed 30 seconds
        currentProblemTimer = 0;

        // Generate a new equation
        const newEquation = equationDifficulty(progressScore);
        solution = newEquation.solution;
        document.getElementById("problem").innerText = `${newEquation.equation}\n`;
    } else {
        feedback.style.color = "red";
        feedback.innerText = "Incorrect!";

        // Decrease progress towards next grade by 25%
        progressScore = Math.max(progressScore - 0.25, 0);

        // Decrease time by 3 seconds for incorrect answer
        timer = Math.max(timer - 3, 0);
    }

    // Clear input box
    document.getElementById("userAnswer").value = "";
    document.getElementById("time-remaining").textContent = timer;
    updateTimerBar();
    updateProgressBar();
    console.log(progressScore);
}