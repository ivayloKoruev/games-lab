export function showWinScreen(boardElement, thanksForPlaying) {
    setTimeout(() => {
      boardElement.style.opacity = "0";
      thanksForPlaying.style.opacity = "0";
      
      setTimeout(() => {
        boardElement.style.display = "none";
        thanksForPlaying.style.opacity = "1";
        thanksForPlaying.style.display = "flex";
      }, 1000);
    }, 800);
};