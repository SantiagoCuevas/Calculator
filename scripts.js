const numBtns = document.querySelectorAll(".num");
const opBtns = document.querySelectorAll(".op");

const calcDisplay = document.querySelector(".bottom");

let firstNum = "";
let operator = "";
let secondNum = "";

function operate() {
  return operator(firstNum, secondNum);
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

numBtns.forEach((button) =>
  button.addEventListener("click", () => appendNum(button.textContent))
);

function appendNum(number) {
  if (calcDisplay.textContent === "0") {
    resetScreen();
  }
  calcDisplay.textContent += number;
}

function resetScreen() {
  calcDisplay.textContent = "";
}
