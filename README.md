# LEAN H₂ FACTORY UI - Git-native Requirements Management System

A comprehensive web-based UI wrapper that sits on top of Git/GitHub/GitLab to provide **role-based requirements management** aligned with CMMI-5 practices, enabling traceability from business requirements through implementation to validation without requiring users to understand Git internals.

## 🎯 Overview

This application provides a **role-aware UI layer** that uses Git/GitHub/GitLab as the data store, providing filtered views and enforced workflows for five distinct user tiers:

- **Factory Admin** - Full system access, governance control, audit capabilities
- **Factory Manager** - Requirements management, approvals, release planning
- **Factory Operator** - Task execution, implementation, PR management
- **Viewer** - Read-only analytics, reporting, executive dashboards
- **QA Reviewer** - Validation, testing, compliance, defect management

## 🚀 Features

### Core Capabilities

1. **Role-Based Access & Views (5 Tiers)**
   - Each role sees only relevant information and controls
   - Enforced governance rules and traceability requirements
   - Customized navigation and workflows per role

2. **Artifact Management**
   - Business Requirements (BRS) - High-level business needs
   - Functional Requirements (FRS) - Detailed specifications linked to BRS
   - User Acceptance Tests (UAT) - Validation records
   - Causal Analysis Reports (CAR) - Root cause analysis for defects

3. **Traceability Enforcement**
   - Automatic linking: Intake → BRS → FRS → Branch → PR → Tests → Release
   - Enforced rules (e.g., "FRS must link to approved BRS")
   - Complete audit trail generation
   - Debug mode shows repo paths for all data sources

4. **Label-Based Workflow Schema**
   - Pre-defined label taxonomy for filtering and automation
   - Artifact types: `artifact:BRS`, `artifact:FRS`, `artifact:UAT`, `artifact:Bug`
   - Role assignments: `role:FactoryManager`, `role:FactoryOperator`, etc.
   - Workflow status: `status:Draft`, `status:Approved`, `status:InProgress`, `status:Done`
   - Priority levels: `priority:High/Medium/Low`

5. **Git Integration**
   - GitHub/GitLab API for issue, label, project, and PR management
   - CI/CD pipeline triggers and status checks
   - Automated branch creation and PR scaffolding
   - Real-time data synchronization

## 📁 Project Structure

```
factory-ui/
├── index.html          # Main application entry point
├── styles.css          # Comprehensive design system and component styles
├── app.js             # Main application logic and role-based UI
├── git-api.js         # Git/GitHub/GitLab API integration
├── tests.html         # Comprehensive test suite
└── README.md          # This documentation
```

## 🎨 Design System

The application follows a comprehensive design system with:

### Color Palette
- **Background**: Dark theme with `#0a1628` primary background
- **Accent**: `#4a9eff` primary accent with glow effects
- **Status Colors**: Success (`#10b981`), Warning (`#f59e0b`), Error (`#ef4444`), Info (`#3b82f6`)

### Typography
- **Primary Font**: Inter (system fallbacks)
- **Monospace**: SF Mono, Consolas, Monaco
- **Scale**: 12px to 24px with consistent spacing

### Components
- **Panels**: Card-based layout with hover effects
- **Tables**: Data tables with interactive rows
- **Badges**: Status indicators with color coding
- **Buttons**: Primary, secondary, danger, and ghost variants
- **Navigation**: Sidebar with role-based filtering

## 🏗️ Architecture

### Frontend Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Factory UI Application                    │
├─────────────────────────────────────────────────────────────┤
│  Role-Based UI Layer                                        │
│  ├─ Admin Dashboard    ├─ Manager Dashboard                 │
│  ├─ Operator Dashboard ├─ Viewer Dashboard                  │
│  └─ QA Dashboard      ├─ Role Detection & Filtering        │
├─────────────────────────────────────────────────────────────┤
│  Git API Integration Layer                                  │
│  ├─ GitHub/GitLab API ├─ Mock Data (for demo)              │
│  ├─ Issue Management  ├─ Label Management                   │
│  ├─ Project Tracking  ├─ Pull Request Integration           │
│  └─ Repository Stats  ├─ Branch Operations                  │
├─────────────────────────────────────────────────────────────┤
│  Git Repository (Data Store)                                │
│  ├─ Issues (BRS/FRS/UAT/Bugs)                              │
│  ├─ Labels (Artifact Types, Status, Priority)              │
│  ├─ Projects (Releases, Milestones)                        │
│  ├─ Pull Requests (Implementation)                          │
│  └─ Files (Configuration, Documentation)                   │
└─────────────────────────────────────────────────────────────┘
```

### Role-Based Data Access

| Role | Data Access | Controls | Navigation |
|------|-------------|----------|------------|
| **Admin** | All data, full audit | Full system control | All sections |
| **Manager** | BRS/FRS, metrics | Approve, prioritize | Products, Analytics, Approvals |
| **Operator** | Assigned FRS only | Implement, test | Personal tasks |
| **Viewer** | Aggregated metrics | Export reports | Analytics only |
| **QA** | FRS/UAT, defects | Validate, approve | Test artifacts, audit |

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for development)
- Git repository access (GitHub/GitLab or local)

### Installation

1. **Clone or download the project files**
   ```bash
   git clone <repository-url>
   cd factory-ui
   ```

2. **Start a local web server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

4. **Select your role** from the modal dialog

### Configuration

#### Git Integration Setup
1. **For GitHub/GitLab**: Update `git-api.js` with your repository details:
   ```javascript
   this.baseUrl = 'https://api.github.com'; // or GitLab API URL
   this.repoOwner = 'your-org';
   this.repoName = 'your-repo';
   ```

2. **Authentication**: Set your API token:
   ```javascript
   gitAPI.setToken('your-github-token');
   ```

3. **Repository Structure**: Ensure your repository follows the expected structure:
   ```
   your-repo/
   ├── requirements/
   │   ├── intake/          # New business requirements
   │   ├── brs/             # Business requirements
   │   └── frs/             # Functional requirements
   ├── factory/
   │   ├── governance.yml   # System policies
   │   └── rbac.yml         # Role-based access control
   ├── metrics/
   │   ├── controller.yml   # System metrics
   │   └── validation.yml   # QA metrics
   └── .github/
       └── ISSUE_TEMPLATE/  # Standardized templates
   ```

## 🧪 Testing

The application includes a comprehensive test suite accessible at `/tests.html`:

### Test Categories

1. **Git Operations Tests**
   - Issue creation, updating, searching
   - Label management
   - Repository statistics
   - File content operations

2. **UI Component Tests**
   - Role selection and switching
   - Navigation rendering
   - Content display
   - Responsive behavior

3. **Integration Tests**
   - End-to-end workflows
   - Data flow validation
   - Multi-role data access
   - Issue lifecycle management

4. **Performance Tests**
   - Page load times
   - Data fetch performance
   - UI rendering speed
   - Memory usage monitoring

### Running Tests

1. **Open the test suite**: Navigate to `http://localhost:8000/tests.html`
2. **Run individual test categories** or **Run All Tests**
3. **View results** with pass/fail status and detailed logs
4. **Check performance metrics** and memory usage

## 📊 Role-Specific Features

### Factory Admin
- **Governance Console**: Policy management, RBAC configuration
- **System Health**: Controller metrics, uptime monitoring
- **Audit Logs**: Complete system activity tracking
- **Role Management**: User assignments and permissions
- **Override Controls**: Emergency system interventions

### Factory Manager
- **Intake Board**: Kanban-style requirement management
- **Traceability Graph**: Visual requirement-to-implementation mapping
- **Release Planning**: Milestone tracking and progress monitoring
- **Analytics Dashboard**: Team velocity, defect trends, cost metrics
- **Approval Workflow**: BRS/FRS review and approval process

### Factory Operator
- **Task Dashboard**: Personal assignment list with priorities
- **Implementation Tools**: Branch creation, PR management
- **Test Execution**: Local and CI test result monitoring
- **Progress Tracking**: Completion status and coverage metrics
- **Documentation Access**: FRS specifications and acceptance criteria

### Viewer (Analytics Only)
- **Executive Dashboard**: High-level metrics and trends
- **Release Readiness**: Progress toward milestones
- **Historical Trends**: Performance over time
- **Export Capabilities**: Report generation and scheduling
- **KPI Monitoring**: Key performance indicators

### QA Reviewer
- **Validation Queue**: UAT assignments and priorities
- **Test Execution**: Comprehensive test case management
- **Defect Management**: Bug tracking and resolution workflow
- **Traceability Audit**: Compliance verification
- **Approval Decisions**: UAT approval/rejection with conditions

## 🔧 Customization

### Adding New Roles
1. Update `navConfig` in `app.js`
2. Add role-specific rendering methods
3. Update permission checking logic
4. Add role badge styling in `styles.css`

### Extending Git Integration
1. Add new API methods to `GitAPI` class
2. Update mock data structure if needed
3. Implement real API calls for production
4. Add corresponding UI components

### Customizing Labels and Workflows
1. Update label definitions in `git-api.js`
2. Modify workflow logic in `app.js`
3. Add new status badges in `styles.css`
4. Update validation rules

## 🚀 Deployment

### Production Deployment
1. **Configure real Git API endpoints**
2. **Set up authentication tokens**
3. **Deploy to web server** (Apache, Nginx, etc.)
4. **Configure HTTPS** for security
5. **Set up monitoring** and logging

### Docker Deployment
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Cloud Deployment
- **AWS**: S3 + CloudFront for static hosting
- **Azure**: Static Web Apps
- **Google Cloud**: Firebase Hosting
- **Vercel/Netlify**: Direct Git integration

## 🔒 Security Considerations

1. **API Token Security**: Store tokens securely, use environment variables
2. **HTTPS Enforcement**: Always use HTTPS in production
3. **CORS Configuration**: Properly configure cross-origin requests
4. **Input Validation**: Sanitize all user inputs
5. **Access Control**: Implement proper RBAC on the backend
6. **Audit Logging**: Log all sensitive operations

## 📈 Performance Optimization

1. **Lazy Loading**: Load components on demand
2. **Caching**: Implement client-side caching for API responses
3. **Compression**: Use gzip compression for assets
4. **CDN**: Use content delivery networks for static assets
5. **Monitoring**: Implement performance monitoring

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests** for new functionality
5. **Run the test suite** to ensure everything passes
6. **Submit a pull request**

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Issues**: Create GitHub issues for bugs and feature requests
- **Documentation**: Check this README and inline code comments
- **Testing**: Use the comprehensive test suite for validation

## 🔮 Future Enhancements

- **Real-time Collaboration**: WebSocket-based live updates
- **Advanced Analytics**: Machine learning insights
- **Mobile App**: Native mobile applications
- **API Gateway**: Centralized API management
- **Multi-tenant Support**: Multiple organization support
- **Advanced Workflows**: Custom workflow definitions
- **Integration Hub**: Third-party tool integrations

---

**Built with ❤️ for Git-native Requirements Management**
