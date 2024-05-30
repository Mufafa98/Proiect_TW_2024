import { initializeDashboard, loadElementMaxSize } from "./init.js";
import { showPopup } from "./popup.js"

export async function loadProblems() {
    const url = 'http://127.0.0.1:3000/problems/';
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        const result = await response.json();
        loadProblemsInPage(result);
        loadElementMaxSize()
        initializeDashboard()
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function loadProblemsById(id) {
    const url = `http://127.0.0.1:3000/problems?id=${id}`;
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        const result = await response.json();
        if (response.status === 457)
            showPopup("Problem not found");
        else {
            deleteProblemsFromPage()
            loadProblemsInPage(result);
            initializeDashboard()
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function loadProblemsInPage(problems) {
    const problemContainer = document.querySelector("#problems")

    for (let index = 0; index < problems.length; index++) {
        const element = problems[index];
        const problem = document.createElement("div")
        problem.id = "problem"
        const problemId = document.createElement("p")
        const problemTitle = document.createElement("p")
        const problemChapter = document.createElement("p")
        const problemDifficulty = document.createElement("p")

        problemId.classList.add("property")
        problemId.id = "Id"
        problemId.textContent = Number.parseInt(element.id)

        problemTitle.classList.add("property")
        problemTitle.id = "Title"
        problemTitle.textContent = element.Title

        problemChapter.classList.add("property")
        problemChapter.id = "Chapter"
        problemChapter.textContent = element.Chapter

        problemDifficulty.classList.add("property")
        problemDifficulty.id = "Difficulty"
        problemDifficulty.textContent = element.Difficulty

        problem.appendChild(problemId)
        problem.appendChild(problemTitle)
        problem.appendChild(problemChapter)
        problem.appendChild(problemDifficulty)

        problemContainer.appendChild(problem);
    }



}

function deleteProblemsFromPage() {
    const problems = document.querySelectorAll("#problem")
    for (let index = 0; index < problems.length; index++) {
        problems[index].remove();
    }
}