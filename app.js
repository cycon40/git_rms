// LEAN H₂ FACTORY UI - Git-native Requirements Management System
class FactoryUI {
    constructor() {
        this.currentRole = null;
        this.currentPage = 'overview';
        this.debugMode = true; // Always show repo paths in debug mode
        
        // Navigation configuration by role
        this.navConfig = {
            admin: [
                { id: 'overview', label: 'Overview', icon: '◎', description: 'System health, metrics, alerts' },
                { id: 'governance', label: 'Governance', icon: '⚖', description: 'Policies, RBAC, prompts' },
                { id: 'products', label: 'Products', icon: '📦', description: 'Requirements, defects, traceability' },
                { id: 'observability', label: 'Observability', icon: '📊', description: 'Telemetry, logs, metrics' },
                { id: 'evolution', label: 'Evolution', icon: '🔄', description: 'Schema evolution, cycles' },
                { id: 'wiki', label: 'Wiki', icon: '📚', description: 'Documentation, knowledge base' },
                { id: 'analytics', label: 'Analytics', icon: '📈', description: 'Performance, trends, reports' },
                { id: 'approvals', label: 'Approvals', icon: '✅', description: 'Review queue, decisions' },
                { id: 'security', label: 'Security', icon: '🔒', description: 'Audit logs, violations, access' },
                { id: 'future', label: 'Future', icon: '🔮', description: 'Experimental features' }
            ],
            manager: [
                { id: 'overview', label: 'Overview', icon: '◎', description: 'High-level snapshot' },
                { id: 'governance', label: 'Governance', icon: '⚖', description: 'View policies (read-only)' },
                { id: 'products', label: 'Products', icon: '📦', description: 'Requirements, traceability' },
                { id: 'observability', label: 'Observability', icon: '📊', description: 'Key metrics only' },
                { id: 'wiki', label: 'Wiki', icon: '📚', description: 'Edit requirements docs' },
                { id: 'analytics', label: 'Analytics', icon: '📈', description: 'Release readiness, velocity' },
                { id: 'approvals', label: 'Approvals', icon: '✅', description: 'Review and approve' },
                { id: 'security', label: 'Security', icon: '🔒', description: 'Product audit logs' }
            ],
            operator: [
                { id: 'overview', label: 'Overview', icon: '◎', description: 'Personal dashboard' },
                { id: 'products', label: 'Products', icon: '📦', description: 'My assigned tasks' },
                { id: 'observability', label: 'Observability', icon: '📊', description: 'My test results' },
                { id: 'wiki', label: 'Wiki', icon: '📚', description: 'FRS documentation' }
            ],
            viewer: [
                { id: 'analytics', label: 'Analytics', icon: '📈', description: 'Executive dashboards' },
                { id: 'wiki', label: 'Wiki', icon: '📚', description: 'Read-only documentation' }
            ],
            qa: [
                { id: 'overview', label: 'Overview', icon: '◎', description: 'Validation queue summary' },
                { id: 'governance', label: 'Governance', icon: '⚖', description: 'Test policies (read-only)' },
                { id: 'products', label: 'Products', icon: '📦', description: 'UAT and defects' },
                { id: 'observability', label: 'Observability', icon: '📊', description: 'Test metrics' },
                { id: 'wiki', label: 'Wiki', icon: '📚', description: 'Test documentation' },
                { id: 'analytics', label: 'Analytics', icon: '📈', description: 'Test coverage trends' },
                { id: 'security', label: 'Security', icon: '🔒', description: 'Traceability audit' }
            ]
        };

        // Page titles by role and page
        this.pageTitles = {
            admin: {
                overview: 'Factory Admin Control Panel',
                governance: 'Governance Policies',
                products: 'Products Management',
                observability: 'System Observability',
                evolution: 'Schema Evolution',
                wiki: 'Wiki Administration',
                analytics: 'Analytics Dashboard',
                approvals: 'Approvals Queue',
                security: 'Security & Audit',
                future: 'Future Features'
            },
            manager: {
                overview: 'Requirements Management',
                governance: 'Governance Overview',
                products: 'Requirements & Traceability',
                observability: 'Key Metrics',
                wiki: 'Documentation',
                analytics: 'Analytics Dashboard',
                approvals: 'Approvals Queue',
                security: 'Audit Logs'
            },
            operator: {
                overview: 'My Assigned Work',
                products: 'My Tasks',
                observability: 'Test Results',
                wiki: 'Documentation'
            },
            viewer: {
                analytics: 'Analytics Dashboard',
                wiki: 'Documentation'
            },
            qa: {
                overview: 'QA Validation Workspace',
                governance: 'Test Policies',
                products: 'Validation & Defects',
                observability: 'Test Metrics',
                wiki: 'Test Documentation',
                analytics: 'Test Analytics',
                security: 'Traceability Audit'
            }
        };

        this.init();
    }

    init() {
        this.showRoleModal();
        this.setupEventListeners();
    }

    showRoleModal() {
        const modal = document.getElementById('roleModal');
        modal.style.display = 'flex';
    }

    hideRoleModal() {
        const modal = document.getElementById('roleModal');
        modal.style.display = 'none';
    }

    setupEventListeners() {
        // Role selection
        document.querySelectorAll('.role-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const role = e.currentTarget.dataset.role;
                this.setRole(role);
                this.hideRoleModal();
            });
        });

        // Navigation
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-item')) {
                e.preventDefault();
                const navItem = e.target.closest('.nav-item');
                const pageId = navItem.dataset.page;
                if (pageId) {
                    this.navigateToPage(pageId);
                }
            }
        });
    }

    setRole(role) {
        this.currentRole = role;
        this.updateRoleBadge();
        this.renderNavigation();
        this.navigateToPage('overview');
        this.updateContextInfo();
    }

    updateRoleBadge() {
        const roleBadge = document.getElementById('roleBadge');
        const roleLabels = {
            admin: { icon: '⚡', label: 'ADMIN' },
            manager: { icon: '⚙️', label: 'MANAGER' },
            operator: { icon: '🔧', label: 'OPERATOR' },
            viewer: { icon: '📊', label: 'VIEWER' },
            qa: { icon: '✓', label: 'QA REVIEWER' }
        };

        const roleInfo = roleLabels[this.currentRole];
        roleBadge.className = `role-badge role-${this.currentRole}`;
        roleBadge.innerHTML = `
            <span class="role-icon">${roleInfo.icon}</span>
            <span class="role-label">${roleInfo.label}</span>
        `;
    }

    updateContextInfo() {
        const currentRoleElement = document.getElementById('currentRole');
        const roleNames = {
            admin: 'Admin',
            manager: 'Manager', 
            operator: 'Operator',
            viewer: 'Viewer',
            qa: 'QA Reviewer'
        };
        currentRoleElement.textContent = roleNames[this.currentRole];
    }

    renderNavigation() {
        const nav = document.getElementById('sidebarNav');
        const navItems = this.navConfig[this.currentRole] || [];
        
        nav.innerHTML = navItems.map(item => `
            <a href="#" class="nav-item" data-page="${item.id}">
                <span class="nav-icon">${item.icon}</span>
                <div class="nav-content">
                    <span class="nav-label">${item.label}</span>
                    <span class="nav-description">${item.description}</span>
                </div>
            </a>
        `).join('');
    }

    navigateToPage(pageId) {
        this.currentPage = pageId;
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === pageId) {
                item.classList.add('active');
            }
        });

        // Update page title
        const pageTitle = document.getElementById('pageTitle');
        pageTitle.textContent = this.pageTitles[this.currentRole][pageId] || 'Factory UI';

        // Render page content
        this.renderPageContent(pageId);
    }

    renderPageContent(pageId) {
        const contentGrid = document.getElementById('contentGrid');
        
        switch (pageId) {
            case 'overview':
                contentGrid.innerHTML = this.renderOverview();
                break;
            case 'governance':
                contentGrid.innerHTML = this.renderGovernance();
                break;
            case 'products':
                contentGrid.innerHTML = this.renderProducts();
                break;
            case 'observability':
                contentGrid.innerHTML = this.renderObservability();
                break;
            case 'evolution':
                contentGrid.innerHTML = this.renderEvolution();
                break;
            case 'wiki':
                contentGrid.innerHTML = this.renderWiki();
                break;
            case 'analytics':
                contentGrid.innerHTML = this.renderAnalytics();
                break;
            case 'approvals':
                contentGrid.innerHTML = this.renderApprovals();
                break;
            case 'security':
                contentGrid.innerHTML = this.renderSecurity();
                break;
            case 'future':
                contentGrid.innerHTML = this.renderFuture();
                break;
            default:
                contentGrid.innerHTML = '<div class="panel"><div class="panel-content"><p>Page not found</p></div></div>';
        }
    }

    renderOverview() {
        if (this.currentRole === 'admin') {
            return this.renderAdminOverview();
        } else if (this.currentRole === 'manager') {
            return this.renderManagerOverview();
        } else if (this.currentRole === 'operator') {
            return this.renderOperatorOverview();
        } else if (this.currentRole === 'viewer') {
            return this.renderViewerOverview();
        } else if (this.currentRole === 'qa') {
            return this.renderQAOverview();
        }
    }

    renderAdminOverview() {
        return `
            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>GOVERNANCE OVERVIEW</h3>
                        <span class="panel-source">Generated via controller synthesis from /factory/governance.yml</span>
                    </div>
                    <div class="panel-actions">
                        <button class="btn-icon" title="Refresh">↻</button>
                        <button class="btn-icon" title="Export">⬇</button>
                    </div>
                </header>
                <div class="panel-content">
                    <div class="metrics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-label">ACTIVE POLICIES</span>
                            </div>
                            <div class="metric-value">12</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-label">PENDING CHANGES</span>
                            </div>
                            <div class="metric-value">3</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-label">VIOLATIONS (24H)</span>
                            </div>
                            <div class="metric-value">0</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-label">ROLE ASSIGNMENTS</span>
                            </div>
                            <div class="metric-value">25 users</div>
                        </div>
                    </div>
                    <div class="debug-info">Debug: Data fetched from /factory/governance.yml</div>
                </div>
            </section>

            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>SYSTEM HEALTH</h3>
                        <span class="panel-source">Controller v1.3.0 telemetry stream</span>
                    </div>
                </header>
                <div class="panel-content">
                    <div class="metrics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-label">UPTIME</span>
                            </div>
                            <div class="metric-value">27d 24m</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-label">SCHEMA VERSION</span>
                            </div>
                            <div class="metric-value">2025.10.01</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-label">ACTIVE JOBS</span>
                            </div>
                            <div class="metric-value">3</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-label">QUEUE DEPTH</span>
                            </div>
                            <div class="metric-value">5</div>
                        </div>
                    </div>
                    <div class="debug-info">Debug: Data fetched from /metrics/controller.yml</div>
                </div>
            </section>

            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>ROLE & ACCESS MANAGEMENT</h3>
                        <span class="panel-source">RBAC configuration from /factory/rbac.yml</span>
                    </div>
                </header>
                <div class="panel-content">
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>ROLE</th>
                                    <th>USERS</th>
                                    <th>ACTIVE ISSUES</th>
                                    <th>PERMISSIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table-row-interactive">
                                    <td class="cell-primary">FactoryManager</td>
                                    <td class="cell-metric">3</td>
                                    <td class="cell-metric">12</td>
                                    <td>BRS/FRS create, approve</td>
                                </tr>
                                <tr class="table-row-interactive">
                                    <td class="cell-primary">FactoryOperator</td>
                                    <td class="cell-metric">15</td>
                                    <td class="cell-metric">34</td>
                                    <td>FRS assign, implement</td>
                                </tr>
                                <tr class="table-row-interactive">
                                    <td class="cell-primary">QAReviewer</td>
                                    <td class="cell-metric">2</td>
                                    <td class="cell-metric">8</td>
                                    <td>UAT validation</td>
                                </tr>
                                <tr class="table-row-interactive">
                                    <td class="cell-primary">Viewer</td>
                                    <td class="cell-metric">5</td>
                                    <td class="cell-metric">-</td>
                                    <td>Read-only dashboards</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="debug-info">Debug: Data fetched from /factory/rbac.yml</div>
                </div>
            </section>
        `;
    }

    renderManagerOverview() {
        return `
            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>INTAKE BOARD</h3>
                        <span class="panel-source">Requirements pipeline from /requirements/intake/</span>
                    </div>
                </header>
                <div class="panel-content">
                    <div class="kanban-board">
                        <div class="kanban-column">
                            <div class="kanban-header">
                                <span class="kanban-title">NEW INTAKE</span>
                                <span class="kanban-count">3</span>
                            </div>
                            <div class="kanban-card">
                                <div class="card-id">BRS-305</div>
                                <div class="card-title">Export to Excel</div>
                                <div class="card-meta">
                                    <span class="badge badge-error">HIGH</span>
                                    <span>alice</span>
                                </div>
                            </div>
                            <div class="kanban-card">
                                <div class="card-id">BRS-306</div>
                                <div class="card-title">Battery monitoring</div>
                                <div class="card-meta">
                                    <span class="badge badge-warning">MEDIUM</span>
                                    <span>bob</span>
                                </div>
                            </div>
                        </div>
                        <div class="kanban-column">
                            <div class="kanban-header">
                                <span class="kanban-title">UNDER REVIEW</span>
                                <span class="kanban-count">2</span>
                            </div>
                            <div class="kanban-card">
                                <div class="card-id">BRS-298</div>
                                <div class="card-title">Alert system</div>
                                <div class="card-meta">
                                    <span class="badge badge-info">MEDIUM</span>
                                    <span>alice</span>
                                </div>
                            </div>
                        </div>
                        <div class="kanban-column">
                            <div class="kanban-header">
                                <span class="kanban-title">APPROVED</span>
                                <span class="kanban-count">5</span>
                            </div>
                            <div class="kanban-card">
                                <div class="card-id">BRS-301</div>
                                <div class="card-title">Uptime alerting</div>
                                <div class="card-meta">
                                    <span class="badge badge-success">APPROVED</span>
                                    <span>alice</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="debug-info">Debug: Data fetched from /requirements/intake/*.yml</div>
                </div>
            </section>

            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>REQUIREMENT INVENTORY</h3>
                        <span class="panel-source">Generated via controller synthesis from /requirements/</span>
                    </div>
                </header>
                <div class="panel-content">
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>TITLE</th>
                                    <th>STATUS</th>
                                    <th>COVERAGE</th>
                                    <th>OWNER</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table-row-interactive">
                                    <td class="cell-mono">BR-101</td>
                                    <td class="cell-primary">Electrolyzer uptime alert</td>
                                    <td><span class="badge badge-success">APPROVED</span></td>
                                    <td class="cell-metric">96%</td>
                                    <td>alice</td>
                                </tr>
                                <tr class="table-row-interactive">
                                    <td class="cell-mono">FR-212</td>
                                    <td class="cell-primary">Resilient restart of cells</td>
                                    <td><span class="badge badge-warning">IN-PROGRESS</span></td>
                                    <td class="cell-metric">78%</td>
                                    <td>jdoe</td>
                                </tr>
                                <tr class="table-row-interactive">
                                    <td class="cell-mono">FR-305</td>
                                    <td class="cell-primary">Telemetry ingestion parity</td>
                                    <td><span class="badge badge-success">VALIDATED</span></td>
                                    <td class="cell-metric">100%</td>
                                    <td>jsmith</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="debug-info">Debug: Data fetched from /requirements/*.yml</div>
                </div>
            </section>

            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>RELEASE MILESTONE: v2.1</h3>
                        <span class="panel-source">Release planning from /releases/v2.1.yml</span>
                    </div>
                </header>
                <div class="panel-content">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 62%"></div>
                    </div>
                    <p>Progress: 62% (8 of 13 FRS completed)</p>
                    <ul style="margin-top: 1rem;">
                        <li>2 blocked (awaiting BRS approval)</li>
                        <li>3 in validation</li>
                        <li>Target: 2025-10-25</li>
                    </ul>
                    <div class="debug-info">Debug: Data fetched from /releases/v2.1.yml</div>
                </div>
            </section>
        `;
    }

    renderOperatorOverview() {
        return `
            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>ACTIVE TASKS</h3>
                        <span class="panel-source">Assigned FRS from /assignments/jdoe.yml</span>
                    </div>
                </header>
                <div class="panel-content">
                    <div class="task-card" style="background: var(--bg-tertiary); border: 1px solid var(--border-primary); border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem;">
                        <h4>FR-212 — Resilient restart of cell stacks</h4>
                        <p style="color: var(--text-secondary); margin: 0.5rem 0;">Linked to: BR-101 (Uptime alerting)</p>
                        <p style="color: var(--text-secondary); margin: 0.5rem 0;">Priority: <span class="badge badge-error">HIGH</span></p>
                        <p style="color: var(--text-secondary); margin: 0.5rem 0;">Due: Oct 18, 2025</p>
                        <div style="margin: 1rem 0;">
                            <div>├─ Branch: feature/FR-212-restart</div>
                            <div>├─ PR #445: Ready for review</div>
                            <div>├─ CI Status: ✓ Tests passing (78% coverage)</div>
                            <div>│            ⚠ 2 lint warnings</div>
                            <div>└─ Last updated: 2 hours ago</div>
                        </div>
                        <div style="margin-top: 1rem;">
                            <button class="btn btn-secondary">VIEW CODE</button>
                            <button class="btn btn-secondary">RUN TESTS</button>
                            <button class="btn btn-primary">SUBMIT FOR REVIEW</button>
                        </div>
                    </div>
                    <div class="debug-info">Debug: Data fetched from /assignments/jdoe.yml</div>
                </div>
            </section>

            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>RECENTLY COMPLETED</h3>
                        <span class="panel-source">Completed work from /completed/jdoe.yml</span>
                    </div>
                </header>
                <div class="panel-content">
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>TITLE</th>
                                    <th>STATUS</th>
                                    <th>DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table-row-interactive">
                                    <td class="cell-mono">FR-199</td>
                                    <td class="cell-primary">Alert threshold config</td>
                                    <td><span class="badge badge-success">MERGED</span></td>
                                    <td>Oct 09, 2025</td>
                                </tr>
                                <tr class="table-row-interactive">
                                    <td class="cell-mono">FR-184</td>
                                    <td class="cell-primary">Data export pipeline</td>
                                    <td><span class="badge badge-success">MERGED</span></td>
                                    <td>Oct 07, 2025</td>
                                </tr>
                                <tr class="table-row-interactive">
                                    <td class="cell-mono">FR-177</td>
                                    <td class="cell-primary">Heartbeat stale detection</td>
                                    <td><span class="badge badge-success">MERGED</span></td>
                                    <td>Oct 05, 2025</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="debug-info">Debug: Data fetched from /completed/jdoe.yml</div>
                </div>
            </section>
        `;
    }

    renderViewerOverview() {
        // Redirect viewers to analytics since they don't have an overview
        this.navigateToPage('analytics');
        return '';
    }

    renderQAOverview() {
        return `
            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>PENDING VALIDATION QUEUE</h3>
                        <span class="panel-source">UAT queue from /validation/pending.yml</span>
                    </div>
                </header>
                <div class="panel-content">
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>FRS</th>
                                    <th>TITLE</th>
                                    <th>STATUS</th>
                                    <th>PRIORITY</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table-row-interactive">
                                    <td class="cell-mono">UAT-42</td>
                                    <td class="cell-mono">FR-305</td>
                                    <td class="cell-primary">Telemetry ingestion</td>
                                    <td><span class="badge badge-info">READY</span></td>
                                    <td><span class="badge badge-error">HIGH</span></td>
                                </tr>
                                <tr class="table-row-interactive">
                                    <td class="cell-mono">UAT-43</td>
                                    <td class="cell-mono">FR-212</td>
                                    <td class="cell-primary">Resilient restart</td>
                                    <td><span class="badge badge-warning">IN-TEST</span></td>
                                    <td><span class="badge badge-error">HIGH</span></td>
                                </tr>
                                <tr class="table-row-interactive">
                                    <td class="cell-mono">UAT-44</td>
                                    <td class="cell-mono">FR-301</td>
                                    <td class="cell-primary">Alert threshold config</td>
                                    <td><span class="badge badge-neutral">PENDING</span></td>
                                    <td><span class="badge badge-warning">MEDIUM</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="debug-info">Debug: Data fetched from /validation/pending.yml</div>
                </div>
            </section>

            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>VALIDATION SUMMARY (THIS SPRINT)</h3>
                        <span class="panel-source">Validation metrics from /metrics/validation.yml</span>
                    </div>
                </header>
                <div class="panel-content">
                    <div class="metrics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-label">TOTAL VALIDATED</span>
                            </div>
                            <div class="metric-value">8</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-label">APPROVED</span>
                            </div>
                            <div class="metric-value">6 (75%)</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-label">REJECTED</span>
                            </div>
                            <div class="metric-value">2 (25%)</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-label">AVG TIME</span>
                            </div>
                            <div class="metric-value">3.2 hours</div>
                        </div>
                    </div>
                    <div class="debug-info">Debug: Data fetched from /metrics/validation.yml</div>
                </div>
            </section>
        `;
    }

    // Placeholder methods for other pages
    renderGovernance() {
        return `
            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>GOVERNANCE POLICIES</h3>
                        <span class="panel-source">Policy configuration from /factory/governance.yml</span>
                    </div>
                </header>
                <div class="panel-content">
                    <p>Governance policies and RBAC configuration will be implemented here.</p>
                    <div class="debug-info">Debug: Data fetched from /factory/governance.yml</div>
                </div>
            </section>
        `;
    }

    renderProducts() {
        return `
            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>PRODUCTS MANAGEMENT</h3>
                        <span class="panel-source">Requirements data from /requirements/</span>
                    </div>
                </header>
                <div class="panel-content">
                    <p>Products, requirements, and traceability management will be implemented here.</p>
                    <div class="debug-info">Debug: Data fetched from /requirements/</div>
                </div>
            </section>
        `;
    }

    renderObservability() {
        return `
            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>OBSERVABILITY</h3>
                        <span class="panel-source">Telemetry data from /metrics/</span>
                    </div>
                </header>
                <div class="panel-content">
                    <p>System observability and metrics will be implemented here.</p>
                    <div class="debug-info">Debug: Data fetched from /metrics/</div>
                </div>
            </section>
        `;
    }

    renderEvolution() {
        return `
            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>SCHEMA EVOLUTION</h3>
                        <span class="panel-source">Evolution data from /evolution/</span>
                    </div>
                </header>
                <div class="panel-content">
                    <p>Schema evolution and cycle management will be implemented here.</p>
                    <div class="debug-info">Debug: Data fetched from /evolution/</div>
                </div>
            </section>
        `;
    }

    renderWiki() {
        return `
            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>WIKI</h3>
                        <span class="panel-source">Documentation from /wiki/</span>
                    </div>
                </header>
                <div class="panel-content">
                    <p>Wiki and documentation will be implemented here.</p>
                    <div class="debug-info">Debug: Data fetched from /wiki/</div>
                </div>
            </section>
        `;
    }

    renderAnalytics() {
        return `
            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>ANALYTICS DASHBOARD</h3>
                        <span class="panel-source">Analytics data from /analytics/</span>
                    </div>
                </header>
                <div class="panel-content">
                    <p>Analytics and reporting will be implemented here.</p>
                    <div class="debug-info">Debug: Data fetched from /analytics/</div>
                </div>
            </section>
        `;
    }

    renderApprovals() {
        return `
            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>APPROVALS QUEUE</h3>
                        <span class="panel-source">Approval data from /approvals/</span>
                    </div>
                </header>
                <div class="panel-content">
                    <p>Approvals queue and workflow will be implemented here.</p>
                    <div class="debug-info">Debug: Data fetched from /approvals/</div>
                </div>
            </section>
        `;
    }

    renderSecurity() {
        return `
            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>SECURITY & AUDIT</h3>
                        <span class="panel-source">Security data from /security/</span>
                    </div>
                </header>
                <div class="panel-content">
                    <p>Security and audit functionality will be implemented here.</p>
                    <div class="debug-info">Debug: Data fetched from /security/</div>
                </div>
            </section>
        `;
    }

    renderFuture() {
        return `
            <section class="panel">
                <header class="panel-header">
                    <div class="panel-title">
                        <h3>FUTURE FEATURES</h3>
                        <span class="panel-source">Experimental features from /future/</span>
                    </div>
                </header>
                <div class="panel-content">
                    <p>Future and experimental features will be implemented here.</p>
                    <div class="debug-info">Debug: Data fetched from /future/</div>
                </div>
            </section>
        `;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.factoryUI = new FactoryUI();
});
