export async function getProblemData(id) {
    const url = `http://127.0.0.1:3000/problems?id=${id}&data=true`;
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        const result = await response.json();
        if (response.status === 457)
            showPopup("Problem not found");
        else {
            return result;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}