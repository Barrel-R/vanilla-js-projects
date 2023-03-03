// this is a complete mess, tried to do it fast thinking it would be easy
// refactoring is not advisable
// start from scratch :)

let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let operations = {
    'sum': '+',
    'subtract': '-',
    'multiply': '*',
    'division': '/',
}

let result
let previousNumber
let currentNumber
let newNumber
let currentOperation

const operators = document.querySelectorAll('.operator-btn');
const resultElement = document.getElementById('result');
const clearElement = document.getElementById('clear');
const calculusElement = document.getElementById('calculus')
const equals = document.getElementById('equals');

clearElement.addEventListener('click', () => {
    clear()
})

numbers.forEach(number => {
    const num = document.getElementById(number)
    num.addEventListener('click', () => {
        if (!currentOperation) {
            currentNumber ? currentNumber += number.toString() : currentNumber = number.toString(); 
        } else {
            newNumber ? newNumber += number.toString() : newNumber = number.toString() 
        }
        updateResult()
        // console.log(`current number: ${currentNumber}, type: ${typeof(currentNumber)}`);
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        currentOperation = operator.id
        calculusElement.textContent = `${currentNumber} ${operations[currentOperation]}`
        previousNumber = currentNumber;
        currentNumber = 0
        resultElement.textContent = currentNumber
    })
})

equals.addEventListener('click', () => {
    switch(currentOperation) {
        case 'sum':
            sum()
            break;
    }
    calculusElement.textContent = `${previousNumber} ${operations[currentOperation]} ${newNumber} = `
})

function sum() {
    let sumResult;
    if (!result) {
        sumResult = parseInt(previousNumber) + parseInt(newNumber);
    } else {
        sumResult = parseInt(result) + parseInt(newNumber);
        previousNumber = parseInt(result);
        calculusElement.textContent = `${previousNumber} ${operations[currentOperation]} ${newNumber} = `
    }
    result = sumResult
    resultElement.textContent = result
}

function updateResult() {
    if (!newNumber) {
        result = currentNumber
    } else {
        result = newNumber
    }
    resultElement.textContent = result
}

function clear() {
    currentNumber = null;
    previousNumber = null;
    newNumber = null;
    result = 0;
    resultElement.textContent = 0;
    calculusElement.textContent = null;
}