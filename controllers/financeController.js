const db = require('../config/db');

exports.getAllFinances = (req, res) => {
  db.query('SELECT * FROM finances', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getProFinancesById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM finances WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result[0]);
  });
};

exports.createProFinances = (req, res) => {
  const { type, amount, recordedBy, notes, date } = req.body;
  db.query('INSERT INTO finances (type, amount, recorded_by, notes, date) VALUES (?, ?, ?, ?, ?, ?)', [type, amount, recordedBy, notes, date], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, type, amount, recordedBy, notes, date });
  });
};

exports.updateProFinances = (req, res) => {
  const { id } = req.params;
  const { type, amount, recordedBy, notes, date } = req.body;
  db.query('UPDATE finances SET type = ?, amount = ?, recorded_by = ?, notes = ?, date = ? WHERE id = ?', [type, amount, recordedBy, notes, date], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ id, type, amount, recordedBy, notes, date });
  });
};

exports.deleteProFinances = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM finances WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
};
