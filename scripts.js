const numBtns = document.querySelectorAll(".num");
const opBtns = document.querySelectorAll(".op");
const equalBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");
const calcDisplay = document.querySelector(".bottom");

let firstNum = "";
let secondNum = "";
let operator = null;
let answer = "";

const evaluate = {
  "÷": function (a, b) {
    return a / b;
  },
  "×": function (a, b) {
    return a * b;
  },
  "−": function (a, b) {
    return a - b;
  },
  "+": function (a, b) {
    return +a + +b;
  },
};

numBtns.forEach((button) =>
  button.addEventListener("click", () => appendNum(button.textContent))
);

opBtns.forEach((operator) =>
  operator.addEventListener("click", () => appendOp(operator.textContent))
);

clearBtn.addEventListener("click", resetScreen);

equalBtn.addEventListener("click", operate);

function operate() {
  answer = evaluate[operator](firstNum, secondNum);
  calcDisplay.textContent = answer;
  firstNum = answer;
  secondNum = "";
  operator = null;
}

function appendNum(num) {
  if (answer && !operator) {
    resetValues();
    resetScreen();
  }

  operator === null ? (firstNum += num) : (secondNum += num);
  calcDisplay.textContent += num;
}

function appendOp(op) {
  if (op && secondNum) {
    firstNum = evaluate[operator](firstNum, secondNum);
    secondNum = "";
  }

  operator = op;
  calcDisplay.textContent += " " + operator + " ";
}

function resetScreen() {
  calcDisplay.textContent = "";
  resetValues();
}

function resetValues() {
  firstNum = "";
  secondNum = "";
  operator = null;
  answer = "";
}
