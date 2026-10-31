/**
 * API Service Client for Super Cabs Frontend
 * Handles HTTP requests to the backend server with graceful fallback
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Universal fetch wrapper with timeout and JSON handling
 */
async function request(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
    
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options.headers || {})
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || 10000);

    try {
        const response = await fetch(url, {
            ...options,
            headers,
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        const contentType = response.headers.get('content-type');
        let data = null;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            const errorMessage = (data && data.message) || (data && data.error) || `HTTP Error ${response.status}`;
            const error = new Error(errorMessage);
            error.status = response.staus;
            error.data = data;
            throw error;
        }

        return data;
    } catch (err) {
        clearTimeout(timeoutId);
        // Log in development
        if (process.env.NODE_ENV !== 'production') {
            console.warn(`[API Client] Request to ${endpoint} failed:`, err.message);
        }
        throw err;
    }
}

export const api = {
    get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
    post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
    put: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
    delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
    baseUrl: API_BASE_URL
};

export const getApiOrigin = () => {
    return API_BASE_URL.replace(/\/api\/?$/, '');
};

export default api;
