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

export async function runQuery(id, type, query) {
    const url = `http://127.0.0.1:3000/problems?id=${id}&type=${type}&query=${query}`;
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        const result = await response.json();
        return {
            result: result,
            status: response.status,
        };
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function submitQuery(id, type, query, uid) {
    const url = `http://127.0.0.1:3000/problems?id=${id}&type=${type}&query=${query}&uid=${uid}`;
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        const result = await response.json();
        return {
            result: result,
            status: response.status,
        };
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function canRate(pid, uid) {
    const url = `http://127.0.0.1:3000/problems/rate?pid=${pid}&uid=${uid}`;
    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        console.log(response)
        if (response.status === 200)
            return true;
        return false;
    } catch (error) {
        console.error('Error:', error);
    }
}