const db = require('../config/db');
const bcrypt = require('bcrypt'); // Make sure bcrypt is required

// Get all users
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Get user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(result[0]);
  });
};

// Create new user
exports.createUser = async (req, res) => {
  const { name, email, password, role, number, address, companyId } = req.body;

  try {
    // Check if user already exists
    const [user] = await db.execute(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );
    if (user.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const values = [
      name,
      email,
      hashedPassword,
      role,
      number,
      address,
      companyId,
    ];

    // Insert user
    await db.execute(
      'INSERT INTO users (`full_name`, `email`, `password`, `role`, `phone`, `address`, `company_id`) VALUES (?, ?, ?, ?, ?, ?, ?)',
      values
    );

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  db.query(
    'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
    [name, email, role, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ id, name, email, role });
    }
  );
};

// Delete user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
};
