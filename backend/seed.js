const db = require('./db');

async function seed() {
  console.log('Seeding demo database...');
  
  try {
    // Drop tables if exist
    await db.query(`DROP TABLE IF EXISTS technologies, activities, repositories, projects, profiles CASCADE;`);
    
    // Create tables
    await db.query(`
      CREATE TABLE profiles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        bio TEXT,
        is_demo BOOLEAN DEFAULT true
      );
      
      CREATE TABLE projects (
        id SERIAL PRIMARY KEY,
        profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT
      );
      
      CREATE TABLE repositories (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        language VARCHAR(50),
        stars INTEGER DEFAULT 0,
        forks INTEGER DEFAULT 0,
        url VARCHAR(255),
        created_at TIMESTAMP,
        updated_at TIMESTAMP
      );
      
      CREATE TABLE technologies (
        id SERIAL PRIMARY KEY,
        repository_id INTEGER REFERENCES repositories(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL
      );
      
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      );
    `);
    
    console.log('Tables created. Inserting demo data...');
    
    // Insert Profile
    const profileRes = await db.query(`
      INSERT INTO profiles (name, username, bio) 
      VALUES ('Alex Morgan', 'alexmorgan-dev', 'Full-stack developer building tools for education and productivity. DEMO PROFILE — FICTIONAL DATA')
      RETURNING id;
    `);
    const profileId = profileRes.rows[0].id;
    
    // Insert Projects
    const p1 = await db.query(`INSERT INTO projects (profile_id, name, description) VALUES ($1, 'SmartCampus', 'Campus management ecosystem') RETURNING id;`, [profileId]);
    const p2 = await db.query(`INSERT INTO projects (profile_id, name, description) VALUES ($1, 'TaskFlow', 'Collaborative productivity app') RETURNING id;`, [profileId]);
    const p3 = await db.query(`INSERT INTO projects (profile_id, name, description) VALUES ($1, 'WeatherAPI', 'Weather data service') RETURNING id;`, [profileId]);
    
    const proj1 = p1.rows[0].id;
    const proj2 = p2.rows[0].id;
    const proj3 = p3.rows[0].id;
    
    // Insert Repositories
    const r1 = await db.query(`INSERT INTO repositories (project_id, name, description, language, stars, forks, created_at, updated_at) VALUES ($1, 'smart-campus-api', 'Campus management backend API.', 'Java', 42, 12, '2023-02-10', '2023-11-05') RETURNING id;`, [proj1]);
    const r2 = await db.query(`INSERT INTO repositories (project_id, name, description, language, stars, forks, created_at, updated_at) VALUES ($1, 'taskflow-web', 'Collaborative productivity application frontend.', 'TypeScript', 31, 8, '2024-05-12', '2024-09-20') RETURNING id;`, [proj2]);
    const r3 = await db.query(`INSERT INTO repositories (project_id, name, description, language, stars, forks, created_at, updated_at) VALUES ($1, 'weather-service', 'Microservice for weather tracking.', 'Python', 89, 25, '2025-01-15', '2025-10-01') RETURNING id;`, [proj3]);
    const r4 = await db.query(`INSERT INTO repositories (project_id, name, description, language, stars, forks, created_at, updated_at) VALUES ($1, 'smart-campus-db', 'PostgreSQL schemas for SmartCampus.', 'SQL', 10, 2, '2023-02-12', '2023-04-10') RETURNING id;`, [proj1]);
    
    // Insert Technologies
    const insertTech = async (repoId, tech) => {
      await db.query(`INSERT INTO technologies (repository_id, name) VALUES ($1, $2)`, [repoId, tech]);
    };
    
    await insertTech(r1.rows[0].id, 'Java');
    await insertTech(r1.rows[0].id, 'Spring Boot');
    await insertTech(r2.rows[0].id, 'React');
    await insertTech(r2.rows[0].id, 'Node.js');
    await insertTech(r2.rows[0].id, 'TypeScript');
    await insertTech(r3.rows[0].id, 'Python');
    await insertTech(r3.rows[0].id, 'FastAPI');
    await insertTech(r4.rows[0].id, 'PostgreSQL');
    
    // Insert Activities
    await db.query(`INSERT INTO activities (profile_id, title, date) VALUES ($1, 'Created SmartCampus', '2023-02-10');`, [profileId]);
    await db.query(`INSERT INTO activities (profile_id, title, date) VALUES ($1, 'Released TaskFlow', '2024-05-12');`, [profileId]);
    await db.query(`INSERT INTO activities (profile_id, title, date) VALUES ($1, 'Added PostgreSQL integration', '2025-03-20');`, [profileId]);
    await db.query(`INSERT INTO activities (profile_id, title, date) VALUES ($1, 'Released WeatherAPI', '2026-01-15');`, [profileId]);
    
    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
