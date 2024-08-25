const display = document.getElementById('display');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('.button');
let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay() {
    display.innerText = displayValue;
}

function updateHistory() {
    history.innerText = firstValue !== null ? `${firstValue} ${operator ? operator : ''}` : '';
}

function handleNumber(number) {
    if (waitingForSecondValue) {
        displayValue = number;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);
    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }
    waitingForSecondValue = true;
    operator = nextOperator;
    updateHistory();
    updateDisplay();
}

function calculate(first, second, operator) {
    if (operator === '+') return first + second;
    if (operator === '-') return first - second;
    if (operator === '×') return first * second;
    if (operator === '÷') return first / second;
    return second;
}

function handleFunction(fn) {
    if (fn === 'AC') {
        displayValue = '0';
        firstValue = null;
        operator = null;
        waitingForSecondValue = false;
    } else if (fn === '+/-') {
        displayValue = displayValue.charAt(0) === '-' ? displayValue.slice(1) : '-' + displayValue;
    } else if (fn === '%') {
        displayValue = `${parseFloat(displayValue) / 100}`;
    } else if (fn === 'sin') {
        displayValue = `${Math.sin(parseFloat(displayValue))}`;
    } else if (fn === 'cos') {
        displayValue = `${Math.cos(parseFloat(displayValue))}`;
    } else if (fn === 'tan') {
        displayValue = `${Math.tan(parseFloat(displayValue))}`;
    } else if (fn === 'ln') {
        displayValue = `${Math.log(parseFloat(displayValue))}`;
    } else if (fn === 'log') {
        displayValue = `${Math.log10(parseFloat(displayValue))}`;
    } else if (fn === '√') {
        displayValue = `${Math.sqrt(parseFloat(displayValue))}`;
    } else if (fn === 'x^y') {
        handleOperator('^');
    } else if (fn === 'x!') {
        displayValue = `${factorial(parseFloat(displayValue))}`;
    }
    updateHistory();
    updateDisplay();
}

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const { innerText: value } = button;
        if (button.classList.contains('number')) {
            handleNumber(value);
        } else if (button.classList.contains('operator')) {
            handleOperator(value);
        } else if (button.classList.contains('function')) {
            handleFunction(value);
        }
    });
});

updateDisplay();
updateHistory();
