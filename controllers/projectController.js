const db = require('../config/db');

exports.getAllProjects = (req, res) => {
  db.query('SELECT * FROM projects', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getProjectById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM projects WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result[0]);
  });
};

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

    const query = `
      INSERT INTO projects 
      (name, description, start_date, end_date, team, budget, created_by, company_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      name,
      description,
      sdate,
      edate,
      team,
      budget,
      user_id,
      company_id,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Database error during project creation:", err);
        return res.status(500).json({
          success: false,
          message: "An error occurred while creating the project.",
          error: err.message,
        });
      }

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


exports.updateProject = (req, res) => {
  const { id } = req.params;
  const { name, description, startDate, endDate, status, createdBy } = req.body;
  db.query('UPDATE projects SET name = ?, description = ?, start_date = ?, end_date = ?, status = ?, created_by = ? WHERE id = ?', [name, description, startDate, endDate, status, createdBy], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    //res.status(200).json({ id, name, description, startDate, endDate, status, createdBy });
    res.status(201).json({ message: 'User registered successfully' });
  });
};

exports.deleteProject = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM projects WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
};
