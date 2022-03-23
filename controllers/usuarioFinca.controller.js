const { response } = require("express");
const connection = require("../database");

let sql;
let param;
let respuesta ={};

function postUsuarioFinca(request,response){
    let {id_usuario,id_finca} = request.body;
    console.log(request.body)
    param = [id_usuario,id_finca];
    sql = "INSERT INTO usuarios_fincas (id_usuario,id_finca) VALUE (?)";
    console.log(sql,param);
    connection.query(sql,[param],function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "usuario no insertado en finca",
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


module.exports = {postUsuarioFinca}