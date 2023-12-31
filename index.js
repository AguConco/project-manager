const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const http = require('http')
const { initializeApp } = require('firebase-admin/app')
const admin = require('firebase-admin')

require('dotenv').config();
const serviceAccount = process.env.SERVICE_ACCOUNT_KEY;

const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyAIO-rkjNiaVCOZJFCGx6wRdC0BsTL2YRM",
    authDomain: "desarrollosoftware-eee5e.firebaseapp.com",
    projectId: "desarrollosoftware-eee5e",
    storageBucket: "desarrollosoftware-eee5e.appspot.com",
    messagingSenderId: "39734667720",
    appId: "1:39734667720:web:4b84afe3edd13a6f0778fd"
}

initializeApp(firebaseConfig)

async function findUserById(uid) {
    try {
        const userRecord = await admin.auth().getUser(uid)
        return userRecord;
    } catch (error) {
        console.error('Error al buscar usuario por UID:', error)
        throw error;
    }
}

///////////

const app = express();
const port = process.env.PORT || 4000;

// Configuración de cors

const corsOptions = {
    origin: function (origin, callback) {
        const dominiosPermitidos = [
            "http://localhost:3000",
            "http://169.254.111.168:3000",
            "https://agustin-concollato.000webhostapp.com"
        ];

        if (!origin || dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Acceso no permitido por CORS"));
        }
    },
    methods: "OPTIONS, GET, PUT, POST, DELETE",
    allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));;

// Conexión a la base de datos mysql

// const dbConfig = {
//     host: "localhost",
//     user: "id21560725_root",
//     password: "Concollat123$",
//     database: "id21560725_project_manager_db",
//     charset: 'utf8mb4',
//     port: 443,
// };

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "project_manager_db",
    charset: 'utf8mb4',
};

const connection = mysql.createConnection(dbConfig)

connection.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err.message)
        process.exit(1);
    }
    // console.log("Conexión a la base de datos establecida.");
})

// Rutas de la app para la parte de api

const project = require('./routes/project')
const task = require('./routes/task')

app.use('/project', project)
app.use('/task', task)

app.get('/videocall', (req, res) => {
    const videoId = req.query.id;
    // Lógica para servir el video según el videoId
    // Puedes enviar el archivo de video, redirigir a otra URL, etc.
    res.send(`Serving video for ID: ${videoId}`);
});

// Configuración de websocket

const server = http.createServer(app);
const configureSocket = require('./sockets/socketConfig')
const {
    getMembers,
    notifications,
    memberRequests
} = require('./sockets/eventMembersSocket');
const { getListStages, getStage, getTasks } = require('./sockets/eventStageSocket')

const socketIoInstance = configureSocket(server)

getMembers(socketIoInstance)
notifications(socketIoInstance)
memberRequests(socketIoInstance)
getListStages(socketIoInstance)
getStage(socketIoInstance)
getTasks(socketIoInstance)

// videollamada

const socketIo = require('socket.io');
const videoIo = socketIo(server, {
    path: '/videocall',
    cors: {
        origin: function (origin, callback) {
            const dominiosPermitidos = [
                "http://localhost:3000",
                "http://169.254.111.168:3000",
                "https://agustin-concollato.000webhostapp.com"
            ];

            if (!origin || dominiosPermitidos.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Acceso no permitido por CORS"));
            }
        },
    }
})

const { video } = require('./sockets/videoSocket')
video(videoIo)

// Módulos que se exportan

module.exports = { connection, findUserById }

// Iniciar el servidor
server.listen(port, '0.0.0.0', () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`)
});
