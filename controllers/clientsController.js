const db = require('../config/db');

// Get all companies
exports.getAllClients = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM clients');
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
};

// Get client by ID
exports.getClientById = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('SELECT * FROM clients WHERE id = ?', [id]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Clients not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
};

// Get company by ID
exports.getClientByCompanyId = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('SELECT * FROM clients WHERE company_id = ?', [id]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Clients not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
};

// Create a new company
exports.createClient = async (req, res) => {
  const { name, email, number, address, companyId } = req.body;

  if (!name || !email || !number || !address || !companyId) {
    console.log(req.body)
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO clients (name, email, number, address, company_id) VALUES (?, ?, ?, ?, ?)',
      [ name, email, number, address, companyId ]
    );

    res.status(201).json({
      id: result.insertId,
       name, 
       email, 
       number, 
       address, 
       companyId 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create client' });
  }
};

// Update an existing company
exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const {  name, email, number, address  } = req.body;

  if (!name || !email || !number || !address ) {

    return res.status(400).json({ error: 'All fields are required for update' });
  }

  try {
    const [result] = await db.query(
      'UPDATE clients SET name = ?, email = ?, number = ?, address = ? WHERE id = ?',
      [ name, email, number, address, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Clients not found' });
    }

    res.status(200).json({ id, name, email, number, address, });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update Client' });
  }
};

// Delete a company
exports.deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM clients WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'client not found' });
    }

    res.status(204).send(); // No content
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete client' });
  }
};
