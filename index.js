const app = require("./app");

require("./database");

app.listen(app.get("port"),()=>(console.log("Servidor funcionando en el puerto ",app.get("port"))));