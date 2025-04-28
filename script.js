// Quiz data (question, choices, and correct answer)
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is the largest ocean on Earth?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific",
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["Shakespeare", "Dickens", "Hemingway", "Fitzgerald"],
    answer: "Shakespeare",
  },
  {
    question: "What is the smallest country in the world?",
    choices: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"],
    answer: "Vatican City",
  },
];

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

      // ✅ Set checked if previously selected from sessionStorage
      if (userAnswers[i] === choice) {
        choiceInput.checked = true;
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
    if (userAnswers[i] === q.answer) {
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
if (savedScore !== null) {
  scoreElement.innerText = `Your score is ${savedScore} out of 5.`;
}
