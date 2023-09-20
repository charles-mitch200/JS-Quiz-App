const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Tiger", correct: false },
      { text: "Lion", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Sri Lanka", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Africa", correct: false },
      { text: "Arctic", correct: false },
    ],
  },
];

const questionElem = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// Remove the previous children from the answers div
const resetState = () => {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
};

// Function to select answer
const selectAnswer = (e) => {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  isCorrect
    ? (selectedBtn.classList.add("correct"), score++)
    : selectedBtn.classList.add("incorrect");

  // Highlight the correct answer automatically
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
};

// Function to render question on the page
const showQuestion = () => {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElem.innerHTML = `${questionNumber}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
};

// fucntion to start the app
const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
};

// Function to display score
const showScore = () => {
  resetState();
  questionElem.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = `Play Again!`;
  nextButton.style.display = `block`;
};

// Function for next button
const handleNextButton = () => {
  currentQuestionIndex++;
  currentQuestionIndex < questions.length ? showQuestion() : showScore();
};

// Make the next button functional
nextButton.addEventListener("click", () => {
  currentQuestionIndex < questions.length ? handleNextButton() : startQuiz();
});

startQuiz();
