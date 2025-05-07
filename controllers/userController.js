const db = require('../config/db');

exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result[0]);
  });
};

exports.createUser = (req, res) => {
  const { 
    name,
    email,
    password,
    number,
    country,
    address,
    role,
   } = req.body;
  db.query('INSERT INTO users (full_name, email, password, department_id, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?)', [    name,
    email,
    password,
    number,
    country,
    address,
    role,], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name, email, role });
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  db.query('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?', [name, email, role, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ id, name, email, role });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
};
