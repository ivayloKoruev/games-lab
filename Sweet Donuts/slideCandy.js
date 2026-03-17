export function slideCandy(board, cols, rows) {
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