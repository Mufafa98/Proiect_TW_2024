import { init, unInitPopUp } from "./init.js";
import { runButton, backButton, subminButton, commentButton } from "./buttonLogic.js";

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", init);

document.getElementById("backButton").addEventListener("click", backButton);
document.getElementById("runButton").addEventListener("click", runButton);
document.getElementById("submitButton").addEventListener("click", subminButton);
document.getElementById("nextButton").addEventListener("click", () => {
    window.location.href = "./SolvingStage.html"
});
document.getElementById("commentButton").addEventListener("click", commentButton);
