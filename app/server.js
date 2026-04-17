const express = require("express");
  const nodemailer = require("nodemailer");                                             
  const app = express();                      
                                          
  app.get("/", (req, res) => {                
    res.send("Hello ITS!");                                                             
  });                             
                                                                                        
  app.get("/health", (req, res) => {     
    res.json({ status: "ok", timestamp: Date.now() });                                  
  });                                         
                                          
  app.get("/send-mail", async (req, res) => {     
    try {                                                                               
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "mailhog",                                       
        port: process.env.SMTP_PORT || 1025,
        secure: false                             
      });                                 
                                     
      const info = await transporter.sendMail({                                         
        from: "ITS Demo <demo@its.com>",
        to: "studente@its.com",                                                         
        subject: "Email di test ITS",             
        text: "Questa e una email di test inviata da Node.js tramite MailHog.",
        html: "<h3>Email di test ITS</h3><p>Invio eseguito correttamente.</p>"          
      });                                
      res.send(`Email inviata! ID: ${info.messageId}`);                                 
    } catch (err) {                           
      console.error(err);                 
      res.status(500).send("Errore invio email"); 
    }                                                                                   
  });                                         
                                                                                        
  app.listen(3000, () => console.log("Server running on port 3000"));