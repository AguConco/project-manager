const socketIo = require('socket.io');

const configureSocket = (server) => {
    const io = socketIo(server, {
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
    });

    return io;
};

module.exports = configureSocket;
