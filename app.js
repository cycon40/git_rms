
// LEAN H₂ FACTORY UI - Git-native Requirements Management System
class FactoryUI {
    constructor() {
        this.currentRole = null;
        this.currentPage = 'overview';
        this.gitAPI = new GitAPI('http://localhost:3001');
        this.debugMode = true;

        this.navConfig = {
            admin: [
                { id: 'overview', label: 'Overview', icon: '◎' },
                { id: 'products', label: 'Products', icon: '📦' },
                { id: 'operations', label: 'Operations', icon: '⚙️' },
                { id: 'governance', label: 'Governance', icon: '⚖' },
                { id: 'observability', label: 'Observability', icon: '📊' },
                { id: 'analytics', label: 'Analytics', icon: '📈' },
                { id: 'approvals', label: 'Approvals', icon: '✅' },
            ],
            manager: [
                { id: 'overview', label: 'Overview', icon: '◎' },
                { id: 'products', label: 'Products', icon: '📦' },
                { id: 'approvals', label: 'Approvals', icon: '✅' },
                { id: 'analytics', label: 'Analytics', icon: '📈' },
            ],
            operator: [
                { id: 'overview', label: 'My Dashboard', icon: '◎' },
                { id: 'operations', label: 'Operations', icon: '⚙️' },
                { id: 'products', label: 'My Tasks', icon: '📦' },
            ],
            qa: [
                { id: 'overview', label: 'QA Workspace', icon: '◎' },
                { id: 'products', label: 'Validation', icon: '📦' },
                { id: 'operations', label: 'Runs', icon: '⚙️' },
            ],
            viewer: [
                { id: 'analytics', label: 'Dashboards', icon: '📈' },
                { id: 'products', label: 'Products', icon: '📦' },
            ],
        };

        this.pageTitles = {
            admin: {
                overview: 'Factory Admin Control Panel',
                products: 'Products Management',
                operations: 'Operational Capabilities',
                governance: 'Governance & Policies',
                observability: 'System Observability',
                analytics: 'Analytics Dashboard',
                approvals: 'Approvals Queue',
            },
            manager: {
                overview: 'Requirements Management',
                products: 'Products & Traceability',
                approvals: 'Approvals Queue',
                analytics: 'Analytics Dashboard',
            },
            operator: {
                overview: 'My Assigned Work',
                operations: 'Operational Tasks',
                products: 'My Assigned Tasks',
            },
            qa: {
                overview: 'QA Validation Workspace',
                products: 'Validation & Defects',
                operations: 'Validation Runs',
            },
            viewer: {
                analytics: 'Analytics Dashboard',
                products: 'Product Catalog (Read-Only)',
            },
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
        document.querySelectorAll('.role-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.setRole(e.currentTarget.dataset.role);
                this.hideRoleModal();
            });
        });

        document.addEventListener('click', (e) => {
            const navItem = e.target.closest('.nav-item');
            if (navItem) {
                e.preventDefault();
                this.navigateToPage(navItem.dataset.page);
            }
        });
    }

    setRole(role) {
        this.currentRole = role;
        const defaultPage = this.navConfig[role][0]?.id || 'overview';
        this.updateRoleBadge();
        this.renderNavigation();
        this.navigateToPage(defaultPage);
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
        roleBadge.innerHTML = `<span class="role-icon">${roleInfo.icon}</span> <span class="role-label">${roleInfo.label}</span>`;
    }

    updateContextInfo() {
        const currentRoleElement = document.getElementById('currentRole');
        currentRoleElement.textContent = this.currentRole.charAt(0).toUpperCase() + this.currentRole.slice(1);
    }

    renderNavigation() {
        const nav = document.getElementById('sidebarNav');
        const navItems = this.navConfig[this.currentRole] || [];
        nav.innerHTML = navItems.map(item => `
            <a href="#" class="nav-item" data-page="${item.id}">
                <span class="nav-icon">${item.icon}</span>
                <div class="nav-content"><span class="nav-label">${item.label}</span></div>
            </a>
        `).join('');
    }

    navigateToPage(pageId) {
        this.currentPage = pageId;
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.page === pageId);
        });
        const pageTitle = document.getElementById('pageTitle');
        pageTitle.textContent = this.pageTitles[this.currentRole]?.[pageId] || 'Factory UI';
        this.renderPageContent(pageId);
    }

    async renderPageContent(pageId) {
        const contentGrid = document.getElementById('contentGrid');
        contentGrid.innerHTML = this.renderSpinner();
        
        try {
            switch (pageId) {
                case 'overview':
                    contentGrid.innerHTML = this.renderOverview();
                    break;
                case 'products':
                    await this.renderProducts();
                    break;
                case 'operations':
                    await this.renderOperations();
                    break;
                default:
                    contentGrid.innerHTML = this.renderPlaceholder(pageId);
            }
        } catch (error) {
            console.error(`Error rendering page ${pageId}:`, error);
            contentGrid.innerHTML = this.renderError(error.message);
        }
    }

    // --- RENDER METHODS ---

    renderSpinner() {
        return '<div class="spinner"></div>';
    }

    renderError(message) {
        return `<div class="panel error-panel"><h3>An Error Occurred</h3><p>${message}</p></div>`;
    }

    renderPlaceholder(pageId) {
        return `<div class="panel"><div class="panel-content"><h3>${pageId.toUpperCase()}</h3><p>Content for this page is under construction.</p></div></div>`;
    }
    
    renderOverview() {
        // For now, the overview is static. Can be made dynamic later.
        return `
            <section class="panel">
                <header class="panel-header"><div class="panel-title"><h3>Welcome, ${this.currentRole.toUpperCase()}</h3></div></header>
                <div class="panel-content"><p>Select a view from the navigation to begin.</p></div>
            </section>`;
    }

    async renderProducts() {
        const contentGrid = document.getElementById('contentGrid');
        
        const issues = await this.gitAPI.getIssues({ labels: 'artifact:BRS,artifact:FRS' });

        const brsItems = issues.filter(iss => iss.metadata?.type === 'BRS');
        const frsItems = issues.filter(iss => iss.metadata?.type === 'FRS');

        const brsTable = this.createIssueTable('Business Requirements (BRS)', ['ID', 'Title', 'Status', 'Priority'], brsItems);
        const frsTable = this.createIssueTable('Functional Requirements (FRS)', ['ID', 'Title', 'Status', 'Owner'], frsItems);

        contentGrid.innerHTML = brsTable + frsTable;
    }

    async renderOperations() {
        const contentGrid = document.getElementById('contentGrid');
        
        // Example: Fetching and displaying Operational Flows
        const flows = await this.gitAPI.getOperationalFlows();
        const flowTable = this.createIssueTable('Operational Flows', ['ID', 'Title', 'Status', 'Preconditions'], flows, item => [
            item.metadata?.id || item.number,
            item.title,
            this.createStatusBadge(item.metadata?.status || 'Unknown'),
            item.metadata?.preconditions?.join(', ') || 'None'
        ]);

        const tasks = await this.gitAPI.getOperatorTasks();
        const taskTable = this.createIssueTable('Operator Tasks', ['ID', 'Title', 'Status', 'Assigned To'], tasks, item => [
            item.metadata?.id || item.number,
            item.title,
            this.createStatusBadge(item.metadata?.status || 'Unknown'),
            item.metadata?.assigned_to || 'Unassigned'
        ]);

        contentGrid.innerHTML = flowTable + taskTable;
    }
    
    // --- UI HELPER METHODS ---

    createIssueTable(title, headers, items, customRowBuilder) {
        const defaultRowBuilder = item => [
            item.metadata?.id || item.number,
            `<a href="${item.html_url}" target="_blank">${item.title}</a>`,
            this.createStatusBadge(item.metadata?.status || 'Unknown'),
            item.metadata?.priority || 'N/A'
        ];
        
        const rowBuilder = customRowBuilder || defaultRowBuilder;

        const body = items.length > 0
            ? items.map(item => `<tr>${rowBuilder(item).map(td => `<td>${td}</td>`).join('')}</tr>`).join('')
            : '<tr><td colspan="${headers.length}">No items found.</td></tr>';

        return `
            <section class="panel">
                <header class="panel-header"><div class="panel-title"><h3>${title}</h3><span class="panel-source">Live from Git Repository</span></div></header>
                <div class="panel-content">
                    <div class="table-container">
                        <table class="data-table">
                            <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
                            <tbody>${body}</tbody>
                        </table>
                    </div>
                </div>
            </section>
        `;
    }

    createStatusBadge(status) {
        const statusClass = `status-${status?.toLowerCase().replace(' ', '-')}`;
        return `<span class="badge ${statusClass}">${status || 'N/A'}</span>`;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.factoryUI = new FactoryUI();
});
