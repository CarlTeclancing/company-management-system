const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get users by company ID
exports.getUsersByCompanyId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE company_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No users found for this company' });
    }
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Create new user
exports.createUser = async (req, res) => {
  const { name, email, password, role, number, address, companyId } = req.body;

  try {
    // Check if user already exists
    const [user] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (user.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.query(
      'INSERT INTO users (`full_name`, `email`, `password`, `role`, `phone`, `address`, `company_id`) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, number, address, companyId]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, number, address, companyId } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE users SET full_name = ?, email = ?, role = ?, phone = ?, address = ?, company_id = ? WHERE id = ?',
      [name, email, role, number, address, companyId, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      userInfo: { id, name, email, role, number, address, companyId }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
