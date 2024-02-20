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

const corsOrigin = function (origin, callback) {
    const dominiosPermitidos = [
        "http://localhost:3000",
        "http://169.254.111.168:3000"
    ];

    if (!origin || dominiosPermitidos.indexOf(origin) !== -1) {
        callback(null, true);
    } else {
        callback(new Error("Acceso no permitido por CORS"));
    }
}

const corsOptions = {
    origin: corsOrigin,
    methods: "OPTIONS, GET, PUT, POST, DELETE",
    allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));;

// Conexión a la base de datos mysql

// const dbConfig = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     charset: 'utf8mb4',
//     port: 3306
// }

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "project_manager_db",
    charset: 'utf8mb4',
    port: 3306
}

const connection = mysql.createConnection(dbConfig)

connection.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err.message)
        process.exit(1);
    }
    console.log("Conexión a la base de datos establecida.");
})

// Rutas de la app para la parte de api

const project = require('./routes/project')
const task = require('./routes/task')

app.use('/project', project)
app.use('/task', task)

// Configuración de websocket

const server = http.createServer(app);
const {
    configureSocket,
    configureSocketVideocall,
    configureSocketChat
} = require('./sockets/socketConfig')
const socketIoInstance = configureSocket(server)
const {
    getMembers,
    notifications,
    memberRequests
} = require('./sockets/eventMembersSocket');
const { getListStages, getStage, getTasks } = require('./sockets/eventStageSocket')


getMembers(socketIoInstance)
notifications(socketIoInstance)
memberRequests(socketIoInstance)
getListStages(socketIoInstance)
getStage(socketIoInstance)
getTasks(socketIoInstance)

// videollamada

const videoIo = configureSocketVideocall(server)
const { video } = require('./sockets/videoSocket')
video(videoIo)

// chat

const chatIo = configureSocketChat(server)
const { chat } = require('./sockets/chat')
chat(chatIo)

// Módulos que se exportan

module.exports = { connection, findUserById }

// Iniciar el servidor
server.listen(port, '0.0.0.0', () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`)
});
