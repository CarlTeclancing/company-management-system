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
  const { type, amount, recordedBy, notes, date } = req.body;
  db.query('INSERT INTO projects (type, amount, recorded_by, notes, date) VALUES (?, ?, ?, ?, ?, ?)', [type, amount, recordedBy, notes, date], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, type, amount, recordedBy, notes, date });
  });
};

exports.updateProject = (req, res) => {
  const { id } = req.params;
  const { type, amount, recordedBy, notes, date } = req.body;
  db.query('UPDATE projects SET type = ?, amount = ?, recorded_by = ?, notes = ?, date = ? WHERE id = ?', [type, amount, recordedBy, notes, date], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ id, type, amount, recordedBy, notes, date });
  });
};

exports.deleteProject = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM projects WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
};
