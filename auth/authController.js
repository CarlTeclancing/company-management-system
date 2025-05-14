const bcrypt = require('bcrypt');
const db = require('../config/db');
const generateToken = require('../utils/generateToken');


// User Signup
exports.register = async (req, res) => {
  const { name, email, password, role, number, address, companyId } = req.body;

  try {
    // Check if user exists
    const [user] = await db.execute(
      'SELECT * FROM users WHERE `email` = ?', 
      [email] // ✅ should be wrapped in array
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

    // Insert user into DB — values wrapped in an array of arrays ✅
    await db.execute(
      'INSERT INTO users (`full_name`, `email`, `password`, `role`, `phone`, `address`, `company_id`) VALUES (?, ?, ?, ?, ?, ?, ?)',
      values //  direct flat array (7 ? marks above matches 7 values)
    );

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.execute(
      'SELECT * FROM users WHERE email = ?', 
      [email] // ✅ correct array binding
    );
    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user[0].id);

    res.status(200).json({
      message: 'Login successful',
      token,
      userData: {
        id: user[0].id,
        full_name: user[0].full_name,
        email: user[0].email,
        role_id: user[0].role_id,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
    console.log(error.message);
  }
};
