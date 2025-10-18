# Factory UI Demo Guide

## 🎬 Quick Start Demo

This guide walks you through the key features of the LEAN H₂ FACTORY UI system.

### 1. Launch the Application

1. **Start a local web server**:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:8000
   ```

### 2. Role Selection

When you first load the application, you'll see a **Role Selection Modal**. Choose from:

- **⚡ Factory Admin** - Full system control and governance
- **⚙️ Factory Manager** - Requirements management and approvals  
- **🔧 Factory Operator** - Task execution and implementation
- **📊 Viewer** - Analytics and reporting only
- **✓ QA Reviewer** - Validation and testing

**Demo Tip**: Try different roles to see how the UI changes completely!

### 3. Factory Admin Demo

**Select "Factory Admin"** and explore:

#### Overview Dashboard
- **Governance Overview**: See active policies, pending changes, violations
- **System Health**: Controller uptime, schema version, active jobs
- **Role & Access Management**: User counts and permissions by role

#### Navigation Features
- **Governance**: Policy management (read-only in demo)
- **Products**: Requirements management (read-only in demo)
- **Security**: Audit logs and violations tracking
- **Future**: Experimental features

**Key Features to Notice**:
- Debug mode shows repo paths for all data sources
- Red accent colors indicate admin privileges
- Full navigation access to all system areas

### 4. Factory Manager Demo

**Switch to "Factory Manager"** role:

#### Intake Board
- **Kanban-style** requirement management
- **Drag-and-drop** workflow (simulated)
- **Priority badges** (High/Medium/Low)
- **Assignee tracking**

#### Requirement Inventory
- **Table view** of all BRS and FRS
- **Status tracking** (Approved, In-Progress, Validated)
- **Coverage metrics** for each requirement
- **Owner assignments**

#### Release Milestone Tracking
- **Progress bars** showing completion percentage
- **Blocked items** identification
- **Target dates** and milestone tracking

**Key Features to Notice**:
- Blue accent colors for manager role
- Focus on requirements and traceability
- No access to system governance or security

### 5. Factory Operator Demo

**Switch to "Factory Operator"** role:

#### Active Tasks
- **Personal dashboard** showing only assigned work
- **Task cards** with detailed implementation info
- **Branch and PR information**
- **CI status** and test coverage
- **Action buttons** for common tasks

#### Recently Completed
- **Historical view** of completed work
- **Merged PRs** and their dates
- **Achievement tracking**

**Key Features to Notice**:
- Green accent colors for operator role
- Simplified navigation (only relevant sections)
- Task-focused interface with minimal distractions
- No access to high-level planning or governance

### 6. QA Reviewer Demo

**Switch to "QA Reviewer"** role:

#### Validation Queue
- **Pending UAT assignments**
- **Test case status tracking**
- **Priority-based organization**
- **Linked FRS information**

#### Validation Summary
- **Sprint metrics** (total validated, approval rates)
- **Average validation time**
- **Success/failure tracking**

**Key Features to Notice**:
- Yellow/orange accent colors for QA role
- Focus on testing and validation workflows
- Access to defect management
- Traceability audit capabilities

### 7. Viewer Demo

**Switch to "Viewer"** role:

#### Analytics Dashboard
- **Executive-level metrics**
- **Release readiness indicators**
- **Historical trend analysis**
- **KPI monitoring**

**Key Features to Notice**:
- Gray accent colors for viewer role
- Extremely limited navigation (Analytics and Wiki only)
- Read-only interface with no edit controls
- Focus on high-level reporting and insights

## 🧪 Testing the System

### Run the Test Suite

1. **Navigate to**: `http://localhost:8000/tests.html`
2. **Click "Run All Tests"** to execute the complete test suite
3. **Review results** for each test category:
   - Git Operations Tests
   - UI Component Tests  
   - Integration Tests
   - Performance Tests

### Test Categories Explained

#### Git Operations Tests
- **Issue Management**: Create, read, update, search issues
- **Label Operations**: Create and manage labels
- **Repository Stats**: Fetch repository statistics
- **File Operations**: Read configuration files

#### UI Component Tests
- **Role Switching**: Verify role-based UI changes
- **Navigation**: Test sidebar navigation rendering
- **Content Display**: Validate page content rendering
- **Responsive Design**: Test different screen sizes

#### Integration Tests
- **Data Flow**: Test Git API to UI data integration
- **Workflow Validation**: End-to-end requirement lifecycle
- **Multi-role Access**: Verify role-based data filtering
- **Issue Lifecycle**: Complete issue management workflow

#### Performance Tests
- **Load Times**: Page load performance measurement
- **Data Fetching**: API response time validation
- **UI Rendering**: Component rendering speed
- **Memory Usage**: Memory consumption monitoring

## 🔍 Debug Mode Features

The application includes **debug mode** that shows repository paths for all data sources:

### Debug Information Display
- **Panel Sources**: Each panel shows where data is fetched from
- **Git Paths**: Repository file paths are displayed
- **API Endpoints**: Shows which API calls are made
- **Data Flow**: Tracks data from Git to UI

### Example Debug Outputs
```
Generated via controller synthesis from /factory/governance.yml
Data fetched from /requirements/intake/*.yml
Controller v1.3.0 telemetry stream
Validation metrics from /metrics/validation.yml
```

## 🎯 Key Demonstration Points

### 1. Role-Based UI Segregation
- **Complete interface changes** based on user role
- **Information filtering** - each role sees only relevant data
- **Permission enforcement** - UI prevents unauthorized actions
- **Workflow optimization** - interfaces match user mental models

### 2. Git as Database
- **All data stored in Git** - issues, labels, projects, files
- **Version control** for all requirements and changes
- **Audit trail** automatically maintained by Git
- **Collaborative workflow** through Git operations

### 3. Traceability Enforcement
- **Automatic linking** between BRS → FRS → Implementation
- **Status validation** - requirements can't progress without proper linkage
- **Audit compliance** - complete traceability for CMMI-5
- **Visual traceability graphs** showing requirement relationships

### 4. Modern UX/UI Design
- **Terminal-inspired aesthetic** with dark theme
- **Consistent design system** across all components
- **Responsive design** works on all screen sizes
- **Accessibility features** for inclusive design

## 🚀 Next Steps

After exploring the demo:

1. **Customize for your organization**:
   - Update Git repository configuration
   - Modify role definitions and permissions
   - Add your specific labels and workflows

2. **Integrate with real Git repository**:
   - Configure GitHub/GitLab API access
   - Set up authentication tokens
   - Deploy to production environment

3. **Extend functionality**:
   - Add new roles and permissions
   - Implement additional Git operations
   - Create custom workflows and automation

4. **Scale the system**:
   - Set up multiple repositories
   - Implement multi-tenant architecture
   - Add advanced analytics and reporting

## 📞 Support

For questions or issues with the demo:
- Check the browser console for any errors
- Review the test suite results
- Consult the comprehensive README.md
- Create GitHub issues for bugs or feature requests

---

**Enjoy exploring the Factory UI system! 🎉**
