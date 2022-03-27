const { response } = require("express");
const connection = require("../database");
const bcrypt = require("bcrypt");

let sql;
let param;
let respuesta ={};

function postLogin(request,response){
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
            let compare = bcrypt.compareSync(request.body.contrasenia,result[0].contrasenia)
            if(result.length>0 && compare){
                respuesta = {
                    error: false,
                    codigo: 200,
                    mensaje: `Login correcto`,
                    titulo:"Login correct",
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
        response.send(respuesta);
    })
}


module.exports = {postLogin}