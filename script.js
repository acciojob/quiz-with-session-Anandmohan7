// your JS code here.

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Get previously saved progress from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear existing content
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.innerText = question.question;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Pre-check if answer was previously selected
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // When the user selects an answer, save it to sessionStorage
      choiceElement.addEventListener("change", function() {
        userAnswers[i] = this.value;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const choiceLabel = document.createElement("label");
      choiceLabel.innerText = choice;

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    }
    questionsElement.appendChild(questionElement);
  }
}

// Submit quiz and calculate score
submitButton.addEventListener("click", function() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] && userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreElement.innerText = `Your score is ${score} out of 5.`;

  // Save final score to localStorage
  localStorage.setItem("score", score);

  // Optional: Clear sessionStorage after submitting if you want
  // sessionStorage.removeItem("progress");
});

// On page load, if a score exists in localStorage, show it
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  scoreElement.innerText = `Your score is ${lastScore} out of 5.`;
}

renderQuestions();

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];
