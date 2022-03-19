const { response } = require("express");
const connection = require("../database");

let sql;
let param;
let respuesta ={};

function getUsuario(request,response){
    param = [request.query.id_finca];
    sql = "SELECT * FROM usuario WHERE id_finca = ?";

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Usuarios no encontrados",
                titulo:"Error al buscar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Lista de usuario encontrada`,
                titulo:"busqueda satisfactoria",
                resultado : result
            }  
        }
        response.send(respuesta);
    })
}

function postUsuario(request,response){
    let {nombre,apellidos,telefono,direccion,cp,poblacion,ciudad,rol,num_cuenta} = request.body;
    param = [nombre,apellidos,telefono,direccion,cp,poblacion,ciudad,rol,num_cuenta];
    sql = "INSERT INTO usuario(nombre,apellidos,telefono,direccion,cp,poblacion,ciudad,rol,num_cuenta) VALUES ";

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Usuario no encontrado",
                titulo:"Error al borrar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Usuario borrado`,
                titulo:"Borrado satisfactorio",
                resultado : result.affectedRows
            }  
        }
        response.send(respuesta);
    })
}

function putUsuario(request,response){

    let {id_usuario,nombre,apellidos,telefono,direccion,cp,poblacion,ciudad,rol,num_cuenta} = request.body;
    param = [nombre,apellidos,telefono,direccion,cp,poblacion,ciudad,rol,num_cuenta,id_usuario];
    sql = "UPDATE usuario SET nombre = COALESCE(?,nombre),apellidos = COALESCE(?,apellidos), telefono = COALESCE(?,telefono)" +
        ", direccion = COALESCE(?,direccion), cp = COALESCE(?,cp), poblacion = COALESCE(?,poblacion), ciudad = COALESCE(?,ciudad)"+
        ", rol = COALESCE(?,rol), num_cuenta = COALESCE(?,num_cuenta) WHERE id_usuario = ?";

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Usuario no encontrado",
                titulo:"Error al borrar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Usuario borrado`,
                titulo:"Borrado satisfactorio",
                resultado : result.affectedRows
            }  
        }
        response.send(respuesta);
    })
}

function delUsuario(request,response){
    param = [request.query.id_usuario];
    sql = "DELETE FROM usuario WHERE id_usuario = ?";

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Usuario no encontrado",
                titulo:"Error al borrar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Usuario borrado`,
                titulo:"Borrado satisfactorio",
                resultado : result.affectedRows
            }  
        }
        response.send(respuesta);
    })
}

module.exports = {getUsuario,postUsuario,putUsuario,delUsuario}