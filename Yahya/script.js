var questions = [
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Module",
      "Digital Online Management",
      "Dynamic Object Model",
    ],
    correctAnswer: "Document Object Model",
  },
  {
    question: "Which method is used to parse a JSON string in JavaScript?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.parseString()",
      "JSON.objectify()",
    ],
    correctAnswer: "JSON.parse()",
  },
  {
    question: "What does 'NaN' stand for in JavaScript?",
    options: ["Not a Number", "Not a Null", "Null and Null", "Number as Null"],
    correctAnswer: "Not a Number",
  },
];

var currentQuestionIndex = 0;
var score = 0;
var startBtn = document.getElementById("start-btn");
var quizSection = document.getElementById("quiz-section");
var homepage = document.getElementById("homepage");
var questionText = document.getElementById("question-text");
var optionsContainer = document.getElementById("options-container");
var nextBtn = document.getElementById("next-btn");
var resultSection = document.getElementById("result-section");
var scoreElement = document.getElementById("score");
var resultMessage = document.getElementById("result-message");
var restartBtn = document.getElementById("restart-btn");

startBtn.addEventListener("click", () => {
  homepage.style.display = "none";
  quizSection.style.display = "block";
  displayQuestion();
});

function displayQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("option");
    optionDiv.textContent = option;
    optionDiv.addEventListener("click", () => checkAnswer(option));
    optionsContainer.appendChild(optionDiv);
  });

  nextBtn.style.display = "none";
}

function checkAnswer(selectedOption) {
  var correctAnswer = questions[currentQuestionIndex].correctAnswer;

  if (selectedOption === correctAnswer) {
    score++;
  }

  var allOptions = optionsContainer.querySelectorAll(".option");
  allOptions.forEach((option) => {
    if (option.textContent === correctAnswer) {
      option.style.backgroundColor = "#28a745";
    } else if (option.textContent === selectedOption) {
      option.style.backgroundColor = "#dc3545";
    }
    option.style.pointerEvents = "none";
  });

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quizSection.style.display = "none";
  resultSection.style.display = "block";

  scoreElement.textContent = `${score} out of ${questions.length}`;
  resultMessage.textContent =
    score === questions.length
      ? "Excellent! You got a perfect score."
      : score >= questions.length / 2
      ? "Good job! Keep practicing."
      : "Better luck next time.";
}

restartBtn.addEventListener("click", () => {
  score = 0;
  currentQuestionIndex = 0;
  resultSection.style.display = "none";
  homepage.style.display = "block";
});
