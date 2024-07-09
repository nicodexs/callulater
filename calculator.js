const input = document.getElementById('input');
let operand = '';
let operator = '';
let forequal = false;

function numInput(num) {
    if (input.value === '0' || forequal) {
        input.value = num;
        forequal = false;
    } else {
        input.value += num;
    }
}

function appendOperator(operator) {
    const lastChar = input.value.slice(-1);
    if (!isNaN(lastChar) || lastChar === '.') {
        input.value += operator;
        operator = operator;
        operand = '';
    } else {
        input.value = input.value.slice(0, -1) + operator;
    }
    forequal = false;
}

function appendDecimal(dot) {
    const lastNumber = input.value;
    if (!lastNumber.includes(dot)) {
        input.value += dot;
    }
    forequal = false;
}

function toggleSign() {
    const currentValue = parseFloat(input.value);
    if (!isNaN(currentValue)) {
        input.value = (currentValue * -1).toString();
    }
    forequal = false;
}

function clearbtn() {
    input.value = '';
    operand = '';
    operator = '';
    forequal = false;
}

function dltbtn() {
  if (input.value.length === 5){
    input.value= '';
  }
    else if (input.value.length > 1) {
        input.value = input.value.slice(0, -1);
    } else {
        input.value = '';
    }
    forequal = false;
}

function calculateResult() {
    const currentValue = input.value;
        if (forequal && operator && operand) {
            const newvalue = currentValue + operator + operand;
            input.value = evaluateExpression(newvalue);
        } else if (currentValue.includes('%')) {
            const percent = parseFloat(currentValue) / 100;
            input.value = percent.toString();
        } else {
            const match = currentValue.match(/([\d\.]+)([\+\-\x\/])([\d\.]+)$/);
            if (match) {
                operand = match[3];
                operator = match[2];
                input.value = evaluateExpression(currentValue);
                forequal = true;
            } else {
                input.value = evaluateExpression(currentValue);
            }
        }
    } 
 

function evaluateExpression(expression) {
  expression = expression.replace(/x/g,'*');
        return new Function('return ' + expression)();

}