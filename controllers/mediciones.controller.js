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
    let date = new Date();
    let hora = `${date.getHours}:${date.getMinutes}+${date.getSeconds}`;
    let fecha = `${date.getDay}-${date.getMonth}-${date.getFullYear}`;
    param = [1,1,temp.temperatura,temp.humedad,temp.tensionmatricial,fecha,hora];
    sql = "INSERT INTO mediciones(id_usuario,id_finca,temperatura,humedad,tensionmatricial"+
        ",fecha,hora) VALUE (?)";

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