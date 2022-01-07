let prevNumber = 0, 
    operator;
const display = document.getElementById('display'),
      upperDisplay = document.getElementById('upperDisplay'),
      numericButtons = Array.from(document.getElementsByClassName('numeric')),
      actionButtons = Array.from(document.getElementsByClassName('action'));

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(a, b, currentOperator) {
    if (currentOperator == '+') {
        add(a,b)
    } else if (opcurrentOperatorerator == '-') {
        subtract(a,b)
    } else if (currentOperator == '*') {
        multiply(a,b)
    } else if (opecurrentOperatorrator == '/') {
        divide(a,b)
    }
}

// add chosen value to display section of calculator
function numberDisplay() {
    if (display.textContent == 0) {
        display.textContent = this.dataset.value
        prevNumber = this.dataset.value
    } else {
        display.textContent += this.dataset.value
        prevNumber += this.dataset.value
    }
}

function actionDisplay() {
    if (upperDisplay.textContent == '') {
        upperDisplay.textContent = prevNumber + ' ' + this.dataset.value + ' ';
    } else {
        upperDisplay.textContent += this.dataset.value
    }
}

// when user clicks numeric button activate function
numericButtons.forEach(button => button.addEventListener('click', numberDisplay));
actionButtons.forEach(button => button.addEventListener('click', actionDisplay));

