
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

        // socket.on('video-stream', (data) => {
        //     const { signal, user, id } = data

        //     if (!usersConnected[id]) {
        //         usersConnected[id] = {};
        //     }

        //     if (!usersConnected[id][user.uid]) {
        //         usersConnected[id][user.uid] = user;
        //     }

        //     if (!usersConnected[id][user.uid]['signal']) {
        //         usersConnected[id][user.uid]['signal'] = signal;
        //     }

        //     io.to(id).emit('users-online', Object.values(usersConnected[id]));

        // });

        socket.on("sending-signal", data => {

            const { id, signal, user } = data

            if (!usersConnected[id]) {
                usersConnected[id] = {};
            }

            if (!usersConnected[id][user.uid]) {
                usersConnected[id][user.uid] = user;
            }

            if (!usersConnected[id][user.uid]['signal']) {
                usersConnected[id][user.uid]['signal'] = signal;
            }

            io.to(id).emit('emit-signal', Object.values(usersConnected[id]));
        });

        socket.on("returning-signal", data => {
            const { id, signal, user } = data

            if (!usersConnected[id]) {
                usersConnected[id] = {};
            }

            if (!usersConnected[id][user.uid]) {
                usersConnected[id][user.uid] = user;
            }

            if (!usersConnected[id][user.uid]['signal']) {
                usersConnected[id][user.uid]['signal'] = signal;
            }
            io.to(id).emit('receiving-signal', Object.values(usersConnected[id]));
        })

        socket.on('user-disconnected', ({ userId, id }) => {
            if (usersConnected[id] && usersConnected[id][userId]) {
                delete usersConnected[id][userId];

                if (Object.keys(usersConnected[id]).length === 0) {
                    delete usersConnected[id];
                }

                io.to(id).emit('users-online', usersConnected[id] ? Object.values(usersConnected[id]) : []);
            }
        });
    });
}

module.exports = {
    video,
}

