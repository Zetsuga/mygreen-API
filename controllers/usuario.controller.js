const { response } = require("express");
const connection = require("../database");
const bcrypt = require('bcrypt');

let sql;
let param;
let respuesta ={};

function getUsuario(request,response){
    if(request.query.id_usuario !=null){
        param = [request.query.id_usuario];
        sql = "SELECT usu.*,finc.id_finca,finc.direccion as fincadireccion FROM usuario AS usu "+
        "JOIN usuarios_fincas AS usuf ON (usu.id_usuario = usuf.id_usuario)" +
        "JOIN finca AS finc ON (finc.id_finca = usuf.id_finca)"+
        "WHERE usu.id_usuario = ?";
    }else{
        param = [request.query.id_finca];
        sql = "SELECT usu.* FROM usuario AS usu "+
        "JOIN usuarios_fincas AS usuf ON (usu.id_usuario = usuf.id_usuario)" +
        "JOIN finca AS finc ON (finc.id_finca = usuf.id_finca)"+
        "WHERE usuf.id_finca = ? AND usu.rol = '4'";
    }

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

async function postUsuario(request,response){
    let {nombre,apellidos,telefono,direccion,cp,poblacion,ciudad,rol,num_cuenta,email,contrasenia} = request.body;
    let contraseniaHash = await bcrypt.hash(contrasenia,10);
    
    param = [nombre,apellidos,telefono,direccion,cp,poblacion,ciudad,contraseniaHash,rol,num_cuenta,email];
    sql = "INSERT INTO usuario (nombre,apellidos,telefono,direccion,cp,poblacion,ciudad,contrasenia,rol,num_cuenta,email) VALUE (?)";

    connection.query(sql,[param],function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Usuario no guardado",
                titulo:"Error al guardar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Usuario guardado`,
                titulo:"Guardado satisfactorio",
                resultado : result.insertId
            }  
        }
        response.send(respuesta);
    })
}

async function putUsuario(request,response){

    if(request.body.contrasenia == null){
        let {id_usuario,nombre,apellidos,telefono,direccion,cp,poblacion,ciudad,rol,num_cuenta} = request.body;
    
        param = [nombre,apellidos,telefono,direccion,cp,poblacion,ciudad,contraseniaHash,rol,num_cuenta,id_usuario];
        sql = "UPDATE usuario SET nombre = COALESCE(?,nombre),apellidos = COALESCE(?,apellidos), telefono = COALESCE(?,telefono)" +
            ", direccion = COALESCE(?,direccion), cp = COALESCE(?,cp), poblacion = COALESCE(?,poblacion), ciudad = COALESCE(?,ciudad)"+
            ", rol = COALESCE(?,rol), num_cuenta = COALESCE(?,num_cuenta) WHERE id_usuario = ?";
    }else{
        let {id_usuario,nombre,apellidos,telefono,direccion,cp,poblacion,ciudad,contrasenia,rol,num_cuenta} = request.body;

        let contraseniaHash = await bcrypt.hash(contrasenia,10);

        param = [nombre,apellidos,telefono,direccion,cp,poblacion,ciudad,contraseniaHash,rol,num_cuenta,id_usuario];
        sql = "UPDATE usuario SET nombre = COALESCE(?,nombre),apellidos = COALESCE(?,apellidos), telefono = COALESCE(?,telefono)" +
        ", direccion = COALESCE(?,direccion), cp = COALESCE(?,cp), poblacion = COALESCE(?,poblacion), ciudad = COALESCE(?,ciudad)"+
        ", contrasenia = COALESCE(?,contrasenia), rol = COALESCE(?,rol), num_cuenta = COALESCE(?,num_cuenta) WHERE id_usuario = ?";
    }

    

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Usuario no modificado",
                titulo:"Error al modificar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Usuario modificado`,
                titulo:"Modificado satisfactorio",
                resultado : result.affectedRows
            }  
        }
        response.send(respuesta);
    })
}

function delUsuario(request,response){
    param = [request.body.id_usuario];
    sql = "DELETE FROM usuario WHERE id_usuario = ?";
    console.log(sql,param)
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