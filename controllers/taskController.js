const db = require('../config/db');

exports.getAllTask = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM tasks');
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query('SELECT * FROM tasks WHERE company_id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'No Task found' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
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

    const [result] = await db.query(
      'INSERT INTO tasks (title, description, assigned_to, created_by, status, priority, due_date, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, assignee, user_id, status, priority, date, company_id]
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: {
        id: result.insertId,
        title,
        description,
        priority,
        assignee,
        status,
        date,
        user_id,
        company_id
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const {
    status
  } = req.body;

  try {
    await db.query(
      'UPDATE tasks SET status = ? WHERE id = ?',
      [status, id]
    );

    res.status(200).json({
      id,
      description,
      priority,
      assignee,
      status,
      date,
      user_id,
      company_id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
