export async function sendGetRequest(url, authToken = null) {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage = response.statusText;

        if (contentType?.includes("application/json")) {
            const errorData = await response.json();
            errorMessage = errorData.message || JSON.stringify(errorData);
        } else {
            errorMessage = await response.text();
        }

        return { error: true, status: response.status, message: errorMessage };
    }

    const contentType = response.headers.get("content-type");
    const data = contentType?.includes("application/json") ? await response.json() : await response.text();

    return { error: false, status: response.status, data };
}
