const db = require('../config/db');

// Controller: Get all category
exports.getAllCategory = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM category');
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller: Create a new item for an invoice
exports.createCategory = async (req, res) => {
  const {
      name, description, company_id
  } = req.body;
  if (!name || !description || !company_id) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO category (name, description, company_id) VALUES (?, ?, ?)',
      [name, description, company_id]
    );
    console.log(result);
    
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller: Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching category by ID:', id);

    const [results] = await db.query('SELECT * FROM category WHERE id = ?', [id]);

    console.log('Query Results:', results);

    if (results.length === 0) {
      console.log('No item found.');
      return res.status(404).json({ message: 'No item found for this id.' });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error('Error during DB query:', err);
    res.status(500).json({ error: err.message });
  }
};

// Controller: Get category by company ID and invoice id
exports.getCategoryByCompanyId = async (req, res) => {
  try {
    const { company_id } = req.params;
    console.log('Fetching category by company:', company_id);

    const [results] = await db.query('SELECT * FROM category WHERE company_id = ?', [company_id]);

    console.log('Query Results:', results);

    if (results.length === 0) {
      console.log('No category found.');
      return res.status(404).json({ message: 'No item found for this id.' });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error('Error during DB query:', err);
    res.status(500).json({ error: err.message });
  }
};



// Controller: Update item
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
      const {
      name,

  } = req.body;
    await db.query(
      'UPDATE category SET name = ? WHERE id = ?',
      [name,id]
    );

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller: Delete item
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM category WHERE id = ?', [id]);
    res.status(204).send('deleted');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

