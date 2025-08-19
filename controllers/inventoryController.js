const db = require('../config/db');

// | id          | bigint(20) unsigned | NO   |     | NULL    |       |
// | name        | varchar(255)        | NO   |     | NULL    |       |
// | description | varchar(255)        | NO   |     | NULL    |       |
// | quantity    | int(255)            | NO   |     | NULL    |       |
// | price       | int(255)            | NO   |     | NULL    |       |
// | status      | varchar(255)        | NO   |     | NULL    |       |
// | created_by  | int(11)             | NO   |     | NULL    |       |
// | company_id

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
  const { name, description, quantity, price, status, createdBy ,company_id } = req.body;
  db.query('INSERT INTO inventory (name, description, quantity, price, status, created_by, compnay_id) VALUES (?, ?, ?, ?, ?, ? ,?)', [name, description, quantity, price, status, createdBy ,company_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId });
  });
};

exports.updateInventory = (req, res) => {
  const { id  } = req.params;
  const { name, description, quantity, price, status, createdBy } = req.body;
  db.query('UPDATE inventory SET name = ?, description = ?, quantity = ?, price = ?, status = ? WHERE id = ?', [name, description, quantity, price, status ,id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({  name, description, quantity, price, status, createdBy ,company_id  });
  });
};

exports.deleteInventory = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM inventory WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send('deleted');
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