const db = require('../config/db');

exports.saveMessage = async(req ,res)=>{
    try{
        const {name ,email ,message ,phone} = req.body
        if(!name || !email || !message || !phone){
            return res.status(400).json({error:'All fields required'})
        }
        const [result] = await db.query('insert into contacts(name ,email ,phone, message) values(? ,? ,?,?)',[name ,email ,phone, message])
        return res.status(200).json(result)
    }
    catch(e){
        return res.status(500).json({error:e.message})
    }
}

exports.getAllMessages = async(req ,res)=>{
    try{
        const [result] = await db.query('select * from contacts')
        return res.status(200).json(result)
    }
    catch(e){
        return res.status(500).json({error:e.message})
    }
}

exports.getMessageById = async(req ,res)=>{
    try{
        const {id} = req.params
        const [result] = await db.query('select * from contacts where id=?' ,[id])
        return res.status(200).json(result)
    }
    catch(e){
        return res.status(500).json({error:e.message})
    }
}


exports.deleteMessage = async(req ,res)=>{
    try{
        const {id} = req.params
        const [result] = await db.query('delete from contacts where id =?' ,[id])
        return res.status(204).send('deleted')
    }
    catch(e){
        return res.status(500).json({error:e.message})
    }
}
