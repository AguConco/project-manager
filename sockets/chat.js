
const chat = (io) => {
    const usersConnected = {}

    io.on('connection', (socket) => {

        socket.on('user-connected', (data) => {

            const { user, id } = data

            socket.join(id);

            if (!usersConnected[id]) {
                usersConnected[id] = {};
            }

            if (!usersConnected[id][user.uid]) {
                usersConnected[id][user.uid] = user;
            }

            io.to(id).emit('users-online', Object.values(usersConnected[id]));

        })

        socket.on('send-message', ({message, id}) => {
            socket.join(id);
            
            // falta conectar con la base de datos y guardar los mensajes
            // recibir el id del usuario que lo envió
            // se pudo guardar ahi emitir el mensaje a los demás users

            // datos a guardar el la tabla chat de la base de datos
            // mensaje | remitente | id projecto | fecha | id mensaje | 

            io.to(id).emit('receive-message', message)
        })

        socket.on('user-disconnected', ({ userId, id }) => {
            if (usersConnected[id] && usersConnected[id][userId]) {
                delete usersConnected[id][userId];

                if (Object.keys(usersConnected[id]).length === 0) {
                    delete usersConnected[id];
                }

                io.to(id).emit('users-online', usersConnected[id] ? Object.values(usersConnected[id]) : []);
            }
        })
    })
}

module.exports = {
    chat
}

