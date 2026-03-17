export function checkThree(board, rows, cols) {
  let matchFound = false;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];

      if (
        candy1.src === candy2.src &&
        candy2.src === candy3.src &&
        !candy1.src.includes("Blank")
      ) {
        candy1.src = "./images/Blank.png";
        candy2.src = "./images/Blank.png";
        candy3.src = "./images/Blank.png";

        matchFound = true;
      }
    }
  }

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

        matchFound = true;
      }
    }
  }
  return matchFound;
}