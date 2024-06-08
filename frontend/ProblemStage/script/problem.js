export async function getProblemData(id) {
    const url = `http://127.0.0.1:3000/problems?id=${id}&data=true`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
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
            method: 'GET',
            credentials: 'include'
        });

        const result = await response.json();
        console.log(response.status);
        console.log(result)
        return {
            result: result,
            status: response.status,
        };
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function submitQuery(id, type, query) {
    const url = `http://127.0.0.1:3000/problems?id=${id}&type=${type}&query=${query}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
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
export async function canRate(pid) {
    const url = `http://127.0.0.1:3000/problems/rate?pid=${pid}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });
        if (response.status === 200)
            return true;
        return false;
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function rate(pid, raiting) {
    const url = "http://127.0.0.1:3000/problems/rate";
    const data = {
        pid: pid,
        raiting: raiting
    }
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });
    } catch (error) {
        console.error('Error:', error);
    }
}