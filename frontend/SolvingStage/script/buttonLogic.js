import { canRate, runQuery, submitQuery, rate } from "./problem.js";
import { initPopUp, unInitPopUp } from "./init.js";

export function backButton() {
	window.location.href = "../DashboardStage/Dashboard.html";
}
export async function runButton() {
	const solutionInput = document.getElementById("problemSolution");
	const solutionOutput = document.getElementById("solutionOutput");

	solutionOutput.value = "[WAITING FOR SERVER RESPONSE]";

	const queryResult = await runQuery(
		localStorage.getItem("selectedProblem"),
		"run",
		solutionInput.value,
	);
	const output = queryResult.result.message;
	if (queryResult.status === 200) {
		solutionOutput.value = `[OUTPUT EXPECTED]:\n${output.expected.result}\n[OUTPUT GOT]:\n${output.got}`;
	} else solutionOutput.value = `[ERROR]:${output}`;
}

export async function subminButton() {
	const solutionInput = document.getElementById("problemSolution");
	const solutionOutput = document.getElementById("solutionOutput");

	solutionOutput.value = "[WAITING FOR SERVER RESPONSE]";

	const queryResult = await submitQuery(
		localStorage.getItem("selectedProblem"),
		"submit",
		solutionInput.value,
	);
	const output = queryResult.result.message.result;

	if (output) {
		solutionOutput.value = "[PASSED]";
	} else solutionOutput.value = "[FAILED]";
	const canUserRate = await canRate(localStorage.getItem("selectedProblem"));
	if (canUserRate) {
		initPopUp();
		document
			.getElementById("difficultySelectorButton")
			.addEventListener("click", () => {
				const difficulty = getDifficulty(
					document.getElementById("difficultySelector").value,
				);
				rate(localStorage.getItem("selectedProblem"), difficulty);
				unInitPopUp();

			});
	}
	document.getElementById("submitButton").style.display = "none";
	document.getElementById("nextButton").style.display = "block"
}

function getDifficulty(value) {
	let result = "NA";
	switch (value) {
		case "0":
			result = "Easy";
			break;
		case "1":
			result = "Medium";
			break;
		case "2":
			result = "Hard";
			break;
		case "3":
			result = "Wrong";
			break;
		default:
			break;
	}
	return result;
}
