let candies = ["Brown", "BrownRed", "BrownWhite", "Green", "Pink", "PinkBlue"];
let board = [];
let rows = 9;
let cols = 9;
let score = 0;
let moves = 0;

let candyDragged = null;
let gameInterval = null;
let targetScore = 2000;

const okButton = document.querySelector(".okButton");
const settingsInfo = document.querySelector(".settingsInfo");
const title = document.querySelector(".title");
const buttonsClass = document.querySelector(".buttons");
const boardElement = document.getElementById("board");
const scoreClass = document.querySelector(".scoreClass");
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
  });

  okButton.addEventListener("click", function() {
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

  settingsButton.addEventListener("click", function() {
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

window.onload = function () {
  startGame();
  processMatches();
};

function processMatches() {
  if (checkMatch()) {
    // ако има съвпадения, първо премахваме, след това падаме и генерираме нови бонбони
    slideCandy();
    generateCandy();

    // извикваме отново след 200ms, за да браузърът успее да обнови DOM
    setTimeout(processMatches, 200);
  }
}

function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];

    for (let c = 0; c < cols; c++) {
      let candy = document.createElement("img");
      candy.id = r.toString() + "-" + c.toString();
      candy.src = "./images/" + randomCandy() + ".png";
      candy.draggable = true;

      candy.addEventListener("dragstart", (e) => {
        candyDragged = candy;
      });

      candy.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      candy.addEventListener("drop", (e) => {
        let droppedCandy = e.target;

        //проверяваме за съседни елеметни откъм 4те страни - ляво, дясно, горе и долу
        //взимаме id на колоните и редовете на елемента който придвижваме
        let draggedCoords = candyDragged.id.split("-");
        let draggedRow = parseInt(draggedCoords[0]);
        let draggedCol = parseInt(draggedCoords[1]);

        //взимаме id на колоните и редовете на съседния елемент
        let droppedCoords = droppedCandy.id.split("-");
        let droppedRow = parseInt(droppedCoords[0]);
        let droppedCol = parseInt(droppedCoords[1]);

        //взима дистанцията (id-то на елемента който придвижваме минус съседния му)
        let rowDiff = Math.abs(draggedRow - droppedRow);
        let colDiff = Math.abs(draggedCol - droppedCol);

        //проверяваме ако дистанцията е 0 или 1 но не повече, тогава може да ги размениш
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

          if (!gameInterval) {
            gameInterval = setInterval(() => {
              crushCandy();
              slideCandy();
              generateCandy();
            }, 100);
          }
        }
      });

      candy.addEventListener("dragend", (e) => {});

      document.getElementById("board").append(candy);
      row.push(candy);
    }
    board.push(row);
  }
}

function crushCandy() {
  checkMatch();
  document.getElementById("score").innerHTML = score;
}

function checkMatch() {
  let matchFound = false;
  //проверяваме редовете
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];

      if (
        candy1.src === candy2.src &&
        candy2.src === candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./images/Blank.png";
        candy2.src = "./images/Blank.png";
        candy3.src = "./images/Blank.png";
        score += 35;
        checkScore();
        scoreScale.classList.add("scale");

        setTimeout(() => {
          scoreScale.classList.remove("scale");
        }, 200);
        matchFound = true;
      }
    }
  }

  //проверяваме колоните
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];

      if (
        candy1.src === candy2.src &&
        candy2.src === candy3.src &&
        !candy1.src.includes("Blank")
      ) {
        candy1.src = "./images/Blank.png";
        candy2.src = "./images/Blank.png";
        candy3.src = "./images/Blank.png";
        score += 35;
        checkScore();
        scoreScale.classList.add("scale");

        setTimeout(() => {
          scoreScale.classList.remove("scale");
        }, 200);
        matchFound = true;
      }
    }
  }
  return matchFound;
}

function slideCandy() {
  for (let c = 0; c < cols; c++) {
    let index = rows - 1;

    for (let r = rows - 1; r >= 0; r--) {
      if (!board[r][c].src.includes("Blank")) {
        board[index][c].src = board[r][c].src;
        index -= 1;
      }
    }

    for (let r = index; r >= 0; r--) {
      board[r][c].src = "./images/Blank.png";
    }
  }
}

function generateCandy() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].src.includes("Blank")) {
        board[r][c].src = "./images/" + randomCandy() + ".png";
      }
    }
  }
}

function checkScore() {
    if (score >= targetScore) {
      setInterval(() => {
        boardElement.style.opacity = "0";

        setInterval(() => {
            boardElement.style.display = "none";
            thanksForPlaying.style.opacity = "1";
            thanksForPlaying.style.display = "flex";
        }, 1000);
      }, 800);
    }
}
