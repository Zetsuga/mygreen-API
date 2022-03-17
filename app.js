const express = require("express");
const app = express();
const cors = require("cors");

//Configuración de las rutas
let medicionesRoute = require("./routers/mediciones.routes");

//Configuración de la API
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.set("port", process.env.PORT || 300);

//RUTAS
app.use(medicionesRoute);

module.exports = app;