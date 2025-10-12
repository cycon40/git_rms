require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const yaml = require('js-yaml');
const cors = require('cors');
const path = require('path');
const app = express();

// --- Static File Serving ---
app.use(express.static(path.join(__dirname, '.')));

// --- Environment Variable Validation ---
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;
if (!GITHUB_REPOSITORY) {
    console.error('FATAL ERROR: "GITHUB_REPOSITORY" environment variable is not set.');
    process.exit(1);
}
const GITHUB_REPO_URL = `https://api.github.com/repos/${GITHUB_REPOSITORY}`;
console.log(`Configured to use repository: ${GITHUB_REPOSITORY}`);

// --- Middleware to extract Bearer token ---
const extractToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        req.githubToken = authHeader.substring(7, authHeader.length);
        next();
    } else {
        res.status(401).json({ error: 'Authorization token is missing or invalid.' });
    }
};


app.use(cors());
app.use(express.json());

function extractFencedMetadata(body) {
  if (!body) return null;
  const match = body.match(/---meta: v1\n([\s\S]*?)\n---/);
  try {
    return match ? yaml.load(match[1]) : null;
  } catch (e) {
    console.error('Error parsing YAML metadata:', e);
    return null;
  }
}

// Generic Issue Getter
async function getIssue(issueNumber, token) {
    const url = `${GITHUB_REPO_URL}/issues/${issueNumber}`;
    const response = await fetch(url, {
        headers: { Authorization: `token ${token}` }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch issue #${issueNumber}: ${response.statusText}`);
    }
    return response.json();
}

// --- API Endpoints ---

// GET /api/user/role - Determine user role based on GitHub team membership
app.get('/api/user/role', extractToken, async (req, res) => {
    try {
        const response = await fetch('https://api.github.com/user/teams', {
            headers: { Authorization: `token ${req.githubToken}` },
        });

        // Handle cases where the token may not have permission to read team membership
        if (!response.ok) {
            console.warn(`Could not fetch user teams (Status: ${response.status}). This can happen with fine-grained PATs. Assigning a default 'operator' role.`);
            return res.json({ role: 'operator' });
        }

        const teams = await response.json();
        const teamSlugs = teams.map(team => team.slug);
        console.log(`User belongs to teams: ${teamSlugs.join(', ')}`);

        // Role hierarchy: admin > manager > qa > operator > viewer
        let role = 'viewer';
        if (teamSlugs.includes('factory-operators')) role = 'operator';
        if (teamSlugs.includes('factory-qa')) role = 'qa';
        if (teamSlugs.includes('factory-managers')) role = 'manager';
        if (teamSlugs.includes('factory-admins')) role = 'admin';

        console.log(`Assigning role: ${role}`);
        res.json({ role });

    } catch (error) {
        console.error('Error determining user role:', error);
        res.status(500).json({ error: 'Failed to determine user role. Please check server logs.' });
    }
});


// GET /api/issues - List issues with filters
app.get('/api/issues', extractToken, async (req, res) => {
  const { labels, state = 'all' } = req.query;
  if (!labels) {
    return res.status(400).json({ error: 'Labels query parameter is required.' });
  }

  const url = `${GITHUB_REPO_URL}/issues?state=${state}&labels=${labels}`;

  try {
    const ghRes = await fetch(url, {
      headers: { Authorization: `token ${req.githubToken}` }
    });

    if (!ghRes.ok) {
        return res.status(ghRes.status).json({ error: `GitHub API error: ${ghRes.statusText}`});
    }

    const issues = await ghRes.json();

    const processedIssues = issues.map(issue => ({
      ...issue,
      metadata: extractFencedMetadata(issue.body)
    }));

    res.json(processedIssues);
  } catch (error) {
      console.error('Error fetching issues:', error);
      res.status(500).json({ error: 'Failed to fetch issues from GitHub.' });
  }
});

// GET /api/issues/:issueNumber - Get a single issue
app.get('/api/issues/:issueNumber', extractToken, async (req, res) => {
    const { issueNumber } = req.params;
    try {
        const issue = await getIssue(issueNumber, req.githubToken);
        issue.metadata = extractFencedMetadata(issue.body);
        res.json(issue);
    } catch (error) {
        console.error(`Error fetching issue #${issueNumber}:`, error);
        res.status(500).json({ error: error.message });
    }
});


// PATCH /api/issues/:issueNumber - Update an issue's metadata
app.patch('/api/issues/:issueNumber', extractToken, async (req, res) => {
  const { issueNumber } = req.params;
  const { metadata, actor } = req.body;

  if (!metadata || !actor) {
      return res.status(400).json({ error: 'Missing "metadata" or "actor" in request body.'});
  }

  try {
    const issue = await getIssue(issueNumber, req.githubToken);

    const newMetaYaml = yaml.dump(metadata);
    const newBody = issue.body.replace(
        /---meta: v1\n([\s\S]*?)\n---/,
        `---meta: v1\n${newMetaYaml}---`
    );

    await fetch(`${GITHUB_REPO_URL}/issues/${issueNumber}`, {
        method: 'PATCH',
        headers: { Authorization: `token ${req.githubToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: newBody })
    });

    const commentBody = `Metadata updated by @${actor}.`;
    await fetch(`${GITHUB_REPO_URL}/issues/${issueNumber}/comments`, {
        method: 'POST',
        headers: { Authorization: `token ${req.githubToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: commentBody })
    });

    res.status(200).json({ message: 'Update successful' });

  } catch (error) {
      console.error(`Error updating issue #${issueNumber}:`, error);
      res.status(500).json({ error: error.message });
  }
});

// POST /api/issues - Create a new issue
app.post('/api/issues', extractToken, async (req, res) => {
    const { title, body, labels, metadata, actor } = req.body;

    if (!title || !metadata || !actor) {
        return res.status(400).json({ error: 'Missing "title", "metadata", or "actor" in request body.' });
    }

    const metaYaml = yaml.dump(metadata);
    const fullBody = `${body || ''}\n\n---meta: v1\n${metaYaml}---`;

    try {
        const response = await fetch(`${GITHUB_REPO_URL}/issues`, {
            method: 'POST',
            headers: { Authorization: `token ${req.githubToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, body: fullBody, labels })
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: `GitHub API error: ${response.statusText}` });
        }
        
        const newIssue = await response.json();

        const commentBody = `Issue created by @${actor}.`;
        await fetch(`${GITHUB_REPO_URL}/issues/${newIssue.number}/comments`, {
            method: 'POST',
            headers: { Authorization: `token ${req.githubToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ body: commentBody })
        });

        res.status(201).json(newIssue);

    } catch (error) {
        console.error('Error creating issue:', error);
        res.status(500).json({ error: 'Failed to create issue.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
