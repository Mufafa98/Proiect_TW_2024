export async function initSelectorScreen() {
    //logged in user
    try {
        const response = await fetch("http://127.0.0.1:3000/protected", {
            method: 'GET',
            credentials: 'include'
        });
        if (response.status !== 200) {
            window.location.href = "../HomeScreen/homescreen.html";
            return;
        }
    } catch (error) {
        console.error('Error:', error);
    }
    try {
        const response = await fetch("http://127.0.0.1:3000/problems/tournament?uid=expected", {
            method: 'GET',
            credentials: 'include'
        });
        const result = await response.json();
        if (result.problemsNeeded === 0)
            window.location.href = "../ProblemAddingStage/ProblemAdding.html";
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }

    const authBackgroundHeight = Number.parseFloat(
        getComputedStyle(document.getElementById("AuthBackground")).height,
    );
    const authBackgroundWidth = Number.parseFloat(
        getComputedStyle(document.getElementById("AuthBackground")).width,
    );

    document.getElementById("formElements").style.height = `${(authBackgroundHeight / 2) * 1.5
        }px`;

    const formElements = document.getElementsByClassName("formElement");

    for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].type !== "button") {
            formElements[i].style.width = `${authBackgroundWidth - 0.2 * authBackgroundWidth
                }px`;
        } else {
            formElements[i].style.width = `${authBackgroundWidth - 0.2 * authBackgroundWidth
                }px`;
        }
    }

    try {
        const response = await fetch("http://127.0.0.1:3000/metadata/chapters", {
            method: 'GET',
            credentials: 'include'
        });
        const result = await response.json();
        if (result.found) {
            const selector = document.getElementById("chapterSelector");
            for (const chapterData of result.data) {
                const chapter = chapterData.Chapter;
                const option = document.createElement("option");
                option.value = chapter;
                option.innerHTML = chapter;
                selector.appendChild(option);
            }
        }
        else {
            document.getElementById("AuthBackground").innerHTML = "<p>Internal Server Error</p><div id=\"formElements\"><button class=\"Button formElement\" id=\"Home\" style=\"min-width: 100px;\">Home</button></div>"
            document.getElementById("Home").addEventListener("click", () => {
                window.location.href = "../DashboardStage/Dashboard.html";
            })
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
