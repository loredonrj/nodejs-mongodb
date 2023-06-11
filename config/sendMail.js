import nodemailer from 'nodemailer';

const mailToSend = async(data)=> {
   
    let testAccount = await nodemailer.createTestAccount();
    
    // setup Gmail email account wth the help of Google Apps Passwords
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "rodrigueloredon@gmail.com",
        pass: "ggrfsadoqmevbzkv",
      },
    });
  
    // send mail with defined transport object. Here we fetched the mailta from the getUsers API for the sake of simpliciy
    let email = await transporter.sendMail({
      from: 'Rodrigue 👻  <rodrigueloredon@gmail.com>',   
      to: data.to, 
      subject: data.subject,   
      text: data.text,  
      html: data.html,  
    });
  
    console.log("Message sent from : %s", email.messageId);
  
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(email));
}
  
export default mailToSend;