const db = require('../config/db');

exports.getAllTask = async (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {

    const [result] = await db.query('SELECT * FROM tasks WHERE company_id = ?', [id]);
    if(result.length === 0){
      return res.status(404).json({ error: 'No Task found'})
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch tasks'});
  }
};

exports.createTask = async (req, res) => {
try {
    const { 
      title,
      description,
      priority,
      assignee,
      status,
      date,
      user_id,
      company_id,
   } = req.body;
  db.query('INSERT INTO tasks (	title,	description,	assigned_to,	created_by,	status,	priority,	due_date, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [title, description, assignee, user_id, status, priority, date, company_id], (err, result) => {
    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: { id: result.insertId, title, description, priority, assignee, status, date, user_id, company_id }
    });
  });
} catch (error) {
    return res.status(500).json({ error: error.message });
  }
  
}

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, assignee, status, date, user_id, company_id } = req.body;
  db.query('UPDATE tasks SET title = ?, description = ?, priority = ?, assigned_to = ?, status = ?, due_date = ?, company_id = ? WHERE id = ?', [title, description, priority, assignee, status, date, company_id, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ id, title, description, priority, assignee, status, date, user_id, company_id });
  });
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
};
