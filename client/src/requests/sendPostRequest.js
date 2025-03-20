export async function sendPostRequest(url, payload, authToken = null) {
    const headers = {
        'Content-Type': 'application/json',
    };
    
    // Add authorization header if token is provided
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
        });
        
        const contentType = response.headers.get("content-type");
        let responseData;
        
        // Parse response based on content type
        if (contentType && contentType.includes("application/json")) {
            responseData = await response.json();
        } else {
            responseData = await response.text();
        }
        
        // Return a standardized response object
        return {
            ok: response.ok,
            status: response.status,
            data: responseData,
            response: response, // Include original response for headers, etc.
            error: !response.ok ? {
                status: response.status,
                message: typeof responseData === 'object' && responseData.message 
                    ? responseData.message 
                    : typeof responseData === 'string' 
                        ? responseData 
                        : `Error ${response.status}`
            } : null
        };
    } catch (error) {
        // Handle network errors or other unexpected errors
        return {
            ok: false,
            status: 0, // No HTTP status for network errors
            data: null,
            response: null,
            error: {
                status: 0,
                message: error.message || 'Network error occurred',
                originalError: error
            }
        };
    }
}