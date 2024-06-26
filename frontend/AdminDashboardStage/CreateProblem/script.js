async function uploadProblem() {
    const url = "http://127.0.0.1:3000/problems/";

    const formElements = document.querySelectorAll(".probleminput");

    let title = formElements.item(0).value;
    let chapter = formElements.item(1).value;
    let difficulty = formElements.item(2).value;
    let description = formElements.item(3).value;
    let solution = formElements.item(4).value;

    // console.log(formElements);
    // console.log("title: " + title);
    // console.log("chapter: " + chapter);
    // console.log("difficulty: " + difficulty);
    // console.log("decription: " + description);
    // console.log("solution: " + solution);

    const data = {
        title: title,
        chapter: chapter,
        difficulty: difficulty,
        content: description,
        solution: solution,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });
    } catch (error) {
        console.error("Error:", error);
    }
}