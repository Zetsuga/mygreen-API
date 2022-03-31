const express = require("express");
const app = express();
const cors = require("cors");

//Configuración de las rutas
let medicionesRoute = require("./routers/mediciones.routes");
let loginsRoute = require("./routers/login.routes");
let usuariosRoute = require("./routers/usuario.routes");
let usuariosFincaRoute = require("./routers/usuarioFinca.routes");
let incidenciasRouter = require("./routers/incidencias.routes");
let partesRouter = require("./routers/partes.routes");
let ficharRouter = require("./routers/fichar.routes");
let nominasRoute = require("./routers/nominas.routes");
let superAdminRoute = require("./routers/superAdmin.routes");
let altaUsuarioRouter = require("./routers/altaUsuario.routes");
let recordarContrasenia = require("./routers/recordarPassword.routes");
let fincaRouter = require("./routers/finca.routes");

//Configuración de la API
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.set("port", process.env.PORT || 300);

//RUTAS
app.use(medicionesRoute);
app.use(loginsRoute);
app.use(usuariosRoute);
app.use(usuariosFincaRoute);
app.use(incidenciasRouter);
app.use(partesRouter);
app.use(ficharRouter);
app.use(nominasRoute);
app.use(superAdminRoute);
app.use(altaUsuarioRouter);
app.use(recordarContrasenia);
app.use(fincaRouter);

module.exports = app;
