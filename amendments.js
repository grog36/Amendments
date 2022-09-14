//Gregory Ecklund
//September 2022

//Variables
let answerLocationNumber;
let score = 0;

const AMENDMENTS = {
    "1": "Guarantees the right to the freedoms of speech, press, and religion. Protects the right to petition the government.",
    "2": "Guarantees the people's right to own and bear arms for their defense.",
    "3": "Citizens cannot be forced to quarter soldiers during times of peace.",
    "4": "Citizens cannot be forced to subject themselves to seizure and search without a search warrant and probable cause.",
    "5": "Prohibits abuse of governmental authority in legal procedures. Establishes rules for indictment by eminent domain and grand jury. Guarantees the due process rights. Protects citizens from self-incrimination and double jeopardy.",
    "6": "Guarantees fair and speedy jury trial and the rights to know the accusation, the accuser, and to find counsel and witnesses.",
    "7": "Reserves individuals' rights to jury trial depending on the civil case, and cases already examined by not be reopened by another court.",
    "8": "Forbids exorbitant bails and fines and punishment that is unusual or cruel.",
    "9": "Reserves the rights of citizens which are not specifically mentioned by the U.S. Constitution.",
    "10": "Reserves powers that are not given to the U.S. government under the Constitution, nor prohibited to a State of the U.S., to the people and the States.",
    "11": "State sovereign immunity. States are protected from suits by citizens living in another state or foreigners that do not reside within the state borders.",
    "12": "Modifies and clarifies the procedure for electing vice-presidents and presidents.",
    "13": "Except as punishment for criminal offense, forbids forced-slavery and involuntary servitude.",
    "14": "Details Equal Protection Clause, Due Process Clause, Citizenship Cause, and clauses dealing with the Confederacy and its officials.",
    "15": "Reserves citizens the suffrage rights regardless of their race, color, or previous slave status.",
    "16": "Reserves the U.S. government the right to tax income.",
    "17": "Establishes popular voting as the process under which senators are elected.",
    "18": "Denies the sale and consumption of alcohol.",
    "19": "Reserves women's suffrage rights.",
    "20": "Also known as the \"lame duck amendment,\" establishes date of term starts for Congress (January 3) & the President (January 20).",
    "21": "Details the repeal of the Eighteenth Amendment. State laws over alcohol are to remain.",
    "22": "Limit the terms that an individual can be elected as president (at most two terms). Individuals who have served over two years of someone else's term may not be elected more than once.",
    "23": "Reserves the right of citizens residing in the Disctrict of Columbia to vote for their own Electors for presidential elections.",
    "24": "Citizens cannot be denied the suffrage rights for not paying a poll tax or any other taxes.",
    "25": "Establishes the procedures for a successor of a President.",
    "26": "Reserves the right for citizens 18 and older to vote.",
    "27": "Denies any laws that vary the salaries of Congress members until the beginning of the next terms of office for Representatives."
};

const DOCELEMENTS = {
    "answerButton1": document.getElementById("answerButton1"),
    "answerButton2": document.getElementById("answerButton2"),
    "answerButton3": document.getElementById("answerButton3"),
    "answerButton4": document.getElementById("answerButton4"),
    "seconds": document.getElementById("seconds"),
    "minutes": document.getElementById("minutes"),
    "secondsLabel": document.getElementById("secondsLabel"),
    "minutesLabel": document.getElementById("minutesLabel"),
    "startButton": document.getElementById("startButton"),
    "retryButton": document.getElementById("retryButton"),
    "questions": document.getElementById("questions"),
    "giveUpButton": document.getElementById("giveUpButton")
};

let questionList = [];
let answerList = [];
for (let law in AMENDMENTS) {
    answerList.push(law);
    questionList.push(AMENDMENTS[law]);
}
let temporaryQuestionList = [...questionList];
let temporaryAnswerList = [...answerList];
let total = questionList.length;

//Start Function
function start() {
    DOCELEMENTS["answerButton1"].style.visibility = "visible";
    DOCELEMENTS["answerButton2"].style.visibility = "visible";
    DOCELEMENTS["answerButton3"].style.visibility = "visible";
    DOCELEMENTS["answerButton4"].style.visibility = "visible";
    DOCELEMENTS["seconds"].style.visibility = "visible";
    DOCELEMENTS["minutes"].style.visibility = "visible";
    DOCELEMENTS["secondsLabel"].style.visibility = "visible";
    DOCELEMENTS["minutesLabel"].style.visibility = "visible";
    DOCELEMENTS["startButton"].style.visibility = "hidden";
    DOCELEMENTS["questions"].style.visibility = "visible";
    DOCELEMENTS["giveUpButton"].style.visibility = "visible";
    nextQuestion();
    continueTimer();
}

//Displays the "You Win" Screen
function youWin() {
    DOCELEMENTS["retryButton"].style.visibility = "visible";
    DOCELEMENTS["retryButton"].innerHTML = "New Game?"
    DOCELEMENTS["answerButton1"].style.visibility = "hidden";
    DOCELEMENTS["answerButton2"].style.visibility = "hidden";
    DOCELEMENTS["answerButton3"].style.visibility = "hidden";
    DOCELEMENTS["answerButton4"].style.visibility = "hidden";
    DOCELEMENTS["giveUpButton"].style.visibility = "hidden";
    DOCELEMENTS["questions"].innerHTML = `You win! Score: (${score}/${total})`
    DOCELEMENTS["questions"].style.color = "black";
    document.body.style.background = "green";
    stopTimer();
}

//Refreshes Page When "retryButton" is Pressed
function retry() {
    location.reload();
}

//Updates Screen with Next Question or Win/Lose Screen
function nextQuestion() {
    let answerChoice1;
    let answerChoice2;
    let answerChoice3;
    let answerChoice4;

    if (temporaryQuestionList.length === 0) {
        youWin();
    }
    else {
        let index = randomNumber(0, (temporaryQuestionList.length - 1));
        let question = temporaryQuestionList[index];
        let answer = temporaryAnswerList[index];
        answerLocationNumber = randomNumber(1, 4);
        temporaryAnswerList.splice(index, 1);
        temporaryQuestionList.splice(index, 1);
        DOCELEMENTS["questions"].innerHTML = question;

        if (answerLocationNumber == 1) {
            answerChoice1 = answer
        }
        else {
            answerChoice1 = answerList[randomNumber(0, (answerList.length - 1))];
            while (answerChoice1 == answer) {
                answerChoice1 = answerList[randomNumber(0, (answerList.length - 1))];
            }
        }
        if (answerLocationNumber == 2) {
            answerChoice2 = answer
        }
        else {
            answerChoice2 = answerList[randomNumber(0, (answerList.length - 1))];
            while (answerChoice2 == answer || answerChoice2 == answerChoice1) {
                answerChoice2 = answerList[randomNumber(0, (answerList.length - 1))];
            }
        }
        if (answerLocationNumber == 3) {
            answerChoice3 = answer
        }
        else {
            answerChoice3 = answerList[randomNumber(0, (answerList.length - 1))];
            while (answerChoice3 == answer || answerChoice3 == answerChoice2 || answerChoice3 == answerChoice1) {
                answerChoice3 = answerList[randomNumber(0, (answerList.length - 1))];
            }
        }
        if (answerLocationNumber == 4) {
            answerChoice4 = answer
        }
        else {
            answerChoice4 = answerList[randomNumber(0, (answerList.length - 1))];
            while (answerChoice4 == answer || answerChoice4 == answerChoice1 || answerChoice4 == answerChoice2 || answerChoice4 == answerChoice3) {
                answerChoice4 = answerList[randomNumber(0, (answerList.length - 1))];
            }
        }

        DOCELEMENTS["answerButton1"].innerHTML = answerChoice1
        DOCELEMENTS["answerButton2"].innerHTML = answerChoice2
        DOCELEMENTS["answerButton3"].innerHTML = answerChoice3
        DOCELEMENTS["answerButton4"].innerHTML = answerChoice4
    }
}

//Displays the "You Lose" Screen
function youLose() {
    DOCELEMENTS["retryButton"].style.visibility = "visible";
    DOCELEMENTS["answerButton1"].style.visibility = "hidden";
    DOCELEMENTS["answerButton2"].style.visibility = "hidden";
    DOCELEMENTS["answerButton3"].style.visibility = "hidden";
    DOCELEMENTS["answerButton4"].style.visibility = "hidden";
    DOCELEMENTS["giveUpButton"].style.visibility = "hidden";
    DOCELEMENTS["questions"].innerHTML = `You Lose! Score: (${score}/${total})`;
    DOCELEMENTS["questions"].style.color = "black";
    document.body.style.background = "red";
    stopTimer();
}

/**
 * Checks whether the user's answer choice is incorrect or correct.
 * @param {Number} answerChoice The position of the answer choice the user guesses.
 */
function checkAnswer(answerChoice) {
    if (answerChoice === answerLocationNumber) {
        score++;
        nextQuestion();
    }
    else {
        youLose();
    }
}

/**
 * Creates and returns a random number within the range of (min, max) (inclusive).
 * @param {Number} min The minimum value for the range (inclusive).
 * @param {Number} max The maximum value for the range (inclusive).
 * @returns A random number between min and max (inclusive).
 */
function randomNumber(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

//Timer Stuff
let timeout;
let seconds = 0;
let minutes = 0;
function timer() {
    seconds++;
    if (seconds >= 60) {
        minutes++;
        seconds -= 60;
    }
    DOCELEMENTS["minutes"].innerHTML = minutes;
    DOCELEMENTS["seconds"].innerHTML = seconds;
    continueTimer();
}
function continueTimer() {
    timeout = setTimeout(timer, 1000);
}
function stopTimer() {
    clearTimeout(timeout);
}
