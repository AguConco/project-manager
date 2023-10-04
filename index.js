const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const port = process.env.PORT || 4000;
// Configuración de cors

const dominioPermitido = "http://localhost:3000";

const corsOptions = {
    origin: dominioPermitido,
    methods: "OPTIONS, GET, PUT, POST, DELETE",
    allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));

// Conexión a la base de datos mysql

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "projects_db",
    charset: 'utf8mb4',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err.message);
        process.exit(1);
    }
    // console.log("Conexión a la base de datos establecida.");
});
// Rutas de la app para la parte de api

const project = require('./routes/project');

app.use('/project', project);

// Configuración de websocket

const server = http.createServer(app);
const configureSocket = require('./sockets/socketConfig');
const {
    getMembers,
    notifications,
    memberRequests
} = require('./sockets/eventSocket');

const socketIoInstance = configureSocket(server);
getMembers(socketIoInstance);
notifications(socketIoInstance);
memberRequests(socketIoInstance);

// Módulos que se exportan

module.exports = { connection }

// Iniciar el servidor
server.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
