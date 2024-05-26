export function backButton() {
    window.location.href = "../DashboardStage/Dashboard.html";
}
export function runButton() {
    const solutionInput = document.getElementById("problemSolution");
    const solutionOutput = document.getElementById("solutionOutput");

    const output = `[Output]: Felicitari ai introdus - ${solutionInput.value}`;

    solutionOutput.value = output;
}