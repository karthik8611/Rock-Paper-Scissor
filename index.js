//Buttons
const rulesBtn = document.querySelectorAll(".rules-btn");
const nextBtn = document.getElementById("next-btn");
const playAgainBtn = document.querySelector("#play-again");
const replayBtn = document.querySelector("#replay");
const closeModalBtn = document.getElementById("close");

//rules View
const rulesView = document.getElementById("rules-View");

//Won Game
const wonGame = document.querySelector(".won-game");

//Play Board
const playBoard = document.getElementById("play-board");

//ResultBoard
const resultBoard = document.getElementById("result-board");
const userResult = document.querySelector(".user-result");
const pcResult = document.querySelector(".pc-result");
let resultText = document.getElementById("result-text-1");
let resultText2 = document.getElementById("result-text-2");
let picked = document.querySelectorAll(".picked");

//Score Board
const computerScore = document.getElementById("computer-score");
const userScore = document.getElementById("user-score");

//score

let score = {
    user: 0,
    computer: 0,
};


if (localStorage.getItem("score")) {
    score = JSON.parse(localStorage.getItem("score"));
}

userScore.innerHTML = score.user;
computerScore.innerHTML = score.computer;


// RESULT 

const result = {
    WIN: "YOU WIN",
    LOST: "YOU LOST",
    TIEUP: "TIE UP",
};

// EVENT LISTENERS


rulesBtn.forEach((element) => {
    element.addEventListener("click", () => {
        rulesView.style.display = "block";
    });
});

closeModalBtn.addEventListener("click", () => {
    rulesView.style.display = "none";
});

nextBtn.addEventListener("click", () => {
    playBoard.style.display = "none";
    resultBoard.style.display = "none";
    wonGame.style.display = "flex";
});

playAgainBtn.addEventListener("click", playAgain);

replayBtn.addEventListener("click", playAgain);


//functions

// function for playing again
function playAgain() {
    playBoard.style.display = "grid";
    resultBoard.style.display = "none";
    wonGame.style.display = "none";
    nextBtn.style.display = "none";
}



// computer Picks
const computer = ["rock", "paper", "scissor"];


// fuction fo pc picking, computer picks randomly
function computerPicked() {
    let picked = Math.floor(Math.random() * computer.length);
    return computer[picked];
}

function setImg(picked) {
    let img = `<img src="./images/${picked}.png" alt=${picked} width="60px"/>`;
    return img;
}

function setStyles() {

    resultBoard.style.marginTop = "3rem";

    picked.forEach((element) => {
        element.style.top = "300px";
    });

    for (let index = 0; index < 3; index++) {
        userResult.classList.remove("rock-div");
        userResult.classList.remove("paper-div");
        userResult.classList.remove("scissor-div");
        pcResult.classList.remove("rock-div");
        pcResult.classList.remove("paper-div");
        pcResult.classList.remove("scissor-div");

        playAgainBtn.style.display = "block";
        resultText2.style.display = "block";
        replayBtn.style.display = "none";
        nextBtn.style.display = "none";
    }
}

// Game Logic

const startGame = (userPicked) => {

    let pcPicked = computerPicked();

    setStyles();

    let res;
    // both user and pc picked the same  so result will be tied
    if (userPicked === pcPicked) {

        res = result.TIEUP;

        removeShow();

        playAgainBtn.style.display = "none";
        replayBtn.style.display = "block";
        resultText2.style.display = "none";

        picked.forEach((element) => {
            element.style.top = "256px";
        });

        resultBoard.style.marginTop = "6rem";

        // codition for  user winning case 
    } else if (
        (userPicked === "rock" && pcPicked === "scissor") ||
        (userPicked === "paper" && pcPicked === "rock") ||
        (userPicked === "scissor" && pcPicked === "paper")
    ) {
        res = result.WIN;

        nextBtn.style.display = "block";

        UserWin();

        
        score.user++;// increasing user score

// otherwise pc will win
    } else {
        res = result.LOST;

        PCWin();

        
        score.computer++;// increamenting pc score

    }
    playBoard.style.display = "none";
    resultBoard.style.display = "flex";

    // result board 
    userResult.classList.add(`${userPicked}-div`);
    pcResult.classList.add(`${pcPicked}-div`);
    userResult.innerHTML = setImg(userPicked);
    pcResult.innerHTML = setImg(pcPicked);
    resultText.innerHTML = res;

    // score board
    userScore.innerHTML = score.user;
    computerScore.innerHTML = score.computer;


// score will be stored in local storage
    localStorage.setItem("score", JSON.stringify(score));
};


// game end


// Winner Boxes

let UserBox1 = document.querySelector(".user-box-1");
let UserBox2 = document.querySelector(".user-box-2");
let UserBox3 = document.querySelector(".user-box-3");
let PcBox1 = document.querySelector(".pc-box-1");
let PcBox2 = document.querySelector(".pc-box-2");
let PcBox3 = document.querySelector(".pc-box-3");

let UserWin = () => {
    PcBox1.classList.remove("winner-box-1");
    PcBox2.classList.remove("winner-box-2");
    PcBox3.classList.remove("winner-box-3");

    UserBox1.classList.add("winner-box-1");
    UserBox2.classList.add("winner-box-2");
    UserBox3.classList.add("winner-box-3");
};
let PCWin = () => {
    UserBox1.classList.remove("winner-box-1");
    UserBox2.classList.remove("winner-box-2");
    UserBox3.classList.remove("winner-box-3");

    PcBox1.classList.add("winner-box-1");
    PcBox2.classList.add("winner-box-2");
    PcBox3.classList.add("winner-box-3");
};

let removeShow = () => {
    UserBox1.classList.remove("winner-box-1");
    UserBox2.classList.remove("winner-box-2");
    UserBox3.classList.remove("winner-box-3");

    PcBox1.classList.remove("winner-box-1");
    PcBox2.classList.remove("winner-box-2");
    PcBox3.classList.remove("winner-box-3");
};

