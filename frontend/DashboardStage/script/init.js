export function initializeDashboard() {
    const menuButton = document.getElementById("menuButton").style;
    const searchBar = document.getElementById("searchBar").style;

    searchBar.marginLeft = getComputedStyle(
        document.getElementById("leftPadding"),
    ).width;

    searchBar.height = `${Number.parseInt(
        getComputedStyle(document.getElementById("mainHeader")).height,
    ) * 0.7
        }px`;

    menuButton.marginRight = getComputedStyle(
        document.getElementById("rightPadding"),
    ).width;

    resizeElements();
}



export function resizeElements() {
    const sumedMaxWidth =
        resizeToFit();

    const titleMaxSpace =
        document.getElementById("filters").getBoundingClientRect().width -
        sumedMaxWidth;
    resizeWidthToFitIn("#Title", titleMaxSpace);
}

let IdMax = 0;
let ChapterMax = 0;
let DifficultyMax = 0;

export function loadElementMaxSize() {
    let ids = document.querySelectorAll("#Id");
    for (let index = 0; index < ids.length; index++) {
        const elementWidth = ids[index].getBoundingClientRect().width;
        IdMax = Math.max(IdMax, elementWidth + 32);
    }
    ids = document.querySelectorAll("#Chapter");
    for (let index = 0; index < ids.length; index++) {
        const elementWidth = ids[index].getBoundingClientRect().width;
        ChapterMax = Math.max(ChapterMax, elementWidth + 32);
    }
    ids = document.querySelectorAll("#Difficulty");
    for (let index = 0; index < ids.length; index++) {
        const elementWidth = ids[index].getBoundingClientRect().width;
        DifficultyMax = Math.max(DifficultyMax, elementWidth + 32);
    }
}

function resizeToFit() {
    let ids = document.querySelectorAll("#Id");
    for (let index = 0; index < ids.length; index++) {
        ids[index].style.width = `${IdMax}px`;
    }
    ids = document.querySelectorAll("#Chapter");
    for (let index = 0; index < ids.length; index++) {
        ids[index].style.width = `${ChapterMax}px`;
    }
    ids = document.querySelectorAll("#Difficulty");
    for (let index = 0; index < ids.length; index++) {
        ids[index].style.width = `${DifficultyMax}px`;
    }

    return IdMax + ChapterMax + DifficultyMax;
}

function resizeWidthToFitIn(id, maxWidth) {
    const ids = document.querySelectorAll(id);
    for (let index = 0; index < ids.length; index++) {
        ids[index].style.width = `${maxWidth}px`;
    }
}

export function tempPageSwap() {
    localStorage.setItem("test1", "valoare mesaj doi");
    console.log(localStorage.getItem("test1"));
    //window.location.href = "../ProblemStage/Problem.html";
}

export function swapPage(problem) {
    console.log(problem.value);
}