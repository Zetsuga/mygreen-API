const nodemailer = require('nodemailer');
const { response } = require("express");
const connection = require("../database");

let sql;
let param;
let respuesta ={};


function recordarContrasenia(request,response){
    param = [request.query.email];
    sql = "SELECT * FROM usuario WHERE email = ?";

    connection.query(sql,param,function(err,result){
        if(err){
            crespuesta = {
                error: true,
                codigo: 200,
                mensaje: "Usuarios no encontrados",
                titulo:"Error al buscar",
                resultado : "-1"
            }   
        }else{
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'jjp.desarrolladores@gmail.com', // Cambialo por tu email
                    pass: 'jjp2022@.' // Cambialo por tu password
                }
            });
        
            const mailOptions = {
                from: `”Mygreen” <jjp.desarrolladores@gmil.com>`,
                to: result[0].email, // Cambia esta parte por el destinatario
                subject: "Credenciales de usuario",
                html: `
                    <strong>Nombre:</strong> ${result[0].nombre} <br/>
                    <strong>E-mail:</strong> ${result[0].email} <br/>
                    <strong>Contrasenia:</strong> ${result[0].contrasenia}
                `
            };
            
            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log(err)
                else
                    rrespuesta = {
                        error: false,
                        codigo: 200,
                        mensaje: "Contraseña enviada",
                        titulo:"Revisa tu correo para la nueva contraseña",
                        resultado : "1"
                    }   
            });
        }
        response.send(respuesta)
    })
}

module.exports = {recordarContrasenia}