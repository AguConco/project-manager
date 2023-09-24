const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

const dominioPermitido = "http://localhost:3000";

// Configurar encabezados CORS utilizando el middleware cors
const corsOptions = {
    origin: dominioPermitido,
    methods: "OPTIONS, GET, PUT, POST, DELETE",
    allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));

// Crear una conexión a la base de datos MySQL
const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "projects_db"
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err.message);
        process.exit(1);
    }
    // console.log("Conexión a la base de datos establecida.");
    
});

// Rutas 

const ruta = require('./routes/ruta');

app.use('/ruta', ruta);

app.post('/', async (req, res) => {
    
    // const { } = req.body.image;
    
})


module.exports = connection

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});


