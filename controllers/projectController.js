const db = require('../config/db');

// Controller: Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM projects');
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller: Get project by company ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching projects for company ID:', id);

    const [results] = await db.query('SELECT * FROM projects WHERE company_id = ?', [id]);

    console.log('Query Results:', results);

    if (results.length === 0) {
      console.log('No projects found.');
      return res.status(404).json({ message: 'No projects found for this company.' });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error('Error during DB query:', err);
    res.status(500).json({ error: err.message });
  }
};

// Controller: Create a new project
exports.createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      sdate,
      edate,
      team,
      budget,
      user_id,
      company_id,
    } = req.body;

    const sql = `
      INSERT INTO projects 
      (name, description, start_date, end_date, team, budget, created_by, company_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, description, sdate, edate, team, budget, user_id, company_id];

    const [result] = await db.query(sql, values);

    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project: {
        id: result.insertId,
        name,
        description,
        start_date: sdate,
        end_date: edate,
        team,
        budget,
        created_by: user_id,
        company_id,
      },
    });
  } catch (error) {
    console.error("Unexpected error in createProject:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: error.message,
    });
  }
};

// Controller: Update project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, startDate, endDate, status, createdBy } = req.body;

    await db.query(
      'UPDATE projects SET name = ?, description = ?, start_date = ?, end_date = ?, status = ?, created_by = ? WHERE id = ?',
      [name, description, startDate, endDate, status, createdBy, id]
    );

    res.status(200).json({ message: 'Project updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller: Delete project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM projects WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
