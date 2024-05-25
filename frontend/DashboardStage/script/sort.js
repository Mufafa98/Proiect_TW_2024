
const sortOrder = { Asc: 1, Desc: 2 };

let sortByIdOrder = sortOrder.Asc;
let sortByTitleOrder = sortOrder.Asc;
let sortByDifficultyOrder = sortOrder.Asc;
let sortByChapterOrder = sortOrder.Asc;

export function sortByID() {
    const container = document.getElementById("problems");
    const items = container.querySelectorAll("#problem");
    const itemsArray = Array.from(items);

    itemsArray.sort((a, b) => {
        const idA = Number.parseInt(a.querySelector("#Id").textContent);
        const idB = Number.parseInt(b.querySelector("#Id").textContent);
        switch (sortByIdOrder) {
            case sortOrder.Asc:
                return idA - idB;
            case sortOrder.Desc:
                return idB - idA;
            default:
                break;
        }
    });
    if (sortByIdOrder === sortOrder.Asc) {
        sortByIdOrder = sortOrder.Desc;
    } else if (sortByIdOrder === sortOrder.Desc) {
        sortByIdOrder = sortOrder.Asc;
    }

    container.innerHTML = "";
    for (let index = 0; index < itemsArray.length; index++) {
        const element = itemsArray[index];
        container.appendChild(element);
    }
}

export function sortByTitle() {
    const container = document.getElementById("problems");
    const items = container.querySelectorAll("#problem");
    const itemsArray = Array.from(items);

    itemsArray.sort((a, b) => {
        const idA = a.querySelector("#Title").textContent;
        const idB = b.querySelector("#Title").textContent;
        switch (sortByTitleOrder) {
            case sortOrder.Asc:
                return idA.localeCompare(idB);
            case sortOrder.Desc:
                return idB.localeCompare(idA);
            default:
                break;
        }
    });
    if (sortByTitleOrder === sortOrder.Asc) {
        sortByTitleOrder = sortOrder.Desc;
    } else if (sortByTitleOrder === sortOrder.Desc) {
        sortByTitleOrder = sortOrder.Asc;
    }

    container.innerHTML = "";
    for (let index = 0; index < itemsArray.length; index++) {
        const element = itemsArray[index];
        container.appendChild(element);
    }
}

export function sortByChapter() {
    const container = document.getElementById("problems");
    const items = container.querySelectorAll("#problem");
    const itemsArray = Array.from(items);

    itemsArray.sort((a, b) => {
        const idA = a.querySelector("#Chapter").textContent;
        const idB = b.querySelector("#Chapter").textContent;
        switch (sortByChapterOrder) {
            case sortOrder.Asc:
                return idA.localeCompare(idB);
            case sortOrder.Desc:
                return idB.localeCompare(idA);
            default:
                break;
        }
    });
    if (sortByChapterOrder === sortOrder.Asc) {
        sortByChapterOrder = sortOrder.Desc;
    } else if (sortByChapterOrder === sortOrder.Desc) {
        sortByChapterOrder = sortOrder.Asc;
    }

    container.innerHTML = "";
    for (let index = 0; index < itemsArray.length; index++) {
        const element = itemsArray[index];
        container.appendChild(element);
    }
}

export function sortByDifficulty() {
    const container = document.getElementById("problems");
    const items = container.querySelectorAll("#problem");
    const itemsArray = Array.from(items);

    itemsArray.sort((a, b) => {
        const idA = a.querySelector("#Difficulty").textContent;
        const idB = b.querySelector("#Difficulty").textContent;
        switch (sortByDifficultyOrder) {
            case sortOrder.Asc:
                return compareDifficulty(idA, idB);
            case sortOrder.Desc:
                return compareDifficulty(idB, idA);
            default:
                break;
        }
    });
    if (sortByDifficultyOrder === sortOrder.Asc) {
        sortByDifficultyOrder = sortOrder.Desc;
    } else if (sortByDifficultyOrder === sortOrder.Desc) {
        sortByDifficultyOrder = sortOrder.Asc;
    }

    container.innerHTML = "";
    for (let index = 0; index < itemsArray.length; index++) {
        const element = itemsArray[index];
        container.appendChild(element);
    }
}

function compareDifficulty(a, b) {
    if (a === b) return 0;
    if (a === "Easy") {
        return -1;
    }
    if (a === "Medium") {
        if (b === "Easy") {
            return 1;
        }
        if (b === "Hard") {
            return -1;
        }
    }
    if (a === "Hard") {
        return 1;
    }
}
