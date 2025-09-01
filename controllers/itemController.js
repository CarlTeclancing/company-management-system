const db = require('../config/db');

// Controller: Get all items
exports.getAllItem = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM items');
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller: Get items by company ID and invoice id
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching items for company ID:', id);

    const [results] = await db.query('SELECT * FROM items WHERE id = ?', [id]);

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

// Controller: Get items by company ID and invoice id
exports.getInvoiceItem = async (req, res) => {
  try {
    const { invoice_id } = req.params;
    console.log('Fetching items of an invoice:', invoice_id);

    const [results] = await db.query('SELECT * FROM items WHERE invoice_id = ?', [invoice_id]);

    console.log('Query Results:', results);

    if (results.length === 0) {
      console.log('No item found.');
      return res.status(404).json({ message: 'No item found for this invoice.' });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error('Error during DB query:', err);
    res.status(500).json({ error: err.message });
  }
};


// Controller: Create a new item for an invoice
exports.addItem = async (req, res) => {
  const {
      name,
      quantity,
      price,
      invoice_id,
  } = req.body;
  if (!name  || !quantity || !price || !invoice_id) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO items (name, quantity, price, invoice_id) VALUES (?, ?, ?, ?)',
      [name, quantity, price ,invoice_id]
    );
    console.log(result);
    
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller: Update item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
      const {
      name,
      quantity,
      price,
    //   invoice_id,
  } = req.body;
    await db.query(
      'UPDATE items SET name = ? ,quantity = ?,price = ?  WHERE id = ?',
      [name, quantity, price ,id]
    );

    res.status(200).json({ message: 'Item updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller: Delete item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM items WHERE id = ?', [id]);
    res.status(204).send('deleted');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




