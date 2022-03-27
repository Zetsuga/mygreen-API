const { response } = require("express");
const connection = require("../database");
const bcrypt = require('bcrypt')

let sql;
let param;
let respuesta ={};

async function postLogin(request,response){

    param = [request.body.email];
    sql = "SELECT usu.*,finc.id_finca FROM usuario AS usu "+
        "JOIN usuarios_fincas AS usuf ON (usu.id_usuario = usuf.id_usuario) " +
        "JOIN finca AS finc ON (finc.id_finca = usuf.id_finca) "+
        "WHERE email = ?";

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
            console.log(result[0].contrasenia)
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