const { response } = require ("express");
const connection = require("../database");

let sql;
let param;
let respuesta = {};

//Consulta que devuelve los usuarios superAdmin
function getSuperAdmin(request,response){
    if(request.query.id_usuario != null){
        //si no nos pasan el id de usuario devolvemos todos los super admin.
        param = [request.query.id_usuario];
        sql = "SELECT * FROM usuario WHERE id_usuario = ? ";
    }else{
        param = [request.query.rol];
        sql = "SELECT * FROM usuario WHERE rol = ?";
        
    }

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err);
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Usuario superAdmin no encontrado",
                titulo: "Error al buscar",
                resultado: "-1"

            }
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: "Lista de superAdmin encontrada",
                titulo: "Busqueda satisfactoria",
                resultado: result
            }
        }
        response.send(respuesta);
    })
}
