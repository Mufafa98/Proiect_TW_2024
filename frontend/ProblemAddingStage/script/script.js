import { chapterField, solutionField, statementField, titleField } from "./fieldAnimations.js";
import { initSelectorScreen } from "./init.js"

window.addEventListener("DOMContentLoaded", initSelectorScreen);
window.addEventListener("resize", initSelectorScreen);

titleField()
chapterField()
statementField()
solutionField()

document.getElementById("Home").addEventListener("click", () => {
    window.location.href = "../DashboardStage/Dashboard.html";
})

document.getElementById("Start").addEventListener("click", () => {
    localStorage.setItem("chapterSelector", document.getElementById("chapterSelector").value);
    localStorage.setItem("difficultySelector", document.getElementById("difficultySelector").value);
    window.location.href = "../SolvingStage/SolvingStage.html";
})