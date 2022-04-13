const { response } = require("express");
const connection = require("../database");

let sql;
let param;
let respuesta ={};

function getTarea(request,response){
    if(request.query.id_finca != null){
        param = [request.query.id_finca];
        sql = "SELECT * FROM tareas AS t JOIN usuario AS u ON (u.id_usuario = t.id_usuario) WHERE t.id_finca = ? ORDER BY prioridad";
    }else if(request.query.id_usuario != null){
        param = [request.query.id_usuario];
        sql = "SELECT * FROM tareas AS t JOIN usuario AS u ON (u.id_usuario = t.id_usuario) WHERE t.id_usuario = ? ORDER BY prioridad";
    }else{
        param = [request.query.id_tarea];
        sql = "SELECT * FROM tareas AS t JOIN usuario AS u ON (u.id_usuario = t.id_usuario) WHERE t.id_tarea = ?";
    }
    

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Tarea no encontrada",
                titulo:"Error al buscar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Lista de tareas encontrada`,
                titulo:"busqueda satisfactoria",
                resultado : result
            }  
        }
        response.send(respuesta);
    })
}

function postTarea(request,response){
    let {id_usuario,id_finca,fecha,prioridad,descripcion} = request.body;
    param = [id_usuario,id_finca,fecha,prioridad,descripcion];
    sql = "INSERT INTO tareas(id_usuario,id_finca,fecha,prioridad,descripcion) VALUES (?)";

    connection.query(sql,[param],function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Tarea no guardada",
                titulo:"Error al guardar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Tarea guardada con la id ${result.insertId}`,
                titulo:"Guardado satisfactorio",
                resultado : result.insertId
            }  
        }
        response.send(respuesta);
    })
}

function putTarea(request,response){
    let {id_usuario,id_finca,fecha,prioridad,descripcion,id_tarea} = request.body;
    param = [id_usuario,id_finca,fecha,prioridad,descripcion,id_tarea];
    sql = "UPDATE tareas SET id_usuario = COALESCE(?,id_usuario),id_finca = COALESCE(?,id_finca), fecha = COALESCE(?,fecha)" +
        ", prioridad = COALESCE(?,prioridad), descripcion = COALESCE(?,descripcion) WHERE id_tarea = ?";

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Tarea no encontrada",
                titulo:"Error al modificar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Tarea modificada`,
                titulo:"Modificado satisfactorio",
                resultado : result.affectedRows
            }  
        }
        response.send(respuesta);
    })
}

function delTarea(request,response){
    param = [request.body.id_tarea];
    sql = "DELETE FROM tareas WHERE id_tarea = ?";

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Tarea no encontrado",
                titulo:"Error al borrar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Tarea borrada`,
                titulo:"Borrado satisfactorio",
                resultado : result.affectedRows
            }  
        }
        response.send(respuesta);
    })
}

module.exports = {getTarea,postTarea,putTarea,delTarea}