import { initializeDashboard, loadElementMaxSize } from "./init.js";
import { showPopup } from "./popup.js";

let set = false;

export async function loadUsers() {
    deleteProblemsFromPage()
    const url = "http://127.0.0.1:3000/leaderboard?category=All&difficulty=All";
    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
        });

        const result = await response.json();
        loadUsersInPage({
            data: result,
            found: true
        });
        if (!set) {
            loadElementMaxSize()
            set = true;
        }
        initializeDashboard()
    } catch (error) {
        console.error('Error:', error);
    }
    initializeDashboard()
}

export async function loadUsersBy(category, difficulty, searchBar) {
    deleteProblemsFromPage()
    let url = `http://127.0.0.1:3000/leaderboard?category=${category}&difficulty=${difficulty}`;
    if (searchBar !== "" && searchBar !== "Search User")
        url += `&id=${searchBar}`
    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
        });

        const result = await response.json();
        loadUsersInPage({
            data: result,
            found: true
        });
        if (!set) {
            loadElementMaxSize()
            set = true;
        }
        initializeDashboard()
    } catch (error) {
        console.error('Error:', error);
    }
    initializeDashboard()
}

export async function loadProblemsById(id) {
    const url = `http://127.0.0.1:3000/leaderboard?category=All&difficulty=All&id=${id}`;
    console.log(url);
    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
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
            loadUsersInPage({
                found: data.found,
                data: data.data.byId
            })
            break;
        case "1":
            loadUsersInPage({
                found: data.found,
                data: data.data.byUsername
            })
            break;
        default:
            break;
    }
    initializeDashboard()
}

function loadUsersInPage(dataByFilter) {
    console.log(dataByFilter);
    if (dataByFilter.found === false) {
        const userContainer = document.querySelector("#users")
        const errorMessage = document.createElement("div");
        errorMessage.id = "errorMessage";
        errorMessage.innerHTML = "No users found";
        userContainer.appendChild(errorMessage);
        return;
    }
    //const users = dataByFilter.data;
    const users = dataByFilter.data.data;
    const userContainer = document.querySelector("#users")

    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        const user = document.createElement("div");
        user.id = "user";
        const userUid = document.createElement("p");
        const userUsername = document.createElement("p");
        const userTotal = document.createElement("p");
        const userSuccess = document.createElement("p");

        userUid.classList.add("property");
        userUid.id = "Uid";
        userUid.textContent = Number.parseInt(element.userId);

        userUsername.classList.add("property");
        userUsername.id = "Username";
        if (element.Username.length > 20)
            userUsername.textContent = `${String(element.Username).slice(0, 20)}[..]`;
        else
            userUsername.textContent = String(element.Username)
        userTotal.classList.add("property");
        userTotal.id = "TotalProblems";
        userTotal.textContent = element.totalProblemsSolved;

        userSuccess.classList.add("property");
        userSuccess.id = "SuccessRate";
        userSuccess.textContent = `${Number.parseFloat(element.SuccessRate) * 100}%`;

        user.appendChild(userUid);
        user.appendChild(userUsername);
        user.appendChild(userTotal);
        user.appendChild(userSuccess);

        userContainer.appendChild(user);
    }
}

export function deleteProblemsFromPage() {
    const problems = document.querySelectorAll("#user")
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
