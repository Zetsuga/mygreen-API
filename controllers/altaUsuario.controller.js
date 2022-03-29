const nodemailer = require('nodemailer');
const { response } = require("express");
const connection = require("../database");

let sql;
let param;
let respuesta ={};


function enviarCorreo(request,response){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jjp.desarrolladores@gmail.com', // Cambialo por tu email
            pass: 'jjp2022@.' // Cambialo por tu password
        }
    });

    const mailOptions = {
        from: `”Mygreen” <jjp.desarrolladores@gmil.com>`,
        to: request.body.email, // Cambia esta parte por el destinatario
        subject: "Credenciales de usuario",
        html: `
            <strong>Nombre:</strong> ${request.body.nombre} <br/>
            <strong>E-mail:</strong> ${request.body.email} <br/>
            <strong>Contrasenia:</strong> ${request.body.contrasenia}
        `
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
       
}

module.exports = {enviarCorreo}