let nodemailer = require('nodemailer');
const db = require('../config/db');
// run npm install nodemailer

export const sendEmail = async (req, res) => {

    const { email, subject, message } = req.body;

    let transporter = nodemailer.createTransport({
    service: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
    });

    let mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: subject,
    text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });

}


// Get all emails
exports.getAllEmails = async (req, res) => {
      const { id } = req.params;
  try {
    const [results] = await db.query('SELECT * FROM mails WHERE company_id = ?', [id]);
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch mails' });
  }
};