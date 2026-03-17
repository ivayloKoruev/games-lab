export function processMatches() {
    let gameOver = false;

    if (gameOver) return;
    
      if (checkThree(board, rows, cols)) {
        score+=35;
        scoreScaleUI(scoreScale);
        document.getElementById("score").innerHTML = score;
    
        if (!gameOver && checkScore(score, targetScore)) {
          gameOver = true;
    
          clearInterval(gameInterval);
          showWinScreen(boardElement, thanksForPlaying);
    
          return true;
        }
    
        slideCandy(board, rows, cols);
        generateCandy(board, rows, cols, () => randomCandy(candies));
    
        setTimeout(processMatches);
      }
}