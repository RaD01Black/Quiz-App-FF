import formatData from "./helper.js";

const loader = document.getElementById("dot-spinner");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const questionNumber = document.getElementById("question-number");

const COREECT_BONUS = 10;
const URL = 
"https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";
let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

const fetchData = async () => { 
    const response = await fetch(URL);
    const json = await response.json();
    formattedData = formatData(json.results);
    start();
};

const start = () => {
    showQeustion()
    loader.style.display = "none"
    container.style.display = "block"
};

const showQeustion = () => {
    questionNumber.innerText = questionIndex + 1;
    const {question, answers, correctAsnwerIndex} = 
    formattedData[questionIndex];
    correctAnswer = correctAsnwerIndex;
    questionText.innerText = question;
    answerList.forEach((button, index) => {
        button.innerText = answers[index];
    });
};

const checkAnswer = (event, index) => {
    if(!isAccepted) return;
    isAccepted = false
    const isCorrect = index === correctAnswer ? true : false;
    if (isCorrect) {
        event.target.classList.add("correct");
        score += COREECT_BONUS;
        scoreText.innerText = score;
    } else {
        event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
    }
};

const nextHandler = () => {
    questionIndex++;

    if (questionIndex < formattedData.length){
        isAccepted = true; 
        removeClasses()
        showQeustion();
    } else {
        window.location.assign("/end.html")

    }
}

const removeClasses = () => {
    answerList.forEach((button) => (button.className = "answer-text"));
};

window.addEventListener("load", fetchData);
nextButton.addEventListener("click", nextHandler)
answerList.forEach((button, index) => {
    button.addEventListener("click", (event) => checkAnswer(event, index));
})
