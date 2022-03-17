const mysql = require("mysql2");

let connection = mysql.createConnection({
    host: "database-1.cjsrbfuwxysf.eu-west-3.rds.amazonaws.com",
    user: "admin",
    password : "JJPD2022",
    database : "mygreen"
})


connection.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log("Conexión correcta a la base de datos");
    }
})

module.exports = connection;