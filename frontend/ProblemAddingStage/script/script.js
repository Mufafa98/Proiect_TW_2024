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

document.getElementById("Add").addEventListener("click", async () => {
    const url = "http://127.0.0.1:3000/problems/";
    const title = document.getElementById("titleInput").value
    const chapter = document.getElementById("chapterInput").value
    const difficulty = document.getElementById("difficultySelector").value
    const description = document.getElementById("statementInput").value
    const solution = document.getElementById("solutionInput").value

    const data = {
        title: title,
        chapter: chapter,
        difficulty: difficulty,
        content: description,
        solution: solution,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });
    } catch (error) {
        console.error("Error:", error);
    }
    try {
        const response = await fetch(`${url}log`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });
    } catch (error) {
        console.error("Error:", error);
    }
})