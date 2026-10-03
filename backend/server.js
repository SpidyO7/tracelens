const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Get all profiles
app.get('/api/profiles', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM profiles');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get profile by username
app.get('/api/profiles/:username', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM profiles WHERE username = $1', [req.params.username]);
    if (rows.length === 0) return res.status(404).json({ error: 'Profile not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get dashboard summary stats
app.get('/api/dashboard/:profileId', async (req, res) => {
  try {
    const { profileId } = req.params;
    
    const projectsCount = await db.query('SELECT count(*) FROM projects WHERE profile_id = $1', [profileId]);
    const reposCount = await db.query('SELECT count(*) FROM repositories r JOIN projects p ON r.project_id = p.id WHERE p.profile_id = $1', [profileId]);
    const techCount = await db.query('SELECT count(DISTINCT name) FROM technologies t JOIN repositories r ON t.repository_id = r.id JOIN projects p ON r.project_id = p.id WHERE p.profile_id = $1', [profileId]);
    const activitiesCount = await db.query('SELECT count(*) FROM activities WHERE profile_id = $1', [profileId]);
    
    res.json({
      projects: parseInt(projectsCount.rows[0].count),
      repositories: parseInt(reposCount.rows[0].count),
      technologies: parseInt(techCount.rows[0].count),
      activities: parseInt(activitiesCount.rows[0].count),
      organizations: 2 // Hardcoded for demo
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get relationships for graph
app.get('/api/graph/:profileId', async (req, res) => {
  try {
    const { profileId } = req.params;
    
    const profile = await db.query('SELECT * FROM profiles WHERE id = $1', [profileId]);
    const projects = await db.query('SELECT * FROM projects WHERE profile_id = $1', [profileId]);
    const repos = await db.query('SELECT r.*, p.name as project_name FROM repositories r JOIN projects p ON r.project_id = p.id WHERE p.profile_id = $1', [profileId]);
    const techs = await db.query('SELECT t.* FROM technologies t JOIN repositories r ON t.repository_id = r.id JOIN projects p ON r.project_id = p.id WHERE p.profile_id = $1', [profileId]);
    
    res.json({
      profile: profile.rows[0],
      projects: projects.rows,
      repositories: repos.rows,
      technologies: techs.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get timeline activities
app.get('/api/activities/:profileId', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM activities WHERE profile_id = $1 ORDER BY date DESC', [req.params.profileId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
