let boxes = document.querySelectorAll(".box");
let gameContainer = document.querySelector(".game-container");
let resetBtn = document.querySelector(".reset-btn");
let msgContainer = document.querySelector(".msg-container");
let newGameBtn = document.querySelector(".new-btn");
let winMsg = document.querySelector(".win-msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let moves = 0;

//selecting boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {  
        if (turnO) {
            turnO = false;
            const spanO =
            document.createElement("span");
            spanO.innerText = "O"
            box.appendChild(spanO);
            spanO.classList.add("color-o");
            //PlayerO
        } else {
            turnO = true;
            const spanX =
            document.createElement("span");
            spanX.innerText = "X"
            box.appendChild(spanX);
            spanX.classList.add("color-x");
            //PlayerX
        }
        box.disabled = true;
        moves++;
        checkDraw();
        checkWinner();
        
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

//reset game
const resetGame = () => {
    turnO = true;
    enableBoxes();
    moves = 0;
    msgContainer.classList.add("hide");
}

//winner phase
const gameWinner = (winner) => {
    msgContainer.classList.remove("hide");
    winMsg.innerText = `Congratulations! Player '${winner}' Win The Game!`;
}

//if draw
const checkDraw = () => {
    if (moves == 9) {
        msgContainer.classList.remove("hide");
        winMsg.innerText = `Match is Draw!`; 
    }
}

// winner check
const checkWinner = () => {
    for (let pattern of winPatterns) {

            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;
            
            if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
                if (pos1Val === pos2Val && pos1Val === pos3Val) {
                    disableBoxes();
                    gameWinner(pos1Val);
            } 
    }
    }
    
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

