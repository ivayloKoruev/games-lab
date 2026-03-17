export function checkFour(board, rows, cols) {
  let matchFound = false;
  let combo = document.querySelector(".combo");

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 3; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      let candy4 = board[r][c + 3];

      if (
        candy1.src === candy2.src &&
        candy2.src === candy3.src && 
        candy4.src === candy3.src &&
        !candy1.src.includes("Blank")
      ) {
        combo.style.opacity = "1";
        combo.classList.add("scale");
        combo.classList.add("translate");

        setTimeout(() => {
          combo.classList.remove("scale");
          combo.classList.remove("translate");
          combo.style.opacity = "0";
        }, 500);

        candy1.src = "./images/Blank.png";
        candy2.src = "./images/Blank.png";
        candy3.src = "./images/Blank.png";
        candy4.src = "./images/Blank.png";

        matchFound = true;
      }
    }
  }

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows - 3; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      let candy4 = board[r + 3][c];

      if (
        candy1.src === candy2.src &&
        candy2.src === candy3.src &&
        candy4.src === candy3.src &&
        !candy1.src.includes("Blank")
      ) {
        combo.style.opacity = "1";
        combo.classList.add("scale");
        combo.classList.add("translate");

        setTimeout(() => {
          combo.classList.remove("scale");
          combo.classList.remove("translate");
          combo.style.opacity = "0";
        }, 500);

        candy1.src = "./images/Blank.png";
        candy2.src = "./images/Blank.png";
        candy3.src = "./images/Blank.png";
        candy4.src = "./images/Blank.png";

        matchFound = true;
      }
    }
  }
  return matchFound;
}
