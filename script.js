const questionsData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "22"],
    answer: "4"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Hemingway", "Austen", "Tolkien"],
    answer: "Shakespeare"
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "80°C", "100°C", "110°C"],
    answer: "100°C"
  }
];

const questionsContainer = document.getElementById("questions");
const scoreDisplay = document.getElementById("score");
const submitButton = document.getElementById("submit");

function renderQuestions() {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  questionsContainer.innerHTML = "";

  questionsData.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${q.question}</p>`;

    q.options.forEach(option => {
      const inputId = `q${index}_${option}`;
      const isChecked = progress[index] === option ? "checked" : "";

      questionDiv.innerHTML += `
        <label for="${inputId}">
          <input type="radio" name="q${index}" id="${inputId}" value="${option}" ${isChecked}>
          ${option}
        </label><br/>
      `;
    });

    questionsContainer.appendChild(questionDiv);
  });

  attachChangeListeners();
}

function attachChangeListeners() {
  const radios = document.querySelectorAll("input[type='radio']");
  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
      const questionIndex = radio.name.replace("q", "");
      progress[questionIndex] = radio.value;
      sessionStorage.setItem("progress", JSON.stringify(progress));
    });
  });
}

function submitQuiz() {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  let score = 0;

  questionsData.forEach((q, index) => {
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

// Event listeners
submitButton.addEventListener("click", submitQuiz);

// Initialize
renderQuestions();
loadStoredScore();
