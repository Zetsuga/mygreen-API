const { response } = require("express");
const connection = require("../database");

let sql;
let param;
let respuesta ={};

function getIncidencias(request,response){
    if(request.query.id_finca != null){
        //Consulta para todas las inc de la finca.
        param=[request.query.id_finca];
        sql = "SELECT * FROM incidencias WHERE id_finca=?";
    }else{
        //Mostramos la incidencia que nos piden.
        param=[request.query.id_incidencia];
        sql = "SELECT * FROM incidencias WHERE id_incidencia = ?"
    }
    console.log(sql +param)
    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err);
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Incidencia no encontrada",
                titulo: "Error al buscar la incidencia",
                resultado: "-1"
            }
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: "Incidencias encontrada",
                titulo: "Incidencias encontrada correctamente",
                resultado: result
            }
        }
        response.send(respuesta);
    })
}

function postIncidencia(request,response){
    
    param =[request.body.id_usuario,
            request.body.id_finca,
            request.body.fecha,
            request.body.estado,
            request.body.descripcion];
    sql = "INSERT INTO incidencias(id_usuario,id_finca,fecha,estado,descripcion) VALUES ?,?,?,?,?";

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err);
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "No se ha podido insertar la incidencia",
                titulo: "Error al insertar la Inc",
                resultado: "-1"
            }
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: "Incidencias insertada",
                titulo: "Inc insertada correctamente",
                resultado: result.insertId
            }
        }
        response.send(respuesta);
    })
}

function putIncidencia(request,response){
    console.log(request)
    // param =[request.body.id_incidencia];
    // sql = "UPDATE incidencias SET estado = false WHERE id_incidencia = ?";
    // console.log(sql,param)
    // connection.query(sql,param,function(err,result){
    //     if(err){
    //         console.log(err);
    //         respuesta = {
    //             error: true,
    //             codigo: 200,
    //             mensaje: "No se ha podido actualizar la incidencia",
    //             titulo: "Error al actualizar la Inc",
    //             resultado: "-1"
    //         }
    //     }else{
    //         respuesta = {
    //             error: false,
    //             codigo: 200,
    //             mensaje: "Incidencias actualizada correctamente.",
    //             titulo: "Inc actualizada",
    //             resultado: result.affectedRows
    //         }
    //     }
    //     response.send(respuesta);
    // })
}

function delIncidencia(request,response){
    
    param =[request.body.id_incidencia];
    sql = "DELETE FROM incidencias WHERE id_incidencia = ?";

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err);
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "No se ha podido eliminar la tarea",
                titulo: "Error al eliminar la Inc",
                resultado: "-1"
            }
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: "Incidencias eliminada correctamente.",
                titulo: "Inc eliminada",
                resultado: result.affectedRows
            }
        }
        response.send(respuesta);
    })
}


module.exports = {getIncidencias,postIncidencia,putIncidencia,delIncidencia};