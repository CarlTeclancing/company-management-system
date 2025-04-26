const db = require('../config/db');

exports.getAllTask = (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getTaskById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result[0]);
  });
};

exports.createTask = (req, res) => {
  const { title, description, asignedTo, createdBy, status, priority, dueDate } = req.body;
  db.query('INSERT INTO tasks (title, description, start_date, end_date, status, created_by) VALUES (?, ?, ?, ?, ?, ?)', [title, description, asignedTo, createdBy, status, priority, dueDate], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, title, description, asignedTo, createdBy, status, priority, dueDate});
  });
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, asignedTo, createdBy, status, priority, dueDate } = req.body;
  db.query('UPDATE tasks SET name = ?, description = ?, start_date = ?, end_date = ?, status = ?, created_by = ? WHERE id = ?', [title, description, asignedTo, createdBy, status, priority, dueDate], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ id, title, description, asignedTo, createdBy, status, priority, dueDate });
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
};
