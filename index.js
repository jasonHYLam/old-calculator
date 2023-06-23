let display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals-button");
const clearButton = document.querySelector(".clear-button");

operatorButtons.forEach(e => e.disabled = true);
equalsButton.disabled = true;


let joinedDigits = 0;
let chosenNumber = "a";
let chosenOperator = function() {};
let answer = 0;

let digitArray = [];
let numbersArray = [];
let operatorArray = [];


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

function populateDisplay(displayText) {
    display.innerText += (displayText);
}

numberButtons.forEach(e => {
    const number = Number(e.innerText);
    e.addEventListener("click", function() {
        populateDisplay(number);
        digitArray.push(number);
        operatorButtons.forEach(e => e.disabled = false);
        equalsButton.disabled = false;
    });
});

operatorButtons.forEach(e => {
    e.addEventListener("click", function() {

        populateDisplay(e.innerText);
        fuseDigits();
        pushToNumberArray(joinedDigits);


        const output = operate(chosenOperator, numbersArray);
        if (output === "Please clear!") {
            display.innerText = "Result: Please clear!";
        }
        changeOperator(e);

        digitArray = [];
        
        operatorButtons.forEach(e => e.disabled = true);
        equalsButton.disabled = true;
    });
})

equalsButton.addEventListener("click", function() {
    clearDisplay();

    fuseDigits();
    pushToNumberArray(joinedDigits);
    display.innerText = "Result: " + operate(chosenOperator, numbersArray);
    console.log("Result: " + operate(chosenOperator, numbersArray));
    digitArray = [];
});

clearButton.addEventListener("click", function() {
    clearCalculator();
});

function clearCalculator() {
    digitArray = [];
    numbersArray = [];
    chosenOperator = function() {};
    display.innerText = "Result: ";
    operatorButtons.forEach(e => e.disabled = true);
    equalsButton.disabled = true;
    numberButtons.forEach(e => e.disabled = false);
}

function changeOperator(button) {
    const operator = button.innerText;
    switch(operator) {
        case "+":
            chosenOperator = add;
            break;
        case "-":
            chosenOperator = subtract;
            break;
        case "*":
            chosenOperator = multiply;
            break;
        case "/":
            chosenOperator = divide;
        console.log(chosenOperator);
    }
}


function operate(currentOperator, numbersArray) {
    
    const output = Math.round(numbersArray.reduce(currentOperator) * 1000) / 1000;
    if (output === Infinity || output === NaN) {
        clearCalculator();
        operatorButtons.forEach(e => e.disabled = true);
        equalsButton.disabled = true;
        numberButtons.forEach(e => e.disabled = true);
        return "Please clear!";

    } else {
        popFromNumberArray();
        console.log("current output is: " + output);
        pushToNumberArray(output);
        return output;
    }
}

function clearDisplay() {
    display.innerText = "Result: ";
}

function popOperatorArray() {
    operatorArray.shift();
}

function fuseDigits() {
        joinedDigits = Number(digitArray.toString().split(",").join(""));
    }

function pushToNumberArray(number) {
    numbersArray.push(number);
}

function popFromNumberArray() {
    numbersArray.splice(0, 2);
}
