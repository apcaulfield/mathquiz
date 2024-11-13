// Defines all mathematical operators used in equations
const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => b !== 0 ? a / b : 'undefined'
};

/**
 * Used for formatting the equation that is displayed to the user.
 * Called by generateEquation() after difficulty specific properties are applied.
 * Returns equation as string and numerical solution to it.
 * @param {number[]} numbers - array containing all numbers included in current expression.
 * @param {string[]} operators - array containing all allowed operators for the current difficulty level.
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
    solution = operations[currentOperator](solution, numbers[i + 1]);
  }

  // Add final number not followed by operator
  equation += `${numbers[numTerms - 1]}`;
  
  return {equation, solution};
}

/**
* Generates a random math equation for the user to solve.
* grade: 0 = Kindergarden, 1 = 1st Grade, 2 = 2nd Grade, etc. up to 12.
* progressScore: How close the user is to advancing to the next grade level. Used to adjust difficulty within a grade level.
*/
function generateEquation(grade, progressScore) {
  let operators = ['+', '-'];
  let equation = '';
  switch(grade){
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
    
    case 1:
      operators.push('*', '/');
      break;
    case 0:
      let maxNum;
      if (progressScore > 0.5){
        // Increases largest possible number to 20
        maxNum = 20;
      }
      else{
        maxNum = 10;
      }
      const num1 = Math.floor(Math.random() * maxNum) + 1;
      const num2 = Math.floor(Math.random() * maxNum) + 1;
      if (progressScore > 0.5){
        const num3 = Math.floor(Math.random() * maxNum) + 1;
        equation = formatEquation([num1, num2, num3], operators);
      }
      else{
        equation = formatEquation([num1, num2], operators);
      }
  }

  // Display current problem
  document.getElementById("problem").innerText = `${equation.equation}\n`;
  // Return the correct solution
  return equation;
}

// Initial and max time in seconds
let timer = 30;
const maxTime = 90;
let intervalId;

// Initial problem solution
let initialEquation = generateEquation(0, 0);
let solution = initialEquation.solution;
document.getElementById("problem").innerText = `${initialEquation.equation}\n`;

// Display initial progress bar
updateProgressBar();
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
        document.getElementById("time-remaining").textContent = timer;
        updateProgressBar();

        if (timer <= 0) {
            clearInterval(intervalId);
            alert("Time's up! Game over.");
            // Optionally, you could reset or end the game here
        }
    }, 1000); // Update every second
}

/**
 * Updates the width of the progress bar based on the remaining time.
 */
function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = `${(timer / maxTime) * 100}%`;
    if (timer <= 10) {
        progressBar.style.backgroundColor = "#e74c3c"; // Change to red when time is low
    } else {
        progressBar.style.backgroundColor = "#13c359"; // Reset to green otherwise
    }
}

/**
 * Checks to see if the user's answer is correct.
 */
function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById("userAnswer").value);
    const feedback = document.getElementById("feedback");

    if (userAnswer === solution) {
        feedback.style.color = "green";
        console.log(`userAnswer: ${userAnswer}, Solution: ${solution}`);

        feedback.innerText = "Correct!";

        // Increase time by 5 seconds for correct answer
        timer = Math.min(timer + 5, 90); // Ensure timer doesn't exceed 30 seconds

        // Generate a new equation
        const newEquation = generateEquation(0, 0);
        solution = newEquation.solution;
        document.getElementById("problem").innerText = `${newEquation.equation}\n`;
        document.getElementById("userAnswer").value = ""; // Clear input box
    } else {
        feedback.style.color = "red";
        feedback.innerText = "Incorrect!";

        // Decrease time by 3 seconds for incorrect answer
        timer = Math.max(timer - 3, 0); // Ensure timer doesn't go below 0
    }

    updateProgressBar();
}