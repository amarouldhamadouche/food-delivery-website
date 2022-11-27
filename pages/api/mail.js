const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export default function handler(req, res) {
 const body =req.body
 const message = `
  Name: ${body.name}rn
  Email: ${body.email}rn
  Message: ${body.message}
`;
sgMail.send({
 to: 'ouldhamadoucheamar49@gmail.com',
 from: 'amarouldhamadouche0@gmail.com',
 subject: 'New Message!',
 text: 'message',
 html: message.replace(/rn/g, '<br>'),
}).then(() => {
 res.status(200).json({ status: 'Ok' });
}).catch((err)=>{
 res.status(500).json(err)
 })
 
}
