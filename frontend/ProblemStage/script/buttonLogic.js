import { canRate, runQuery, submitQuery } from "./problem.js";


export function backButton() {
    window.location.href = "../DashboardStage/Dashboard.html";
}
export async function runButton() {
    const solutionInput = document.getElementById("problemSolution");
    const solutionOutput = document.getElementById("solutionOutput");

    solutionOutput.value = "[WAITING FOR SERVER RESPONSE]"

    const queryResult = (await runQuery(
        localStorage.getItem("selectedProblem"),
        "run",
        solutionInput.value
    ));
    const output = queryResult.result.message
    if (queryResult.status === 200) {
        solutionOutput.value = `[OUTPUT EXPECTED]:\n${output.expected.result}\n[OUTPUT GOT]:\n${output.got}`
    }
    else
        solutionOutput.value = `[ERROR]:${output}`
}

export async function subminButton() {
    const solutionInput = document.getElementById("problemSolution");
    const solutionOutput = document.getElementById("solutionOutput");

    solutionOutput.value = "[WAITING FOR SERVER RESPONSE]"

    const queryResult = (await submitQuery(
        localStorage.getItem("selectedProblem"),
        "submit",
        solutionInput.value,
        localStorage.getItem("uid")
    ));
    const output = queryResult.result.message.result
    if (output) {
        solutionOutput.value = "[PASSED]"
    }
    else
        solutionOutput.value = "[FAILED]"
    const canUserRate = await canRate(
        localStorage.getItem("selectedProblem"),
        localStorage.getItem("uid")
    )

    console.log(canUserRate)
}