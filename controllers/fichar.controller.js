const { response } = require("express");
const connection = require("../database");

let sql;
let param;
let respuesta ={};

function getFichar(request,response){
    
    if(request.query.id_usuario != null){
        param = [request.query.id_usuario];
        sql = "SELECT * FROM fichaje WHERE id_usuario = ?";
    }else{
        param = [request.query.fecha];
        sql = "SELECT * FROM fichaje WHERE entrada = ?"
    }
    
    
    

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "lista de fichar no encontrado",
                titulo:"Error al buscar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Lista de fichar encontrada`,
                titulo:"busqueda satisfactoria",
                resultado : result
            }  
        }
        response.send(respuesta);
    })
}

function postFichar(request,response){
    let {id_usuario,entrada,salida,fecha} = request.body;
    param = [id_usuario,entrada,salida,fecha];
    sql = "INSERT INTO fichaje(id_usuario,entrada,salida,fecha) VALUES (?)";

    connection.query(sql,[param],function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Hora de fichar no guardada",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Hora de entrada guardada`,
                titulo:"Guardado satisfactorio",
                resultado : result.insertId
            }  
        }
        response.send(respuesta);
    })
}

function putFichar(request,response){
    let {salida,id_fichaje} = request.body;
    param = [salida,id_fichaje];
    sql = "UPDATE fichaje SET salida = COALESCE(?,salida) WHERE id_fichaje = ?";

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Hora de salida no actualizada",
                titulo:"Error al modificar",
                resultado : "-1"
                
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Hora de salida insertada, fichaje completo del día de hoy`,
                titulo:"Modificado satisfactorio",
                resultado : result.affectedRows
            }  
        }
        response.send(respuesta);
    })
}

module.exports = {getFichar,postFichar,putFichar}