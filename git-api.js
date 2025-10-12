// Git API Integration Module
// Connects to the backend service which mediates Git provider APIs.

class GitAPI {
    constructor(backendUrl = '/api', githubToken) {
        this.backendUrl = backendUrl;
        this.githubToken = githubToken;
    }

    // Generic API request method for the backend
    async makeRequest(endpoint, options = {}) {
        const url = `${this.backendUrl}${endpoint}`;
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.githubToken}`,
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                const errorBody = await response.json();
                console.error(`API request failed to ${endpoint}:`, errorBody);
                throw new Error(errorBody.error || `Request failed with status ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error(`Network or other error for ${endpoint}:`, error);
            throw error;
        }
    }
    
    async getUserRole() {
        return this.makeRequest('/user/role');
    }

    // Issues API
    async getIssues(params = {}) {
        const queryParams = new URLSearchParams(params);
        return this.makeRequest(`/issues?${queryParams}`);
    }

    async getIssue(number) {
        return this.makeRequest(`/issues/${number}`);
    }

    async createIssue(issueData) {
        return this.makeRequest('/issues', {
            method: 'POST',
            body: JSON.stringify(issueData),
        });
    }

    async updateIssue(number, updates) {
        return this.makeRequest(`/issues/${number}`,
         {
            method: 'PATCH',
            body: JSON.stringify(updates),
        });
    }

    // Operational Artifacts API (examples)
    async getOperationalFlows(filters = {}) {
        const params = { ...filters, labels: 'type:operational_flow' };
        return this.getIssues(params);
    }

    async getValidationRuns(filters = {}) {
        const params = { ...filters, labels: 'type:validation_run' };
        return this.getIssues(params);
    }
    
    async getOperatorTasks(filters = {}) {
        const params = { ...filters, labels: 'type:operator_task' };
        return this.getIssues(params);
    }

    // Add other specific getters as needed for telemetry, incidents etc.
}

// Export for use in the main application
window.GitAPI = GitAPI;
