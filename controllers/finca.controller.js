const { response } = require("express");
const connection = require("../database");

let sql;
let param;
let respuesta ={};

function getFinca(request,response){
    if(request.query.id_finca !=null){
        param = [request.query.id_usuario];
        sql = "SELECT + FROM finca WHERE id_finca = ?";
    }else{
        param = [];
        sql = "SELECT *FROM finca";
    }

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Finca no encontrada",
                titulo:"Error al buscar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Finca encontrada`,
                titulo:"busqueda satisfactoria",
                resultado : result
            }  
        }
        response.send(respuesta);
    })
}

async function postFinca(request,response){
    let {direccion,cp,poblacion,provincia,latitud,longitud} = request.body;
    
    param = [direccion,cp,poblacion,provincia,latitud,longitud];
    sql = "INSERT INTO usuario (direccion,cp,poblacion,provincia,latitud,longitud) VALUE (?)";

    connection.query(sql,[param],function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Finca no guardada",
                titulo:"Error al guardar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Finca guardad con éxito`,
                titulo:"Guardado satisfactorio",
                resultado : result.insertId
            }  
        }
        response.send(respuesta);
    })
}

async function putFinca(request,response){

    let {direccion,cp,poblacion,provincia,latitud,longitud,id_finca} = request.body;

    param = [direccion,cp,poblacion,provincia,latitud,longitud,id_finca]
    sql = "UPDATE usuario SET direccion = COALESCE(?,direccion),cp = COALESCE(?,cp), poblacion = COALESCE(?,poblacion)" +
        ", provincia = COALESCE(?,provincia), latitud = COALESCE(?,latitud), longitud = COALESCE(?,longitud) WHERE id_finca = ?";

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Finca no modificada",
                titulo:"Error al modificar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Finca modificada`,
                titulo:"Modificado satisfactorio",
                resultado : result.affectedRows
            }  
        }
        response.send(respuesta);
    })
}

function delFinca(request,response){
    param = [request.body.id_finca];
    sql = "DELETE FROM finca WHERE id_finca = ?";
    console.log(sql,param)
    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Finca no encontrada",
                titulo:"Error al borrar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Finca borrada`,
                titulo:"Borrado satisfactorio",
                resultado : result.affectedRows
            }  
        }
        response.send(respuesta);
    })
}

module.exports = {getFinca,postFinca,putFinca,delFinca}