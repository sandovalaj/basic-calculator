class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';   //created "variable" within the class
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    inputNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;    //only allow one period
        this.currentOperand = this.currentOperand.toString() + number.toString();   //convert to string to concatenate and not add as integers
    }

    inputOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const cur = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(cur)) return;

        switch (this.operation) {
            case '+':
                computation = prev + cur;
                break;
            case '-':
                computation = prev - cur;
                break;
            case '*':
                computation = prev * cur;
                break;
            case '/':
                computation = prev / cur;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
    
    display() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    keyPress(key) {
        switch (key) {
            case '.':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                this.inputNumber(key);
                break;
            case '=':
                this.inputOperation('+');
                break;
            case 'x':
                this.inputOperation('*');
                break;
            case '-':
            case '/':
                this.inputOperation(key);
                break;
            case 'Enter':
                this.compute();
                break;
            case 'Backspace':
                this.delete();
                break;
            case 'Delete':
                this.clear();
                break;
            default:
                return;
        }

        this.display();
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-allClear]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-prevOperand]');
const currentOperandTextElement = document.querySelector('[data-curOperand]');

const calculator = new Calculator (previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.inputNumber(button.innerText);
        calculator.display();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.inputOperation(button.innerText);
        calculator.display();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.display();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.display();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.display();
})

document.addEventListener('keyup', (event) => {
    calculator.keyPress(event.key);
  }, false);

