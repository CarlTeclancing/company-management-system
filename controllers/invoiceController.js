const db = require('../config/db');

// Controller: Get all invoices
exports.getAllInvoice = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM invoices');
    
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller: Get invoices by  ID
exports.getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching invoices with ID:', id);

    const [results] = await db.query('SELECT * FROM invoices WHERE id = ?', [id]);
    console.log('before population');
    
    console.log('Query Results:', results);
    
    let finalResult = await Promise.all(
        results.map( async(result) => {
            let [items] = await db.query('Select * from items where invoice_id = ?' ,[result.id])
            result.items = items
            return result
        })
    )
    console.log('after population');
    console.log(finalResult);
    

    if (results.length === 0) {
      console.log('No invoice found.');
      return res.status(404).json({ message: 'No invoice found for this id.' });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error('Error during DB query:', err);
    res.status(500).json({ error: err.message });
  }
};

// Controller: Get invoices by company ID
exports.getInvoiceByCompanyId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching invoices for company ID:', id);

    const [results] = await db.query('SELECT * FROM invoices WHERE company_id = ?', [id]);
    console.log('before population');
    
    console.log('Query Results:', results);
    
    let finalResult = await Promise.all(
        results.map( async(result) => {
            let [items] = await db.query('Select * from items where invoice_id = ?' ,[result.id])
            result.items = items
            return result
        })
    )
    console.log('after population');
    console.log(finalResult);
    

    if (results.length === 0) {
      console.log('No invoice found.');
      return res.status(404).json({ message: 'No invoice found for this company.' });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error('Error during DB query:', err);
    res.status(500).json({ error: err.message });
  }
};

// Controller: Create a new invoice
exports.createInvoice = async (req, res) => {
  const {
      title,
      description,
      client_id,
      date,
      user_id,
      company_id,
      
  } = req.body;
  if (!title  || !description || !client_id || !user_id || !company_id) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO invoices (title, description, client, date, created_by, company_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, client_id, new Date() ,user_id, company_id]
    );
    console.log(result);
    
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

// Controller: Update invoice
exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
      const {
      title,
      description,
      client_id,
    //   date,
    //   user_id,
      company_id,
  } = req.body;
    await db.query(
      'UPDATE invoices SET title = ? ,description = ?,client = ? ,company_id=? WHERE id = ?',
      [title, description, client_id , company_id ,id]
    );

    res.status(200).json({ message: 'Invoice updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller: Delete invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM invoices WHERE id = ?', [id]);
    res.status(204).send('deleted');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


