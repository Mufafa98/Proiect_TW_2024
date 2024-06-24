export async function loadReportedProblems() {
    const url = "http://127.0.0.1:3000/problems/reported/";

    try{
        const response = await fetch(url, {
			method: "GET",
			credentials: "include",
		});

        const result = await response.json();
        console.log(result.data);
        loadReportedProblemsInPage(result.data);
    } catch (error) {
        console.error("Error", error);
    }
}

function loadReportedProblemsInPage(problems){
    const listContainer = document.querySelector("#listcontainer")

    for(let i = 0; i < problems.length; i++) {
        const element = problems[i];
        
        const problem = document.createElement("div");
        const problemTitle = document.createElement("p");

        problemTitle.id = "title";
        problemTitle.textContent = element.Title;

        problem.appendChild(problemTitle);

        listContainer.appendChild(problem)
    }
}