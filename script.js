//we use class to store all information for whatever is currently typed in the output div
//then set variables for the class, i used this
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()//since we want to clear all inputs and set them all to the default value
    }

    //defining our functions one after the other


    //clear our our different variables AC
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    //appendNumber is what's goig to happen every single time a user clicks on a number to add to the screen
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return //if the string of numbers include more than one period key,it will stop the function from executing any further
        this.currentOperand = this.currentOperand.toString() + number.toString() //so that we can add more than one number to the diplay
    }

    //happens anytime a user clicks on an operation such as + or - 
    chooseOperation(operation) { //so that if the first set of numbers are displayed on the currentoperand div,
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    //takes the values and computes a single value 
    compute() {
        let computation //we created a variable which is going to be the result of our equals button
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand) // we don't want the equals button to work if there's one or no number so we use an if statement to fix that
        if (isNaN(prev) || isNaN(current)) return // ||means or
        switch (this.operation) { //switch statement is a bunch of if statement chained after each other
            case '+': //we define our if statements using case, which is what .operation should equal
                computation = prev + current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break

            case '-':
                computation = prev - current
                break

            default: //else statement defined by a default which simply means if none of the if statement is met,the default will execute
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    //updates value inside output
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.previousOperand} ${this.operation}`
        }

    }
}



//we'll use data operations and numbers to see which part of the html we're actually using instead of using data numbers

const numberButtons = document.querySelectorAll('[data-number]')//query selector all will get us all elements that matches a certain string
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')// we won't use query selector all for this one so it'll select just it not multiple
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector
    ('[data-previous-operand]')
const currentOperandTextElement = document.querySelector
    ('[data-current-operand]')

//making all the different variables above to operate on our calculator
//you define classes by using new, followed by class name

const calculator = new Calculator(previousOperandTextElement,
    currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => { //this means we want something to happen when we click on any button
        calculator.appendNumber(button.innerText) //add whatever that is inside the button
        calculator.updateDisplay() //this way our display will be updated whenever we click on a button
    })
})


//doing the same thing for the operations button
operationButtons.forEach(button => {
    button.addEventListener('click', () => { //this means we want something to happen when we click on any button
        calculator.chooseOperation(button.innerText) //add whatever that is inside the button
        calculator.updateDisplay() //this way our display will be updated whenever we click on a button
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',  button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})