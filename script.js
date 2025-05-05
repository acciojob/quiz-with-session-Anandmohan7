const questions = [
  {
    question: "What is the highest mountain in the world?",
    choices: ["K2", "Kangchenjunga", "Everest", "Makalu"],
    answer: "Everest"
  },
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  {
    question: "What is the boiling point of water?",
    choices: ["90°C", "80°C", "100°C", "110°C"],
    answer: "100°C"
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "22"],
    answer: "4"
  }
];

const questionsContainer = document.getElementById("questions");
const scoreDisplay = document.getElementById("score");
const submitButton = document.getElementById("submit");

function renderQuestions() {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  questionsContainer.innerHTML = "";

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${q.question}</p>`;

    q.choices.forEach(choice => {
      const inputId = `q${index}_${choice}`;
      const isChecked = progress[index] === choice;

      const label = document.createElement("label");
      label.setAttribute("for", inputId);
      label.innerHTML = `
        <input
          type="radio"
          name="q${index}"
          id="${inputId}"
          value="${choice}"
          ${isChecked ? "checked" : ""}
        />
        ${choice}
      `;
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsContainer.appendChild(questionDiv);
  });

  attachListeners();
}

function attachListeners() {
  const radios = document.querySelectorAll("input[type='radio']");
  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
      const qIndex = radio.name.replace("q", "");
      progress[qIndex] = radio.value;
      sessionStorage.setItem("progress", JSON.stringify(progress));
    });
  });
}

function submitQuiz() {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  let score = 0;

  questions.forEach((q, index) => {
    if (progress[index] === q.answer) {
      score++;
    }
  });

  const result = `Your score is ${score} out of 5.`;
  scoreDisplay.textContent = result;
  localStorage.setItem("score", score);
}

function loadStoredScore() {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDisplay.textContent = `Your score is ${savedScore} out of 5.`;
  }
}

// Initialize
renderQuestions();
loadStoredScore();
