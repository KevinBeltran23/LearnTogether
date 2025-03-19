export async function sendDeleteRequest(url, authToken = null) {
    const headers = {
        'Content-Type': 'application/json',
    };
    
    // Add authorization header if token is provided
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    const response = await fetch(url, {
        method: 'DELETE',
        headers: headers,
    });
    
    // Check if the response is OK
    if (!response.ok) {
        const contentType = response.headers.get("content-type");
        
        if (contentType && contentType.includes("application/json")) {
            // If the error response is JSON, parse it
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        } else {
            // If the error is text or other format
            const errorText = await response.text();
            throw new Error(`${response.status}: ${errorText || 'An error occurred'}`);
        }
    }
    
    return response; // Return the entire response object
}
