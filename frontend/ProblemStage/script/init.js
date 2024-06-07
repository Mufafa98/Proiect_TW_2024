import { getProblemData } from "./problem.js";



export async function init() {
    try {
        const response = await fetch("http://127.0.0.1:3000/protected", {
            method: 'GET',
            credentials: 'include'
        });
        if (response.status !== 200) {
            window.location.href = "../HomeScreen/homescreen.html";
            return;
        }
        console.log(response.status)
    } catch (error) {
        console.error('Error:', error);
    }
    const problemId = localStorage.getItem("selectedProblem")
    const problemData = (await getProblemData(problemId)).at(0);
    const problemText = document.getElementById("problemStatement");
    const problemTitle = document.getElementById("problemTitle")
    problemText.innerHTML = problemData.content;
    problemTitle.innerHTML = problemData.Title;

    const problemSolution = document.getElementById("problemSolution");
    const statementContainer = document.getElementById("statement");
    const solutionContainer = document.getElementById("solution");
    const inOutContainer = document.querySelectorAll(".inOutContainer");
    const actionDiv = document.getElementById("actionDiv");

    if (getComputedStyle(problemSolution).display === "none") {
        statementContainer.style.width = "100%";
        solutionContainer.style.widows = "0%";
        statementContainer.style.marginRight = "1em";
    } else {
        statementContainer.style.marginRight = "0.5em";
        statementContainer.style.width = "50%";
        solutionContainer.style.widows = "50%";
        for (let index = 0; index < inOutContainer.length; index++) {
            const element = inOutContainer[index];
            element.style.width = `${Number.parseInt(getComputedStyle(solutionContainer).width) - 32
                }px`;
            element.style.height = `${Number.parseInt(getComputedStyle(solutionContainer).height) * 0.45 - 32
                }px`;
        }
        actionDiv.style.width = `${Number.parseInt(getComputedStyle(solutionContainer).width) - 32
            }px`;
        actionDiv.style.height = `${Number.parseInt(getComputedStyle(solutionContainer).height) * 0.1 - 32
            }px`;
    }

    const buttons = document.querySelectorAll(".Button");
    for (let index = 0; index < buttons.length; index++) {
        const element = buttons[index];
        element.style.height = getComputedStyle(actionDiv).height;
        element.style.width = `${Number.parseInt(getComputedStyle(actionDiv).width) / 4
            }px`;
    }
}

export function initPopUp() {
    const background = document.getElementById("popUpContainer");
    const popUp = document.getElementById("popUp");
    const popUpStyle = getComputedStyle(popUp);
    background.style.display = "block";

    popUp.style.marginLeft = `${(window.innerWidth -
        (Number.parseInt(popUpStyle.width) +
            Number.parseInt(popUpStyle.paddingLeft) +
            Number.parseInt(popUpStyle.paddingRight))) /
        2
        }px`;
    popUp.style.marginTop = `${(window.innerHeight -
        (Number.parseInt(popUpStyle.height) +
            Number.parseInt(popUpStyle.paddingTop) +
            Number.parseInt(popUpStyle.paddingBottom))) /
        2
        }px`;

    const popUpButton = document.getElementById("difficultySelectorButton");
    const popUpSelector = document.getElementById("difficultySelector");
    const popUpText = document.getElementById("popUpText");
    popUpButton.style.width = getComputedStyle(popUpText).width;
    popUpSelector.style.width = getComputedStyle(popUpText).width;
    popUpSelector.style.height = `${Number.parseInt(getComputedStyle(popUpButton).height) / 2
        }px`;
}

export function unInitPopUp() {
    document.getElementById("popUpContainer").style.display = "none";
}