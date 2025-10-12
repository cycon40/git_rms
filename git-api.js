// Git API Integration Module
// This module simulates Git/GitHub/GitLab API interactions for the Requirements Management System

class GitAPI {
    constructor() {
        this.baseUrl = 'https://api.github.com'; // Can be configured for GitHub, GitLab, or local Git
        this.repoOwner = 'factory';
        this.repoName = 'requirements-management';
        this.token = null; // Would be set during authentication
        
        // Mock data for demonstration
        this.mockData = {
            issues: [],
            projects: [],
            labels: [],
            pullRequests: [],
            commits: []
        };
        
        this.initializeMockData();
    }

    initializeMockData() {
        // Mock Business Requirements (BRS)
        this.mockData.issues = [
            {
                number: 101,
                title: 'Electrolyzer uptime alerting',
                body: 'Business requirement for real-time monitoring and alerting of electrolyzer uptime.',
                state: 'closed',
                labels: ['artifact:BRS', 'status:Approved', 'priority:High'],
                assignees: [{ login: 'alice' }],
                created_at: '2025-10-01T10:00:00Z',
                updated_at: '2025-10-05T14:30:00Z',
                html_url: 'https://github.com/factory/requirements-management/issues/101'
            },
            {
                number: 298,
                title: 'Battery monitoring system',
                body: 'Business requirement for comprehensive battery monitoring and health tracking.',
                state: 'open',
                labels: ['artifact:BRS', 'status:UnderReview', 'priority:Medium'],
                assignees: [{ login: 'bob' }],
                created_at: '2025-10-08T09:00:00Z',
                updated_at: '2025-10-11T11:20:00Z',
                html_url: 'https://github.com/factory/requirements-management/issues/298'
            },
            {
                number: 305,
                title: 'Export to Excel functionality',
                body: 'Business requirement for exporting data to Excel format for reporting.',
                state: 'open',
                labels: ['artifact:BRS', 'status:Draft', 'priority:High'],
                assignees: [{ login: 'alice' }],
                created_at: '2025-10-10T15:00:00Z',
                updated_at: '2025-10-11T16:45:00Z',
                html_url: 'https://github.com/factory/requirements-management/issues/305'
            }
        ];

        // Mock Functional Requirements (FRS)
        this.mockData.issues.push(
            {
                number: 212,
                title: 'Resilient restart of cell stacks',
                body: 'Functional requirement: Implement graceful restart logic for electrolyzer cell stacks when heartbeat goes stale.',
                state: 'open',
                labels: ['artifact:FRS', 'status:InProgress', 'priority:High', 'linked:BR-101'],
                assignees: [{ login: 'jdoe' }],
                created_at: '2025-10-05T14:32:00Z',
                updated_at: '2025-10-11T12:05:00Z',
                html_url: 'https://github.com/factory/requirements-management/issues/212'
            },
            {
                number: 305,
                title: 'Telemetry ingestion parity',
                body: 'Functional requirement: Implement telemetry ingestion from multiple sources with unified schema.',
                state: 'closed',
                labels: ['artifact:FRS', 'status:Validated', 'priority:Medium', 'linked:BR-101'],
                assignees: [{ login: 'jsmith' }],
                created_at: '2025-10-03T11:00:00Z',
                updated_at: '2025-10-10T16:30:00Z',
                html_url: 'https://github.com/factory/requirements-management/issues/305'
            }
        );

        // Mock User Acceptance Tests (UAT)
        this.mockData.issues.push(
            {
                number: 42,
                title: 'UAT-42: Telemetry ingestion validation',
                body: 'User Acceptance Test for telemetry ingestion parity functionality.',
                state: 'open',
                labels: ['artifact:UAT', 'status:Ready', 'priority:High', 'linked:FR-305'],
                assignees: [{ login: 'sreynolds' }],
                created_at: '2025-10-08T10:00:00Z',
                updated_at: '2025-10-11T09:15:00Z',
                html_url: 'https://github.com/factory/requirements-management/issues/42'
            },
            {
                number: 43,
                title: 'UAT-43: Resilient restart validation',
                body: 'User Acceptance Test for resilient restart functionality.',
                state: 'open',
                labels: ['artifact:UAT', 'status:InTest', 'priority:High', 'linked:FR-212'],
                assignees: [{ login: 'sreynolds' }],
                created_at: '2025-10-09T14:00:00Z',
                updated_at: '2025-10-11T13:30:00Z',
                html_url: 'https://github.com/factory/requirements-management/issues/43'
            }
        );

        // Mock Defects
        this.mockData.issues.push(
            {
                number: 55,
                title: 'Heartbeat stale after controller upgrade',
                body: 'After controller upgrade to v1.3.0, heartbeat signals become stale after 45 seconds.',
                state: 'open',
                labels: ['artifact:Bug', 'severity:High', 'status:InValidation', 'linked:FR-212'],
                assignees: [{ login: 'sreynolds' }],
                created_at: '2025-10-10T08:00:00Z',
                updated_at: '2025-10-11T10:45:00Z',
                html_url: 'https://github.com/factory/requirements-management/issues/55'
            }
        );

        // Mock Projects
        this.mockData.projects = [
            {
                id: 1,
                name: 'Release v2.1',
                description: 'Major release with uptime alerting and telemetry improvements',
                state: 'open',
                created_at: '2025-10-01T00:00:00Z',
                updated_at: '2025-10-11T12:00:00Z'
            }
        ];

        // Mock Labels
        this.mockData.labels = [
            { name: 'artifact:BRS', color: '0366d6', description: 'Business Requirements' },
            { name: 'artifact:FRS', color: '28a745', description: 'Functional Requirements' },
            { name: 'artifact:UAT', color: 'ffc107', description: 'User Acceptance Tests' },
            { name: 'artifact:Bug', color: 'd73a4a', description: 'Defects/Bugs' },
            { name: 'status:Draft', color: '6f42c1', description: 'Draft status' },
            { name: 'status:UnderReview', color: 'f66a0a', description: 'Under review' },
            { name: 'status:Approved', color: '28a745', description: 'Approved' },
            { name: 'status:InProgress', color: '0366d6', description: 'In progress' },
            { name: 'status:Validated', color: '28a745', description: 'Validated' },
            { name: 'priority:High', color: 'd73a4a', description: 'High priority' },
            { name: 'priority:Medium', color: 'f66a0a', description: 'Medium priority' },
            { name: 'priority:Low', color: '6c757d', description: 'Low priority' }
        ];

        // Mock Pull Requests
        this.mockData.pullRequests = [
            {
                number: 445,
                title: 'Implement resilient restart functionality',
                body: 'Implements FR-212: Resilient restart of cell stacks',
                state: 'open',
                labels: ['artifact:FRS', 'status:InProgress', 'priority:High'],
                assignees: [{ login: 'jdoe' }],
                created_at: '2025-10-08T10:00:00Z',
                updated_at: '2025-10-11T12:05:00Z',
                head: { ref: 'feature/FR-212-restart' },
                base: { ref: 'main' },
                html_url: 'https://github.com/factory/requirements-management/pull/445'
            }
        ];
    }

    // Authentication
    setToken(token) {
        this.token = token;
    }

    // Generic API request method
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseUrl}/repos/${this.repoOwner}/${this.repoName}${endpoint}`;
        
        const headers = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Factory-UI/1.0.0'
        };

        if (this.token) {
            headers['Authorization'] = `token ${this.token}`;
        }

        const config = {
            headers,
            ...options
        };

        try {
            // In a real implementation, this would make actual HTTP requests
            // For demo purposes, we'll return mock data
            return await this.getMockResponse(endpoint, options);
        } catch (error) {
            console.error('Git API request failed:', error);
            throw error;
        }
    }

    // Mock response generator for demo purposes
    async getMockResponse(endpoint, options) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));

        if (endpoint.includes('/issues')) {
            if (endpoint.includes('/labels/')) {
                const labelName = endpoint.split('/labels/')[1];
                return this.mockData.issues.filter(issue => 
                    issue.labels.some(label => label === labelName)
                );
            }
            return this.mockData.issues;
        }

        if (endpoint.includes('/projects')) {
            return this.mockData.projects;
        }

        if (endpoint.includes('/labels')) {
            return this.mockData.labels;
        }

        if (endpoint.includes('/pulls')) {
            return this.mockData.pullRequests;
        }

        if (endpoint.includes('/commits')) {
            return this.mockData.commits;
        }

        return [];
    }

    // Issues API
    async getIssues(params = {}) {
        const queryParams = new URLSearchParams();
        
        if (params.state) queryParams.append('state', params.state);
        if (params.labels) queryParams.append('labels', params.labels);
        if (params.assignee) queryParams.append('assignee', params.assignee);
        if (params.sort) queryParams.append('sort', params.sort);
        if (params.direction) queryParams.append('direction', params.direction);
        
        const query = queryParams.toString();
        const endpoint = `/issues${query ? '?' + query : ''}`;
        
        return await this.makeRequest(endpoint);
    }

    async getIssue(number) {
        return await this.makeRequest(`/issues/${number}`);
    }

    async createIssue(issueData) {
        const newIssue = {
            number: Math.max(...this.mockData.issues.map(i => i.number)) + 1,
            title: issueData.title,
            body: issueData.body,
            state: 'open',
            labels: issueData.labels || [],
            assignees: issueData.assignees || [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            html_url: `https://github.com/factory/requirements-management/issues/${Math.max(...this.mockData.issues.map(i => i.number)) + 1}`
        };

        this.mockData.issues.push(newIssue);
        return newIssue;
    }

    async updateIssue(number, updates) {
        const issueIndex = this.mockData.issues.findIndex(issue => issue.number === number);
        if (issueIndex !== -1) {
            this.mockData.issues[issueIndex] = {
                ...this.mockData.issues[issueIndex],
                ...updates,
                updated_at: new Date().toISOString()
            };
            return this.mockData.issues[issueIndex];
        }
        throw new Error(`Issue ${number} not found`);
    }

    async closeIssue(number) {
        return await this.updateIssue(number, { state: 'closed' });
    }

    // Labels API
    async getLabels() {
        return await this.makeRequest('/labels');
    }

    async createLabel(labelData) {
        const newLabel = {
            name: labelData.name,
            color: labelData.color || '0366d6',
            description: labelData.description || ''
        };

        this.mockData.labels.push(newLabel);
        return newLabel;
    }

    // Projects API
    async getProjects() {
        return await this.makeRequest('/projects');
    }

    async createProject(projectData) {
        const newProject = {
            id: Math.max(...this.mockData.projects.map(p => p.id)) + 1,
            name: projectData.name,
            description: projectData.description || '',
            state: 'open',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        this.mockData.projects.push(newProject);
        return newProject;
    }

    // Pull Requests API
    async getPullRequests(params = {}) {
        return await this.makeRequest('/pulls');
    }

    async createPullRequest(prData) {
        const newPR = {
            number: Math.max(...this.mockData.pullRequests.map(pr => pr.number)) + 1,
            title: prData.title,
            body: prData.body,
            state: 'open',
            labels: prData.labels || [],
            assignees: prData.assignees || [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            head: { ref: prData.head },
            base: { ref: prData.base || 'main' },
            html_url: `https://github.com/factory/requirements-management/pull/${Math.max(...this.mockData.pullRequests.map(pr => pr.number)) + 1}`
        };

        this.mockData.pullRequests.push(newPR);
        return newPR;
    }

    // Repository content API (for file operations)
    async getContent(path) {
        // Mock file content responses
        const mockFiles = {
            '/factory/governance.yml': {
                content: `# Factory Governance Configuration
policies:
  cost_ceiling: 25000
  llm_token_budget: 50000
  escalation_threshold: 0.8
model_thresholds:
  gpt4_confidence_floor: 0.85
  claude_fallback_threshold: 0.70
  human_approval_threshold: 0.60
retention_policies:
  hot_storage_duration: 14
  cold_storage_duration: 90
protected_paths:
  - path: /factory/config/**
    enforcement: admin_approval
  - path: /schema/**
    enforcement: schema_council_review`,
                encoding: 'base64'
            },
            '/requirements/intake/BRS-305.yml': {
                content: `# Business Requirement: Export to Excel
id: BR-305
title: Export to Excel functionality
description: Business requirement for exporting data to Excel format
priority: high
status: draft
created_by: alice
created_at: 2025-10-10T15:00:00Z`,
                encoding: 'base64'
            },
            '/assignments/jdoe.yml': {
                content: `# Assigned Work for jdoe
active_tasks:
  - id: FR-212
    title: Resilient restart of cell stacks
    priority: high
    due_date: 2025-10-18
    branch: feature/FR-212-restart
    pr_number: 445
    status: in_progress
    coverage: 78%`,
                encoding: 'base64'
            },
            '/metrics/validation.yml': {
                content: `# Validation Metrics
sprint_summary:
  total_validated: 8
  approved: 6
  rejected: 2
  avg_validation_time: 3.2
pending_queue:
  - uat_id: UAT-42
    frs_id: FR-305
    priority: high
    status: ready
  - uat_id: UAT-43
    frs_id: FR-212
    priority: high
    status: in_test`,
                encoding: 'base64'
            }
        };

        return mockFiles[path] || { content: '', encoding: 'base64' };
    }

    async updateContent(path, content, message) {
        // Mock file update - in real implementation would commit to Git
        console.log(`Mock update: ${path} - ${message}`);
        return {
            commit: {
                sha: 'abc123def456',
                message: message,
                author: { name: 'Factory Controller', email: 'controller@factory.local' }
            }
        };
    }

    // Search API
    async searchIssues(query) {
        const results = this.mockData.issues.filter(issue => 
            issue.title.toLowerCase().includes(query.toLowerCase()) ||
            issue.body.toLowerCase().includes(query.toLowerCase())
        );
        return { items: results, total_count: results.length };
    }

    // Repository statistics
    async getRepositoryStats() {
        return {
            open_issues: this.mockData.issues.filter(i => i.state === 'open').length,
            closed_issues: this.mockData.issues.filter(i => i.state === 'closed').length,
            open_prs: this.mockData.pullRequests.filter(pr => pr.state === 'open').length,
            total_commits: this.mockData.commits.length,
            contributors: [...new Set(this.mockData.issues.map(i => i.assignees[0]?.login).filter(Boolean))]
        };
    }

    // Branch operations
    async createBranch(branchName, baseBranch = 'main') {
        console.log(`Mock branch creation: ${branchName} from ${baseBranch}`);
        return {
            name: branchName,
            commit: { sha: 'abc123def456' }
        };
    }

    // Commit operations
    async createCommit(message, files) {
        const commit = {
            sha: 'abc123def456',
            message: message,
            author: { name: 'Factory Controller', email: 'controller@factory.local' },
            committer: { name: 'Factory Controller', email: 'controller@factory.local' },
            tree: { sha: 'def456ghi789' },
            parents: [{ sha: 'ghi789jkl012' }]
        };

        this.mockData.commits.push(commit);
        return commit;
    }
}

// Export for use in the main application
window.GitAPI = GitAPI;
