// API Configuration
const API_CONFIG = {
    // Change this to your deployed backend URL in production
    // BASE_URL: 'http://localhost:8000/api',
    BASE_URL: 'https://web-production-b5c7c.up.railway.app/api',
    // For deployment, use: BASE_URL: 'https://your-backend-url.com/api',
    
    ENDPOINTS: {
        EMPLOYEES: '/employees/',
        ATTENDANCES: '/attendances/',
        DASHBOARD: '/attendances/dashboard/'
    }
};

// Helper function to get full URL
function getApiUrl(endpoint) {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
}
