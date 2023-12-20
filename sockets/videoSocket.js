
const video = (io) => {
    const usersConnected = {};

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

        });

        socket.on('video-stream', (data) => {
            const { streamDetails, user, id } = data

            const stream = 'stream'

            if (!usersConnected[id]) {
                usersConnected[id] = {};
            }

            if (!usersConnected[id][user.uid]) {
                usersConnected[id][user.uid] = user;
            }

            if(!usersConnected[id][user.uid][stream]) {
                usersConnected[id][user.uid][stream] = streamDetails
            }

            const videoUrl = `http://localhost:4000/videocall?id=${streamDetails.id}`;

            console.log(videoUrl)

            io.to(id).emit('users-online',  Object.values(usersConnected[id]))
        });

        socket.on('user-disconnected', ({ userId, id }) => {

            if (usersConnected[id] && usersConnected[id][userId]) {
                delete usersConnected[id][userId];
        
                // Si no hay más usuarios en la sala, elimina la sala del objeto usersConnected
                if (Object.keys(usersConnected[id]).length === 0) {
                    delete usersConnected[id];
                }
        
                // Emitir la lista actualizada de usuarios a los clientes en la misma sala
                io.to(id).emit('users-online', usersConnected[id] ? Object.values(usersConnected[id]) : []);
            }
        });

    });
}


module.exports = {
    video,
}