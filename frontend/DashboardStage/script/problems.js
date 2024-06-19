import { initializeDashboard, loadElementMaxSize } from "./init.js";
import { showPopup } from "./popup.js"

export async function loadProblems() {
    const url = 'http://127.0.0.1:3000/problems/';
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });

        const result = await response.json();
        loadProblemsInPage({
            data: result,
            found: true
        });
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
            method: 'GET',
            credentials: 'include'
        });

        const result = await response.json();
        const selector = document.getElementById("searchFilter");
        selector.value = "0";
        loadByFilter(result, "0")
        selector.addEventListener("change", () => {
            loadByFilter(result, selector.value);
        })

    } catch (error) {
        console.error('Error:', error);
    }
}


export async function loadByFilter(data, filter) {
    deleteProblemsFromPage()
    switch (filter) {
        case "0":
            loadProblemsInPage(data.byId)
            break;
        case "1":
            loadProblemsInPage(data.byTitle)
            break;
        case "2":
            loadProblemsInPage(data.byChapter)
            break;
        case "3":
            loadProblemsInPage(data.byDifficulty)
            break;
        default:
            break;
    }
    initializeDashboard()
}

function loadProblemsInPage(dataByFilter) {
    if (dataByFilter.found === false) {
        const problemContainer = document.querySelector("#problems")
        const errorMessage = document.createElement("div");
        errorMessage.id = "errorMessage";
        errorMessage.innerHTML = "No problems found";
        problemContainer.appendChild(errorMessage);
        return;
    }
    const problems = dataByFilter.data;
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
    const errorMessages = document.querySelectorAll("#errorMessage");
    for (let index = 0; index < errorMessages.length; index++) {
        errorMessages[index].remove();
    }
}

export function downloadProblems(problemsData) {
    const jsonString = JSON.stringify(problemsData)
    const dataToDownload = new Blob([jsonString], { type: "application/json" });
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(dataToDownload);
    anchor.download = "problems";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(anchor.href);
}