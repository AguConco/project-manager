
const getListStages = (io) => {
    io.on('connection', (socket) => {
        socket.on('listStage', (id) => {

            const socketStage = socket.stageProject = id

            if (socketStage) {
                socket.join(socketStage);
            }

            const sqlQuery = "SELECT * FROM stage WHERE id_project = ?";

            const { connection } = require('..');

            connection.query(sqlQuery, [id], (err, results) => {
                if (err) {
                    console.error("Error al ejecutar la consulta SQL:", err);
                    res.status(500).send("Error interno del servidor", err);
                    return;
                }

                const response = {
                    status: true,
                    message: 'etapas encontradas exitosamente',
                    data: results,
                };

                io.to(socketStage).emit('listStage', response);
            })
        });
    });
}

const getStage = (io) => {
    io.on('connection', (socket) => {
        socket.on('stage', ({ idStage, idProject }) => {

            const socketStage = socket.idStage = idStage

            if (socketStage) {
                socket.join(socketStage);
            }

            const sqlQuery = "SELECT * FROM stage WHERE id_project = ? and id = ?";

            const { connection } = require('..');

            connection.query(sqlQuery, [idProject, idStage], (err, results) => {
                if (err) {
                    console.error("Error al ejecutar la consulta SQL:", err);
                    res.status(500).send("Error interno del servidor", err);
                    return;
                }

                const response = {
                    status: true,
                    data: results,
                };

                io.to(socketStage).emit('stage', response);
            })
        });
    });
}

module.exports = {
    getListStages,
    getStage
}