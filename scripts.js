const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const numBtns = document.querySelectorAll(".num");
const opBtns = document.querySelectorAll(".op");
const pointBtn = document.querySelector(".point");
const equalBtn = document.querySelector(".equals");
const calcDisplay = document.querySelector(".text-display");

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

window.addEventListener("keydown", handleKeyInput);

numBtns.forEach((button) =>
  button.addEventListener("click", () => appendNum(button.textContent))
);

opBtns.forEach((operator) =>
  operator.addEventListener("click", () => appendOp(operator.textContent))
);

pointBtn.addEventListener("click", () => appendPoint(pointBtn.textContent));

clearBtn.addEventListener("click", resetScreen);

deleteBtn.addEventListener("click", backspace);

equalBtn.addEventListener("click", operate);

function operate() {
  if (!secondNum) {
    return;
  } else if (secondNum === "0" && operator === "÷") {
    calcDisplay.textContent = "ERROR";
    return;
  }

  answer = evaluate[operator](firstNum, secondNum);

  if (!Number.isInteger(answer)) {
    calcDisplay.textContent = answer.toFixed(2);
  } else {
    calcDisplay.textContent = answer;
  }

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
  if (!firstNum || (operator && !secondNum)) return;
  if (operator && secondNum) {
    answer = evaluate[operator](firstNum, secondNum);
    firstNum = answer;
    secondNum = "";
  }

  operator = op;
  calcDisplay.textContent += " " + operator + " ";
}

function appendPoint(point) {
  if (answer && !operator) {
    resetValues();
    resetScreen();
  }

  answer;

  if (firstNum.toString().includes(".") && operator === null) {
    return;
  } else if (secondNum.includes(".")) {
    return;
  }
  operator === null ? (firstNum += point) : (secondNum += point);
  calcDisplay.textContent += point;
}

function backspace() {
  if (answer && !secondNum) {
    return;
  } else if (operator) {
    secondNum = secondNum.slice(0, -1);
    calcDisplay.textContent = firstNum + " " + operator + " " + secondNum;
  } else {
    firstNum = firstNum.slice(0, -1);
    calcDisplay.textContent = firstNum;
  }
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

function handleKeyInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNum(e.key);
  if (e.key === ".") appendPoint(pointBtn.textContent);
  if (e.key === "/" || e.key === "*" || e.key === "-" || e.key === "+")
    appendOp(convertOp(e.key));
  if (e.key === "Enter" || e.key === "=") operate();
  if (e.key === "Backspace") backspace();
  if (e.key === "Escape") resetScreen();
}

function convertOp(handleKeyInput) {
  if (handleKeyInput === "/") {
    return "÷";
  } else if (handleKeyInput === "*") {
    return "×";
  } else if (handleKeyInput === "*") {
    return "×";
  } else if (handleKeyInput === "-") {
    return "−";
  } else if (handleKeyInput === "+") {
    return "+";
  }
}
