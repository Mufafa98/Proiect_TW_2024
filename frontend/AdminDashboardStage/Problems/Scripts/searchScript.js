export async function loadSearchedProblem(title) {
    const url = "http://127.0.0.1:3000/problems/byTitle/";

    try{
        const response = await fetch(url, {
			method: "POST",
            headers: {
				"Content-Type": "application/json",
			},
            body: JSON.stringify({ title: title }),
			credentials: "include",
		});

        const result = await response.json();
        console.log(result.data);
        clearProblem();
        loadSearchedProblemInPage(result.data);
    } catch (error) {
        console.error("Error", error);
    }
}

function loadSearchedProblemInPage(problem){
    const listContainer = document.querySelector("#problemcontainer")
    const element = problem[0];
        
    //const problem = document.createElement("div");
    const problemID = document.querySelector("#problemid");

    problemID.textContent += " ";
    problemID.textContent += element.id;

    const problemTitle = document.querySelector("#problemtitle");

    problemTitle.textContent += " ";
    problemTitle.textContent += element.Title;

    const problemChapter = document.querySelector("#problemchapter");

    problemChapter.textContent += " ";
    problemChapter.textContent += element.Chapter;

    const problemDifficulty = document.querySelector("#problemdifficulty");

    problemDifficulty.textContent += " ";
    problemDifficulty.textContent += element.Difficulty;

    const problemContent = document.querySelector("#problemdescription");

    problemContent.textContent += " ";
    problemContent.textContent += element.content;

    const problemSolution = document.querySelector("#problemsolution");

    problemSolution.textContent += " ";
    problemSolution.textContent += element.solution;

    //problem.appendChild(problemTitle);

    //listContainer.appendChild(problem);
}

function clearProblem(){
    const problemID = document.querySelector("#problemid");
    problemID.textContent = "Id: ";

    const problemTitle = document.querySelector("#problemtitle");
    problemTitle.textContent = "Title: ";

    const problemChapter = document.querySelector("#problemchapter");
    problemChapter.textContent = "Chapter: ";

    const problemDifficulty = document.querySelector("#problemdifficulty");
    problemDifficulty.textContent = "Difficulty: ";
}