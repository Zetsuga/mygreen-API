const { response } = require("express");
const connection = require("../database");
const express = require('express');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const cors = require('cors');
const res = require("express/lib/response");
const multer = require('multer');

const app = express();

let sql;
let param;
let respuesta ={};

function getNomina(request, response){
    param = [request.query.id_usuario];
    sql = "SELECT * FROM nominas WHERE id_usuario = ?";


    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Nómina no encontrada",
                titulo: "Error al buscar nómina",
                resultado: "-1"
            }
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: "Nomina encontrada",
                titulo: "Ningún error encontrado al buscar nómina",
                resultado: result
            }
        }
        response.send(respuesta)
    })
}

function postNomina(request,response){
    let {id_usuario, mes, ruta, fecha} = request.body;
    param = [id_usuario, mes, ruta, fecha];
    sql = "INSERT INTO nominas (id_usuario, mes, ruta, fecha) VALUE ?";

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Nómina no guardada",
                titulo: "Error al guardar nómina",
                resultado: "-1"
            }
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: "Nómina guardada satisfactoriamente",
                titulo: "Nómina guardada correctamente",
                resultado: result
            }
        }
        response.send(respuesta)
    })
}

function delNomina(request,response){
    param = [request.query.id_nomina];
    sql = "DELETE FROM nominas WHERE id_nomina = ?";

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Nómina no encontrada",
                titulo: "Error al eliminar nómina",
                resultado: "-1"
            }            
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: "Nómina eliminada",
                titulo: "Nómina borrada correctamente",
                resultado: result
            }
        }
        response.send(respuesta)
    })
}

module.exports = {getNomina, postNomina, delNomina}