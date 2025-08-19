const db = require('../config/db');

exports.getAllFinances = async (req, res) => {
  try{
    const [results] = await db.query('SELECT * FROM finances');
    return res.status(200).json(results);
  }
  catch(e){
    console.log(e);
    
    return res.status(500).json({ error: e.message });
  }
};

exports.getProFinancesById = async(req, res) => {
  try{
    const { id } = req.params;
    const [result] = await db.query('SELECT * FROM finances WHERE id = ?', [id]);
    return res.status(200).json(result);
  }
  catch(e){
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};

exports.createProFinances = async (req, res) => {
  try{
    const { type, amount, recordedBy, notes } = req.body;
    console.log(req.body);
    
    if(!type || !amount || !recordedBy || !notes){
      return res.status(400).json({error:'All fields required'})
    }
  
    const [result] = await db.query('INSERT INTO finances (type, amount, recorded_by, notes, date) VALUES (?, ?, ?, ?, ?)', [type, amount, recordedBy, notes ,new Date()])
  
    return  res.status(201).json({ id: result.insertId, type, amount, recordedBy, notes });

  }
  catch(e){
    console.log(e);
    return res.status(500).json({error:e.message})
  }
  
};

exports.updateProFinances = async(req, res) => {
  try{
    const { id } = req.params;
    const { type, amount, notes} = req.body;

    if(!type || !amount || !notes){
      return res.status(400).json({error:'All fields required'})
    }

    const [result] = await db.query('UPDATE finances SET type = ?, amount = ?, notes = ? WHERE id = ?', [type, amount, notes, id]);
    return res.status(200).json({ id, type, amount, notes });
  }
  catch(e){
    console.log(e);
    return res.status(500).json({error:e.message})
  }
};

exports.deleteProFinances =async(req, res) => {
  try{
    const { id } = req.params;
    await db.query('DELETE FROM finances WHERE id = ?', [id], (err) => {
    });
    res.status(204).send();
  }catch(e){
    console.log(e);
    return res.status(500).json({error:e.message})
  }
};
