let firstValue = null,
    secondValue = null,
    operator = null,
    clearFlag = true;
const display = document.getElementById('display'),
      equalBtn = document.getElementById('equal'),
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

function operate() {
    let a = parseInt(firstValue);
    let b = null;
    if (!secondValue) {
        b = parseInt(display.textContent);
    } else {
        b = parseInt(secondValue);
    }

    if (operator == '+') {
        display.textContent = add(a,b)
    } else if (operator == '-') {
        display.textContent = subtract(a,b)
    } else if (operator == '*') {
        display.textContent = multiply(a,b)
    } else if (operator == '/') {
        display.textContent = divide(a,b)
    }
    
    firstValue = display.textContent;
    secondValue = null;
    operator = null; 
    clearFlag = true;
}

function numberAction() {
    if (clearFlag) {
        display.textContent = this.dataset.value;
        clearFlag = false;
    } else {
        display.textContent += this.dataset.value;
    }
}

function operatorAction() {
    if (!firstValue) {
        firstValue = display.textContent;
        clearFlag = true;
        display.textContent = this.dataset.value;
        operator = this.dataset.value;
    } else {
        secondValue = display.textContent;
        clearFlag = true;
        operate();
        operator = this.dataset.value; 
    }

}

// when user clicks numeric button activate function
numericButtons.forEach(button => button.addEventListener('click', numberAction));
actionButtons.forEach(button => button.addEventListener('click', operatorAction));
equalBtn.addEventListener('click', operate);