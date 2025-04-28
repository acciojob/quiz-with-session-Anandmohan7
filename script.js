// your JS code here.

// Get DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load saved answers from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Function to render the questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear old content if re-rendered

  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.innerText = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach(choice => {
      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = `question-${i}`;
      choiceInput.value = choice;

      // Set checked if previously selected
      if (userAnswers[i] === choice) {
        choiceInput.checked = true;
        choiceInput.setAttribute("checked", "true"); // Important for Cypress
      }

      // Save progress on change
      choiceInput.addEventListener("change", () => {
        userAnswers[i] = choiceInput.value;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.innerText = choice;

      questionDiv.appendChild(choiceInput);
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Function to calculate and display the score
function calculateScore() {
  let score = 0;
  questions.forEach((q, i) => {
    // Check if answer exists and is correct
    if (userAnswers[i] && userAnswers[i] === q.answer) {
      score++;
    }
  });

  // Display the score
  scoreElement.innerText = `Your score is ${score} out of 5.`;

  // Save final score to localStorage
  localStorage.setItem("score", score.toString());
}

// Attach submit event
submitButton.addEventListener("click", () => {
  calculateScore();
});

// Call render initially
renderQuestions();

// On page load, if user has submitted before, show last score
const savedScore = localStorage.getItem("score");
if (savedScore !== null && savedScore !== undefined) {
  scoreElement.innerText = `Your score is ${savedScore} out of 5.`;
}
