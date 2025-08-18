const db = require('../config/db');

exports.getAllInventory = (req, res) => {
  db.query('SELECT * FROM inventory', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getInventoryById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM inventory WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result[0]);
  });
};

exports.addInventory = (req, res) => {
  const { name, description, startDate, endDate, status, createdBy } = req.body;
  db.query('INSERT INTO projects (name, description, start_date, end_date, status, created_by) VALUES (?, ?, ?, ?, ?, ?)', [name, description, startDate, endDate, status, createdBy], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name, description, startDate, endDate, status, createdBy });
  });
};

exports.updateProject = (req, res) => {
  const { id } = req.params;
  const { name, description, startDate, endDate, status, createdBy } = req.body;
  db.query('UPDATE projects SET name = ?, description = ?, start_date = ?, end_date = ?, status = ?, created_by = ? WHERE id = ?', [name, description, startDate, endDate, status, createdBy], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ id, name, description, startDate, endDate, status, createdBy });
  });
};

exports.deleteProject = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM projects WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
};


exports.addQty = async(req ,res)=>{
  try{
    const {qty, product_id} = req.body
    if(!qty || !product_id){
      return res.status(400).json({error:'All fields required'})
    }
    const [exist] = await db.query('select * from inventory where product_id=?' ,[product_id])
    const [result] = await db.query('update inventory set quantity=? where product_id=?' ,[exist.quantity+qty, product_id])
    console.log(result);
    return res.status(200).json({message:'Quantity added successfully'})
    
  }
  catch(e){
    console.log(e);
    return res.status(500).json({error:e.message})
  }
}


exports.removeQty = async(req ,res) => {
  try{
    const {qty, product_id} = req.body
    if(!qty || !product_id){
      return res.status(400).json({error:'All fields required'})
    }
    const [exist] = await db.query('select * from inventory where product_id=?' ,[product_id])
    if(exist.quantity < 0 || ((exist.quantity - qty ) < 0)){
      return res.status(400).json({error:'Insufficient quantity'})
    }
    const [result] = await db.query('update inventory set quantity=? where product_id=?' ,[exist.quantity-qty, product_id])
    console.log(result);
    return res.status(200).json({message:'Quantity added successfully'})
    
  }
  catch(e){
    console.log(e);
    return res.status(500).json({error:e.message})
  }
}