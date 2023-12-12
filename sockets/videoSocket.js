
const video = (io) => {
    io.on('connection', (socket) => {

        console.log('Nuevo cliente conectado');
        
        socket.on('stream', (data) => {

            const { signal, streamDetails, user } = data;

            if (streamDetails) {
                socket.emit('stream', { signal, streamDetails, user });
            }

        });

        socket.on('disconnect', () => {
            socket.emit('streamingFinished', {})
            console.log('Cliente desconectado');

        });

    });

}

module.exports = {
    video
}