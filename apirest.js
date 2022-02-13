let express = require("express");
let app = express();
let cors = require('cors');
app.use(cors());
app.use(express.json());
// PARA CREAR API REST

let mysql = require("mysql2");
// PARA COMUNICARSE CON BBDD

let connection = mysql.createConnection(
    {
        host : "localhost",
        user : "root",
        password : "root",
        database : "codenotch"

    }
);

connection.connect(function(error){
    if(error){
        console.log(error);
    } else {
        console.log("Conexión correcta");
    }
});



// const sql = "INSERT INTO `cumpleandres`.`invitados` (`nombre`, `apellido`) VALUES ('Alejandro', 'Briceño')"

// connection.query(sql, (error, result) => {
//     if (error) throw error;
//     else console.log(result);
// });

app.get("/alumnos", 
    function (request, response)
 {
    let sql;
    if (request.query.id == null) {
        sql = "SELECT * FROM alumnos";
    } else {
        sql = "SELECT * FROM alumnos WHERE idalumnos=" + request.query.id;
    }


    connection.query(sql, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            response.send(result);
            console.log(result);
        }
    })
});

app.post("/alumnos",
    function (request, response) {

        let sql = "INSERT INTO `codenotch`.`alumnos` (`nombre`, `apellidos`, `id_modalidad`, `year_ingreso`) VALUES ('"+ request.body.nombre + "', '"+ request.body.apellidos +"', '"+ request.body.modalidad + "', '" + request.body.anoingreso +"');"

    connection.query(sql, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            response.send(result);
            console.log(result);
        }
    })
    
})


app.put("/alumnos",
    function (request, response) {
    
    // let ideditor = request.body.ideditor;
    let sql = "UPDATE `alumnos` SET `nombre` = '" + request.body.nombre + "', `apellidos` = '" + request.body.apellidos + "', `id_modalidad` = '" + request.body.modalidad + "', `year_ingreso` = '" + request.body.anoingreso + "' WHERE (`idalumnos` = '" + request.query.id + "');"
    
    connection.query(sql, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            response.send(result);
            console.log(result);
        }
    })
    }
)

app.delete("/alumnos",
function (request, response) {
        
        
        mysql = "DELETE FROM `alumnos` WHERE (`idalumnos` = '" + request.query.id +"')"
    
        connection.query(mysql, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            response.send(result);
            console.log(result);
        }
    })


    
})

app.listen(3000);

// CONEXIÓN CON LA BASE DE DATOS
// connection.end();

