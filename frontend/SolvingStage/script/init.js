import { getProblemData } from "./problem.js";

export async function init() {
	try {
		const response = await fetch("http://127.0.0.1:3000/protected", {
			method: "GET",
			credentials: "include",
		});
		if (response.status !== 200) {
			window.location.href = "../HomeScreen/homescreen.html";
			return;
		}
	} catch (error) {
		console.error("Error:", error);
	}

	try {
		const response = await fetch(`http://127.0.0.1:3000/problems/tournament?chapter=${localStorage.getItem("chapterSelector")}&difficulty=${localStorage.getItem("difficultySelector")}`, {
			method: "GET",
			credentials: "include",
		});
		if (response.status !== 200) {
			window.location.href = "../HomeScreen/homescreen.html";
			return;
		}
		const result = await response.json();
		localStorage.setItem("selectedProblem", result);
	} catch (error) {
		console.error("Error:", error);
	}
	const problemId = localStorage.getItem("selectedProblem");
	const problemData = (await getProblemData(problemId)).at(0);
	const problemText = document.getElementById("problemStatement");
	const problemTitle = document.getElementById("problemTitle");
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

	//init comment section
	const commentInput = document.getElementById("commentInput");
	commentInput.style.width = `${Number.parseInt(getComputedStyle(statementContainer).width) - 32
		}px`;
	commentInput.style.height = "100px";
	//get the comments form backend
	initComments()
}

export async function initComments() {
	const statementContainer = document.getElementById("statement");
	try {
		const response = await fetch(`http://127.0.0.1:3000/comments?pid=${localStorage.getItem("selectedProblem")}`, {
			method: "GET",
			credentials: "include",
		});
		const result = await response.json();
		if (result.found) {
			const commentContainer = document.getElementById("commentData");
			for (const comment of result.data) {
				const username = comment.Username;
				const message = comment.message;
				const postedOn = comment.posted_on;

				const pastDate = new Date(postedOn);
				const currentDate = new Date();
				const timeDiff = currentDate - pastDate;

				const seconds = Math.floor((timeDiff / 1000) % 60);
				const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
				const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
				const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
				const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
				const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30 * 12));

				let posted = "";
				if (years > 0) {
					if (years === 1)
						posted = `${years} year ago`
					else
						posted = `${years} years ago`
				} else if (months > 0) {
					if (months === 1)
						posted = `${months} month ago`
					else
						posted = `${months} months ago`
				} else if (days > 0) {
					if (days === 1)
						posted = `${days} day ago`
					else
						posted = `${days} days ago`
				} else if (hours > 0) {
					if (hours === 1)
						posted = `${hours} hour ago`
					else
						posted = `${hours} hours ago`
				}
				else if (minutes > 0) {
					if (minutes === 1)
						posted = `${minutes} minute ago`
					else
						posted = `${minutes} minutes ago`
				}
				else if (seconds > 0) {
					if (seconds === 1)
						posted = `${seconds} second ago`
					else
						posted = `${seconds} seconds ago`
				}

				const commentorName = document.createElement("textarea");
				commentorName.classList.add("commentorName");
				commentorName.classList.add("commentField");
				commentorName.disabled = true;
				commentorName.value = `${username} [${posted}]`;
				const commentorMessage = document.createElement("textarea");
				commentorMessage.classList.add("commentorMessage");
				commentorMessage.classList.add("commentField");
				commentorMessage.disabled = true;
				commentorMessage.value = message;

				commentContainer.appendChild(commentorName);
				commentContainer.appendChild(commentorMessage);
			}
		}
	} catch (error) {
		console.error("Error:", error);
	}
	const commentFields = document.querySelectorAll(".commentField")
	for (let index = 0; index < commentFields.length; index++) {
		const field = commentFields[index];
		field.style.width = `${Number.parseInt(getComputedStyle(statementContainer).width) - Number.parseInt(getComputedStyle(field).marginLeft) - 18}px`;
		field.style.height = "1px"
		field.style.height = `${field.scrollHeight}px`
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
