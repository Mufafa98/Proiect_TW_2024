export function init() {
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
			element.style.width = `${
				Number.parseInt(getComputedStyle(solutionContainer).width) - 64
			}px`;
			element.style.height = `${
				Number.parseInt(getComputedStyle(solutionContainer).height) * 0.45 - 64
			}px`;
		}
		actionDiv.style.width = `${
			Number.parseInt(getComputedStyle(solutionContainer).width) - 64
		}px`;
		actionDiv.style.height = `${
			Number.parseInt(getComputedStyle(solutionContainer).height) * 0.1 - 64
		}px`;
	}
}
