const { response } = require("express");
const connection = require("../database");
const bcrypt = require("bcrypt");

let sql;
let param;
let respuesta ={};

async function postLogin(request,response){
    param = [request.body.email,request.body.contrasenia];
    sql = "SELECT usu.*,finc.id_finca FROM usuario AS usu "+
        "JOIN usuarios_fincas AS usuf ON (usu.id_usuario = usuf.id_usuario) " +
        "JOIN finca AS finc ON (finc.id_finca = usuf.id_finca) "+
        "WHERE email = ? AND contrasenia = ?";

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Usuario no encontrado",
                titulo:"Error al buscar",
                resultado : "-1"
            }   
        }else{
            if(result.length>0){
                respuesta = {
                    error: false,
                    codigo: 200,
                    mensaje: `Login correcto`,
                    titulo:"Login correct",
                    resultado : result
                } 
            }else{
                let compare = await bcrypt.compare(request.body.contrasenia,result[0].contrasenia);
                if(compare){
                    respuesta = {
                        error: true,
                        codigo: 200,
                        mensaje: `Login incorrecto`,
                        titulo:"error en el login",
                        resultado : result
                    } 
                }else{
                    respuesta = {
                        error: false,
                        codigo: 200,
                        mensaje: `Contraseña no válida`,
                        titulo:"Login incorrecto",
                        resultado : -1
                    }
                }
                
            }
             
        }
        response.send(respuesta);
    })
}

module.exports = {postLogin}