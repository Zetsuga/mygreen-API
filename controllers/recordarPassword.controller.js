const nodemailer = require('nodemailer');
const connection = require("../database");
const bcrypt = require("bcrypt");

let sql;
let param;
let respuesta ={};


function recordarContrasenia(request,response){
    param = [request.body.email];
    sql = "SELECT * FROM usuario WHERE email = ?";


    connection.query(sql,param, async function(err,result){
        if(err){
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Usuarios no encontrados",
                titulo:"Error al buscar",
                resultado : "-1"
            }   
            response.send(respuesta);
        }else{
            let usuario = result[0];
            let contrasenia = await bcrypt.hash("123456",10);
            param = [contrasenia,result[0].id_usuario];
            sql = "UPDATE usuario SET contrasenia = COALESCE(?,contrasenia) WHERE id_usuario = ?";
            
            connection.query(sql,param,function(err,result){
                if(err){
                    respuesta = {
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
                        to: usuario.email, // Cambia esta parte por el destinatario
                        subject: "Petición de datos",
                        html: `
                            <strong>Nombre:</strong> ${usuario.nombre} <br/>
                            <strong>E-mail:</strong> ${usuario.email} <br/>
                            <strong>Contrasenia:</strong> 123456
                        `
                    };
                    
                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err)
                            console.log(err)
                        else
                            respuesta = {
                                error: false,
                                codigo: 200,
                                mensaje: "Contraseña enviada",
                                titulo:"Revisa tu correo para la nueva contraseña",
                                resultado : "1"
                            }   
                    });
            
                    response.send(respuesta);
                }
                
            });
        }
    
    });
}

module.exports = {recordarContrasenia}