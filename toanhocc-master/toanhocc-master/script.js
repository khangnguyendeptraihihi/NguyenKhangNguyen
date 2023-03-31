document.addEventListener("DOMContentLoaded", function () {

    let buttons = document.getElementsByTagName("button");

    document.getElementById("answer-box").addEventListener("keydown", function (event) {
        if (event.key == "Enter") {
            checkAnswer();
        }
    })

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }
    runGame("Cộng");
});

function runGame(gameType) {

    document.getElementById("answer-box").value = ""; 
    document.getElementById("answer-box").focus();

    let num1 = Math.floor(Math.random() * 50) + 1;
    let num2 = Math.floor(Math.random() * 50) + 1;
    if (gameType === "Cộng") {
        displayAdditionQuestion(num1, num2);
    }
    else if (gameType === "Trừ") {
        displaySubtractQuestion(num1, num2);
    }
    else if (gameType === "Nhân") {
        displayMultiplyQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type ${gameType}, aborting`;
    }

}


function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateRightAnswer(); // calculatedAnswer is an array
    let isCorrect = userAnswer === calculatedAnswer[0]; // isCorrect has a true or false value

    if (isCorrect) {
        alert("Này! Bạn đã trả lời đúng rồi :D");
        incrementScore();
    }
    else {
        alert(`Awww ... Bạn đã trả lời là: ${userAnswer}, Đây mới là đáp án đúng: ${calculatedAnswer[0]} :<`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

function calculateRightAnswer() {

    // Gets the operands (the numbers) and the operator (plus, minus sign etc.)
    // directly from the DOM

    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") { // This is the addition game
        return [operand1 + operand2, "Cộng"]; // return an array containing the correct answer and game type
    }
    else if (operator === "-") { // This is the subtraction game
        return [operand1 - operand2, "Trừ"]; // return an array containing the correct answer and game type
    }
    else if (operator === "x") { // This is the subtraction game
        return [operand1 * operand2, "Nhân"]; // return an array containing the correct answer and game type
    }
    else {
        alert(`Unimplemented operator: ${operator}`);
        throw `Unimplemented operator ${operator}, aborting`;
    }
}

function incrementScore() {
    // Gets the current score from the DOM and increments it

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

function incrementWrongAnswer() {
    // Gets the current tally of incorrect answers from the DOM and increments it

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

// Displays the questions.

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}
