const db = require('../config/db');


exports.getAllInventory = async (req, res) => {
  try{
    const [results] = await db.query('SELECT * FROM inventory')
    return res.status(200).json(results)
  }
  catch(e){
    console.log(e);
    return res.status(500).json({error:e.message})
  }
};

exports.getInventoryById = async (req, res) => {
  try{
    const {id} = req.params

    const [result] = await db.query('SELECT * FROM inventory WHERE id = ?', [id])
    return res.status(200).json(result)
  }
  catch(e){
    console.log(e);
    return res.status(500).json({error:e.message})
  }
};

exports.getInventoryByCompanyId = async (req, res) => {
  try{
    const {id} = req.params
    const [result] = await db.query('SELECT * FROM inventory WHERE company_id = ?', [id])
    return res.status(200).json(result)
  }
  catch(e){
    console.log(e);
    return res.status(500).json({error:e.message})
  }
};


exports.addInventory = async (req, res) => {
  try{
    const { name, description, quantity, price, status, createdBy ,company_id } = req.body;

    if(!name || !description || !quantity || !price || !company_id || !createdBy){
      return res.status(400).json({error:'All fields required'})
    }

    const [result] = await db.query('INSERT INTO inventory (name, description, quantity, price, status, created_by, company_id) VALUES (?, ?, ?, ?, ?, ? ,?)', [name, description, quantity, price, status, createdBy ,company_id])
  
    return res.status(200).json({id:result.insertId ,...req.body})
  }
  catch(e){
    console.log(e);
    return res.status(500).json({error:e.message})
  }
};

exports.updateInventory = async (req, res) => {
  try{
    const { id  } = req.params;
    const { name, description, quantity, price, status} = req.body;

    if(!name || !description || !quantity || !price || !status){
      return res.status(400).json({error:'All fields required'})
    }

    const [result] = await db.query('UPDATE inventory SET name = ?, description = ?, quantity = ?, price = ?, status = ? WHERE id = ?', [name, description, quantity, price, status ,id])
    
    return res.status(200).json({  name, description, quantity, price, status  });
  }
  catch(e){
    console.log(e);
    return res.status(500).json({error:e.message})
  }
};

exports.deleteInventory = async (req, res) => {
  try{
    const { id } = req.params;
    await db.query('DELETE FROM inventory WHERE id = ?', [id])
    
    return res.status(204).send('deleted')
  }catch(e){
    console.log(e);
    return res.status(204).json({error:e.message});
  }
};


exports.addQty = async(req ,res)=>{
  try{
    const {qty, id} = req.body
    if(!qty || !id){
      return res.status(400).json({error:'All fields required'})
    }
    console.log(req.body);
    
    const [exist] = await db.query('select * from inventory where id=?' ,[id])
    console.log(exist);
    
    const [result] = await db.query('update inventory set quantity=? where id=?' ,[exist[0].quantity+qty, id])
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
    const {qty, id} = req.body
    if(!qty || !id){
      return res.status(400).json({error:'All fields required'})
    }
    const [exist] = await db.query('select * from inventory where id=?' ,[id])
    if(exist[0].quantity < 0 || ((exist[0].quantity - qty ) < 0)){
      return res.status(400).json({error:'Insufficient quantity'})
    }
    const [result] = await db.query('update inventory set quantity=? where id=?' ,[exist[0].quantity-qty, id])
    console.log(result);
    return res.status(200).json({message:'Quantity reduced successfully'})
    
  }
  catch(e){
    console.log(e);
    return res.status(500).json({error:e.message})
  }
}