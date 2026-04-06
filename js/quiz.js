let currentQuestionIndex = 0;
let userAnswers = new Array(quizQuestions.length).fill(null);

const questionCounter = document.getElementById("questionCounter");
const progressPercent = document.getElementById("progressPercent");
const progressBar = document.getElementById("progressBar");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

function renderQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const optionLetters = ["A", "B", "C", "D"];

  questionNumber.textContent = `Question ${currentQuestionIndex + 1}`;
  questionText.textContent = currentQuestion.question;
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;

  const percent = Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100);
  progressPercent.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;

  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const optionBox = document.createElement("div");
    optionBox.className = "option-item";

    if (userAnswers[currentQuestionIndex] === optionLetters[index]) {
      optionBox.classList.add("active");
    }

    const letterBox = document.createElement("div");
    letterBox.className = "option-letter";
    letterBox.textContent = optionLetters[index];

    const textBox = document.createElement("div");
    textBox.className = "option-text";
    textBox.appendChild(document.createTextNode(option));

    optionBox.appendChild(letterBox);
    optionBox.appendChild(textBox);

    optionBox.addEventListener("click", function () {
      userAnswers[currentQuestionIndex] = optionLetters[index];
      renderQuestion();
    });

    optionsContainer.appendChild(optionBox);
  });

  prevBtn.disabled = currentQuestionIndex === 0;

  if (currentQuestionIndex === quizQuestions.length - 1) {
    nextBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
  } else {
    nextBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
  }
}

prevBtn.addEventListener("click", function () {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
});

nextBtn.addEventListener("click", function () {
  if (userAnswers[currentQuestionIndex] === null) {
    alert("Please select an answer before moving to the next question.");
    return;
  }

  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  }
});

submitBtn.addEventListener("click", function () {
  if (userAnswers[currentQuestionIndex] === null) {
    alert("Please select an answer before submitting.");
    return;
  }

  const unanswered = userAnswers.includes(null);
  if (unanswered) {
    alert("Please answer all questions before submitting.");
    return;
  }

  let score = 0;

  quizQuestions.forEach((question, index) => {
    if (userAnswers[index] === question.answer) {
      score++;
    }
  });

  const percentage = ((score / quizQuestions.length) * 100).toFixed(1);

  localStorage.setItem("quizResult", JSON.stringify({
    score: score,
    total: quizQuestions.length,
    percentage: percentage
  }));

  window.location.href = "./result.html";
});

document.addEventListener("DOMContentLoaded", function () {
  renderQuestion();
});