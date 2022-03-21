const { response } = require("express");
const connection = require("../database");

let sql;
let param;
let respuesta ={};

function postLogin(request,response){
    param = [request.body.email,request.body.contrasenia];
    sql = "SELECT * FROM usuario WHERE email = ? AND contrasenia = ?";

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
                respuesta = {
                    error: true,
                    codigo: 200,
                    mensaje: `Login incorrecto`,
                    titulo:"error en el login",
                    resultado : result
                } 
            }
             
        }
        response.send(respuesta);
    })
}


module.exports = {postLogin}