let resultVal = null,
    prevVal = 0,
    curVal = null,
    operator = null,
    clearFlag = true;
const display = document.getElementById('display'),
      equalBtn = document.getElementById('equal'),
      clearBtn = document.getElementById('clear'),
      decimalBtn = document.getElementById('decimal'),
      undoBtn = document.getElementById('undo'),
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
    // ничего не делать если нажали "равно" до того как выбрать prevVal
    if (!prevVal) {
        return
    }
    let a = parseFloat(prevVal);
    let b = null;
    if (!curVal) {
        // не выполнять operate если ввели только 1 цифру и знак оператор 
        if (isNum(display.textContent)) {
            return
        }
        b = parseFloat(display.textContent);
    } else {
        b = parseFloat(curVal);
    }

    if (operator == '+') {
        resultVal = add(a,b)
    } else if (operator == '-') {
        resultVal = subtract(a,b)
    } else if (operator == '*') {
        resultVal = multiply(a,b)
    } else if (operator == '/') {
        if (b == 0) {
            divideByZeroError();
            return
        }
        resultVal = divide(a,b)
    }

    if (resultVal.toString().length >= 11) {
        resultVal = Number(resultVal).toExponential(2)
    }
    if (resultVal.toString().length > 6) {
        display.classList.add('sixDigit');
    }

    display.textContent = resultVal;
    
    prevVal = null;
    resultVal = null;
    curVal = null;
    operator = null; 
    clearFlag = true;
}

function numberAction() {
    if (display.textContent == 'Error') {
        actionButtons.forEach(button => button.addEventListener('click', operatorAction));
    }
    if (display.textContent.length == 6) {
        display.classList.add('sixDigit');
    } else if (display.textContent.length == 11) {
        return
    }
    // Не добавляем 0 если он уже на экране
    if (this.dataset.value == 0 && display.textContent == 0) {
        return
    }
    // Будем дублировать цифру на экран или конкатенировать к числу на экране?
    if (clearFlag) {
        display.classList.remove('sixDigit');
        display.textContent = this.dataset.value;
        clearFlag = false;
    } else {
        display.textContent += this.dataset.value;
    }
}

function operatorAction() {
    if (isNum(display.textContent)) {
        display.textContent = this.dataset.value;
        operator = this.dataset.value;
        clearFlag = true;
        return
    }
    if (!prevVal) {
        prevVal = display.textContent;
        clearFlag = true;
        display.textContent = this.dataset.value;
        operator = this.dataset.value;
        display.classList.remove('sixDigit');
    } else {
        curVal = display.textContent;
        clearFlag = true;
        operate();
        if (display.textContent == 'Error') {
            operator = null; 
            prevVal = null;
        } else {
            operator = this.dataset.value; 
            prevVal = display.textContent;
        }

    }
}

function undo() {
    let val = display.textContent;
    // если оператор - то верни предыдущее числовое значение
    if (isNum(val)) {
        display.textContent = prevVal;
        prevVal = null;
        clearFlag = false;
    // если выполнили operate нажатием на знак равенства - не откатываем, а сбрасываем к нулю
    } else if (!prevVal && !curVal) {
        display.textContent = 0;
        prevVal = 0;
        clearFlag = true;
    // если число многоразрядное - удаляем разряд
    } else if (val.toString().length > 1 && val !== 'Error') {
        display.textContent = val.toString().substring(0, val.length - 1);
    } else {
        // если оператор не был задан - значит откатываемся к нулю
        if (!operator) {
            display.textContent = 0;
            prevVal = 0;
            clearFlag = true;
        } else {
            // если оператор задан - откатываемся к нему
            display.textContent = operator;
            clearFlag = true;
            clearFlag = true;
        }
        
    }
}

function clear() {
    display.textContent = 0;
    resultVal = null;
    prevVal = null;
    curVal = null;
    operator = null; 
    clearFlag = true;
    display.classList.remove('sixDigit');
}

function isNum(val) {
    const arr = ['+', '-', '*', '/', '.'];
    for (let i = 0; i < arr.length; i++) {
        if (val == arr[i]) {
            return true
        }
    }
}

function divideByZeroError() {
    display.textContent = 'Error';
    actionButtons.forEach(button => button.removeEventListener('click', operatorAction));
    resultVal = null;
    prevVal = null;
    curVal = null;
    operator = null; 
    clearFlag = true;
}

function decimal() {
    if (isNum(display.textContent) || display.textContent == 'Error') {
        return
    }
    let arr = display.textContent.toString().split('');
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '.') {
            return
        }
    }
    display.textContent += '.';
    clearFlag = false;
}

// when user clicks numeric button activate function
numericButtons.forEach(button => button.addEventListener('click', numberAction));
actionButtons.forEach(button => button.addEventListener('click', operatorAction));
equalBtn.addEventListener('click', operate);
clearBtn.addEventListener('click', clear);
decimalBtn.addEventListener('click', decimal);
undoBtn.addEventListener('click', undo);

document.addEventListener('keydown', (event) => {
    let keyDown = document.querySelector("[data-value=\""+event.key+"\"]")
    if (event.key === 'Backspace' || event.key ==='c' || event.key === 'C') {
        clear()
    } else if (event.key === 'Enter') {
        operate()
    }
    if (keyDown) {
        keyDown.click()
    }
});