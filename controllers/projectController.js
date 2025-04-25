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

exports.createProject = (req, res) => {
  const { name, description, startDate, endDate, status, createdBy } = req.body;
  db.query('INSERT INTO projects (name, description, start_date, end_date, status, created_by) VALUES (?, ?, ?, ?, ?, ?)', [name, description, startDate, endDate, status, createdBy], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name, description, startDate, endDate, status, createdBy });
  });
};

exports.updateProject = (req, res) => {
  const { id } = req.params;
  const { name, description, startDate, endDate, status, createdBy } = req.body;
  db.query('UPDATE projects SET name = ?, description = ?, start_date = ?, end_date = ?, status = ?, created_by = ? WHERE id = ?', [name, description, startDate, endDate, status, createdBy], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ id, name, description, startDate, endDate, status, createdBy });
  });
};

exports.deleteProject = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM projects WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
};
