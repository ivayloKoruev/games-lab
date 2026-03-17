export function generateCandy(board, rows, cols, randomCandy) {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].src.includes("Blank")) {
        board[r][c].src = "./images/" + randomCandy() + ".png";
      }
    }
  }
}
