const socketIo = require('socket.io');

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

const configureSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: corsOrigin,
        }
    });

    return io;
};

const configureSocketVideocall = (server) => {
    const videoIo = socketIo(server, {
        path: '/videocall',
        cors: {
            origin: corsOrigin
        }
    })

    return videoIo
}

const configureSocketChat = (server) => {
    const chatIo = socketIo(server, {
        path: '/chat',
        cors: {
            origin: corsOrigin
        }
    })

    return chatIo
}

module.exports = {
    configureSocket,
    configureSocketVideocall,
    configureSocketChat
};
