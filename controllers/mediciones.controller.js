const { response } = require("express");
const connection = require("../database");

let sql;
let param;
let respuesta ={};

function getMediciones(request,response){
    if(request.query.id_medicion ==null){
        param = [];
        sql = "SELECT * FROM mediciones";
    }else{
        param = [request.query.id_medicion];
        sql = "SELECT * FROM mediciones WHERE id_medicion = ?";
    }

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Medición no encontrada",
                titulo:"Error al buscar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Mediciones encontradas`,
                titulo:"Busqueda satisfactoria",
                resultado : result
            }  
        }
        response.send(respuesta);
    })
}

function postMediciones(request,response){
    let temp = request.query; 
    param = [temp.temperatura,temp.humedad,temp.tensionmatricial];
    sql = "INSERT INTO mediciones(1,1,temperatura,humedad,tensionmatricial"+
        ",CURRENT_DAY(),CURRENT_TIME()) VALUE (?)";

    connection.query(sql,[param],function(err,result){
        if(err){
            console.log(err);
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Medición no almacenada correctamente",
                titulo:"Error al guardar",
                resultado : "-1"
            }            
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Medición guardada con la id ${result.insertId}`,
                titulo:"Guardado",
                resultado : String(result.insertId)
            } 
        }
        response.send(respuesta);
    });

}

module.exports = {getMediciones,postMediciones}