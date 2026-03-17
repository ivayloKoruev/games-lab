import { generateCandy } from "./generateCandy.js";
import { randomCandy } from "./randomCandy.js";
import { slideCandy } from "./slideCandy.js";
import { checkThree } from "./checkThree.js";
import { checkFour } from "./checkFour.js";
import { checkScore } from "./checkScore.js";
import { scoreScaleUI } from "./scoreScaleUI.js";
import { showWinScreen } from "./showWinScreen.js";

let candies = ["Brown", "BrownRed", "BrownWhite", "Green", "Pink", "PinkBlue"];
let board = [];
let rows = 9;
let cols = 9;
let score = 0;
let moves = 0;

let candyDragged = null;
let gameOver = false;
let targetScore = 2000;

const okButton = document.querySelector(".okButton");
const settingsInfo = document.querySelector(".settingsInfo");
const title = document.querySelector(".title");
const buttonsClass = document.querySelector(".buttons");
const boardElement = document.getElementById("board");
const thanksForPlaying = document.querySelector(".thanks");
const startButton = document.getElementById("startButton");
const infoButton = document.getElementById("infoButton");
const scoreDivElement = document.getElementById("scoreDiv");
document.getElementById("target").innerHTML = targetScore;
let scoreScale = document.querySelector(".scoreScale");

document.addEventListener("DOMContentLoaded", function () {
  const settingsButton = document.getElementById("settingsButton");
  const buttonAudio = document.getElementById("buttonAudio");
  const bgAudio = document.getElementById("audio");
  const textInfo = document.querySelector(".textInfo");
  const exitButton = document.querySelector(".backButton");

  startButton.addEventListener("click", function () {
    buttonAudio.play();
    setInterval(() => {
      bgAudio.play();
    }, 1000);

    title.classList.add("hide");
    title.style.opacity = "0";
    buttonsClass.classList.add("hide");
    textInfo.classList.add("hide");
    startButton.style.display = "none";
    infoButton.style.display = "none";

    boardElement.classList.add("show");
    scoreDivElement.style.opacity = "1";

    startGame();
    checkBeginning();

    setTimeout(checkBeginning);
  });

  okButton.addEventListener("click", function () {
    buttonAudio.play();
    settingsInfo.classList.remove("show");
    settingsButton.style.display = "flex";
    startButton.style.display = "flex";
    infoButton.style.display = "flex";
    title.classList.remove("hide");
  });

  infoButton.addEventListener("click", function () {
    startButton.style.display = "none";
    infoButton.style.display = "none";
    textInfo.classList.add("show");
    buttonAudio.play();
    title.classList.add("hide");
    settingsButton.style.display = "none";
  });

  settingsButton.addEventListener("click", function () {
    buttonAudio.play();
    settingsButton.style.display = "none";
    startButton.style.display = "none";
    infoButton.style.display = "none";
    title.classList.add("hide");
    settingsInfo.classList.add("show");
  });

  exitButton.addEventListener("click", function () {
    buttonAudio.play();
    textInfo.classList.remove("show");
    startButton.style.display = "flex";
    infoButton.style.display = "flex";
    title.classList.remove("hide");
    settingsButton.style.display = "flex";
  });
});

function checkBeginning() {
  if (checkThree(board, rows, cols)) {
    slideCandy(board, rows, cols);
    generateCandy(board, rows, cols, () => randomCandy(candies));
  }
}

function processMatches() {
  if (gameOver) return;

  if (checkFour(board, rows, cols)) {
    score += 70;
    scoreScaleUI(scoreScale);
    document.getElementById("score").innerHTML = score;

    slideCandy(board, rows, cols);
    generateCandy(board, rows, cols, () => randomCandy(candies));

    setTimeout(processMatches);
  } else if (checkThree(board, rows, cols)) {
    score += 35;
    scoreScaleUI(scoreScale);
    document.getElementById("score").innerHTML = score;

    slideCandy(board, rows, cols);
    generateCandy(board, rows, cols, () => randomCandy(candies));

    setTimeout(processMatches);
  }

  if (!gameOver && checkScore(score, targetScore)) {
    gameOver = true;

    showWinScreen(boardElement, thanksForPlaying);
    return true;
  }
}

function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];

    for (let c = 0; c < cols; c++) {
      let candy = document.createElement("img");
      candy.id = r.toString() + "-" + c.toString();
      candy.src = "./images/" + randomCandy(candies) + ".png";
      candy.draggable = true;

      candy.addEventListener("dragstart", (e) => {
        candyDragged = candy;
      });

      candy.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      candy.addEventListener("drop", (e) => {
        let droppedCandy = e.target;

        let draggedCoords = candyDragged.id.split("-");
        let draggedRow = parseInt(draggedCoords[0]);
        let draggedCol = parseInt(draggedCoords[1]);

        let droppedCoords = droppedCandy.id.split("-");
        let droppedRow = parseInt(droppedCoords[0]);
        let droppedCol = parseInt(droppedCoords[1]);

        let rowDiff = Math.abs(draggedRow - droppedRow);
        let colDiff = Math.abs(draggedCol - droppedCol);

        if (
          (rowDiff === 1 && colDiff === 0) ||
          (rowDiff === 0 && colDiff === 1)
        ) {
          let temp = droppedCandy.src;

          droppedCandy.src = candyDragged.src;
          candyDragged.src = temp;

          candyDragged = null;
          moves++;
          document.getElementById("moves").innerHTML = moves;
          let candyAudio = document.getElementById("candyAudio");
          candyAudio.play();

          processMatches();
        }
      });

      candy.addEventListener("dragend", (e) => {});

      document.getElementById("board").append(candy);
      row.push(candy);
    }
    board.push(row);
  }
}
