const db = require('../config/db');

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM company');
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
};

// Get company by ID
exports.getCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('SELECT * FROM company WHERE id = ?', [id]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
};

// Create a new company
exports.createCompany = async (req, res) => {
  const { company, type, currency, employeeCount,} = req.body;

  if (!company || !type || !currency || !employeeCount) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO company (domain, type, currency, employee_count) VALUES (?, ?, ?, ?)',
      [company, type, currency, employeeCount]
    );

    res.status(201).json({
      id: result.insertId,
      company,
      type,
      currency,
      employeeCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create company' });
  }
};

// Update an existing company
exports.updateCompany = async (req, res) => {
  const { id } = req.params;
  const { company, type, currency, employeeCount } = req.body;

  if (!company || !type || !currency || !employeeCount) {
    return res.status(400).json({ error: 'All fields are required for update' });
  }

  try {
    const [result] = await db.query(
      'UPDATE company SET domain = ?, type = ?, currency = ?, employee_count = ? WHERE id = ?',
      [company, type, currency, employeeCount, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json({ id, company, type, currency, employeeCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update company' });
  }
};

// Delete a company
exports.deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM company WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(204).send(); // No content
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete company' });
  }
};
