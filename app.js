const express = require("express");
const app = express();
const cors = require("cors");

//Configuración de las rutas


//Configuración de la API
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.set("port", process.env.PORT || 300);

//RUTAS

module.exports = app;