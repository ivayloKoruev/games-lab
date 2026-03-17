export function scoreScaleUI(scoreScale) {

    scoreScale.classList.add("scale");

    setTimeout(() => {
      scoreScale.classList.remove("scale");
    }, 200);
}