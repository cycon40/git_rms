# server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const yaml = require('js-yaml');
const cors = require('cors');
const app = express();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO_URL = 'https://api.github.com/repos/cycon40/git_rms';

if (!GITHUB_TOKEN) {
    console.error('FATAL ERROR: GITHUB_TOKEN is not defined.');
    process.exit(1);
}

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
async function getIssue(issueNumber) {
    const url = `${GITHUB_REPO_URL}/issues/${issueNumber}`;
    const response = await fetch(url, {
        headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch issue #${issueNumber}: ${response.statusText}`);
    }
    return response.json();
}

// GET /api/issues - List issues with filters
app.get('/api/issues', async (req, res) => {
  const { labels, state = 'all' } = req.query;
  if (!labels) {
    return res.status(400).json({ error: 'Labels query parameter is required.' });
  }

  const url = `${GITHUB_REPO_URL}/issues?state=${state}&labels=${labels}`;

  try {
    const ghRes = await fetch(url, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
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
app.get('/api/issues/:issueNumber', async (req, res) => {
    const { issueNumber } = req.params;
    try {
        const issue = await getIssue(issueNumber);
        issue.metadata = extractFencedMetadata(issue.body);
        res.json(issue);
    } catch (error) {
        console.error(`Error fetching issue #${issueNumber}:`, error);
        res.status(500).json({ error: error.message });
    }
});


// PATCH /api/issues/:issueNumber - Update an issue's metadata
app.patch('/api/issues/:issueNumber', async (req, res) => {
  const { issueNumber } = req.params;
  const { metadata, actor } = req.body;

  if (!metadata || !actor) {
      return res.status(400).json({ error: 'Missing "metadata" or "actor" in request body.'});
  }

  try {
    const issue = await getIssue(issueNumber);

    const newMetaYaml = yaml.dump(metadata);
    const newBody = issue.body.replace(
        /---meta: v1\n([\s\S]*?)\n---/,
        `---meta: v1\n${newMetaYaml}---`
    );

    // Update the issue body
    await fetch(`${GITHUB_REPO_URL}/issues/${issueNumber}`, {
        method: 'PATCH',
        headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: newBody })
    });

    // Add an audit comment
    const commentBody = `Metadata updated to version ${metadata.schema_version || 'N/A'} by @${actor}.`;
    await fetch(`${GITHUB_REPO_URL}/issues/${issueNumber}/comments`, {
        method: 'POST',
        headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: commentBody })
    });

    res.status(200).json({ message: 'Update successful' });

  } catch (error) {
      console.error(`Error updating issue #${issueNumber}:`, error);
      res.status(500).json({ error: error.message });
  }
});

// POST /api/issues - Create a new issue
app.post('/api/issues', async (req, res) => {
    const { title, body, labels, metadata, actor } = req.body;

    if (!title || !metadata || !actor) {
        return res.status(400).json({ error: 'Missing "title", "metadata", or "actor" in request body.' });
    }

    // Compose the full body with metadata
    const metaYaml = yaml.dump(metadata);
    const fullBody = `${body || ''}\n\n---meta: v1\n${metaYaml}---`;

    try {
        const response = await fetch(`${GITHUB_REPO_URL}/issues`, {
            method: 'POST',
            headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, body: fullBody, labels })
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: `GitHub API error: ${response.statusText}` });
        }
        
        const newIssue = await response.json();

        // Add audit comment
        const commentBody = `Issue created by @${actor}.`;
        await fetch(`${GITHUB_REPO_URL}/issues/${newIssue.number}/comments`, {
            method: 'POST',
            headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
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
