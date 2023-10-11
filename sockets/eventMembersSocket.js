
const getMembers = (io) => {
    io.on('connection', (socket) => {
        socket.on('members', ({ code, id, uid }) => {

            const { connection, findUserById } = require('..');

            const socketMembers = socket.membersProject = code

            if (socketMembers) {
                socket.join(socketMembers);
            }
            const sqlQuery = 'SELECT admin FROM projects WHERE code = ?';

            connection.query(sqlQuery, [code, uid], async (err, results) => {
                if (results.length > 0) {
                    const admin = results[0].admin;
                    try {
                        const userRecord = await findUserById(admin);
                        const { displayName: userName, photoURL: userPhoto , uid } = userRecord

                        const adminProject = [{ userName, userPhoto, uid }]

                        const sqlQuery = "SELECT * FROM members WHERE code = ? and member = 'true' and id_project = ?"

                        connection.query(sqlQuery, [code, id], (err, results) => {
                            if (err) {
                                console.error("Error al ejecutar la consulta SQL:", err.message);
                                res.status(500).send("Error interno del servidor");
                                return;
                            }

                            const members = results.map((e) => {
                                const { user_name: userName, user_photo: userPhoto, user_id: uid, code } = e
                                return ({ userName, userPhoto, uid, code })
                            });

                            io.to(socketMembers).emit('members', [...members, ...adminProject]);
                        })
                        // Continúa con tu lógica para emitir los miembros a la sala correspondiente
                    } catch (error) {
                        console.error('Error al buscar usuario por UID:', error);
                    }
                }
            })
        });

        // io.on('disconnect', () => {
        //     console.log('desconectado')
        // })
    }
    )
}

const notifications = (io) => {
    io.on('connection', (socket) => {
        socket.on('notifications', ({ code, id }) => {
            const socketCode = socket.codeProject = code

            if (socketCode) {
                socket.join(socketCode);
            }

            const sqlQuery = "SELECT * FROM members WHERE code = ? and member = 'pending' and id_project = ?"

            const { connection } = require('..');

            connection.query(sqlQuery, [code, id], (err, results) => {
                if (err) {
                    console.error("Error al ejecutar la consulta SQL:", err.message);
                    res.status(500).send("Error interno del servidor");
                    return;
                }

                const notification = results.map((e) => {
                    const { user_name: userName, user_photo: userPhoto, user_id: uid, code } = e
                    return ({ userName, userPhoto, uid, code })
                });

                io.to(socketCode).emit('notifications', notification);
            });
        })
    })
}

const memberRequests = (io) => {
    io.on('connection', (socket) => {
        socket.on('memberRequests', (e) => {
            const { code, uid, userName, userPhoto } = e;

            if (code && uid && userName) {
                const { connection } = require('..');

                const checkProjectQuery = 'SELECT id FROM projects WHERE code = ? and admin != ?';

                connection.query(checkProjectQuery, [code, uid], (checkProjectErr, checkProjectResult) => {
                    if (checkProjectErr) {
                        console.error("Error al verificar el proyecto:", checkProjectErr.message);
                        const response = {
                            status: false,
                            message: 'Error al verificar el proyecto',
                        };
                        io.emit('memberRequests', response);
                        return;
                    }

                    if (checkProjectResult.length > 0) {
                        const projectId = checkProjectResult[0].id;

                        const insertMemberQuery = 'INSERT INTO members (code, member, user_id, user_name, user_photo, id_project) VALUES (?, ?, ?, ?, ?, ?)';
                        const insertMemberValues = [code, 'pending', uid, userName, userPhoto, projectId];

                        connection.query(insertMemberQuery, insertMemberValues, (insertErr, insertResult) => {
                            if (insertErr) {
                                console.error("Error al agregar miembro:", insertErr.message);
                                const response = {
                                    status: false,
                                    message: 'Error, puede ser que ya has enviado la solicitud para unirte a este proyecto o formas parte del proyecto',
                                };
                                io.emit('memberRequests', response);
                            } else {
                                const response = {
                                    status: true,
                                    message: '¡Código de invitación enviado! Espera que el administrador del proyecto te acepte',
                                    data: projectId
                                };
                                io.emit('memberRequests', response);
                            }
                        });
                    } else {
                        const response = {
                            status: false,
                            message: 'No existe ningún proyecto con este código de invitación o ya formas parte del proyecto',
                        };
                        io.emit('memberRequests', response);
                    }
                });
            } else {
                const response = {
                    status: false,
                    message: 'Datos incompletos',
                };
                io.emit('memberRequests', response);
            }
        });

    })
}

module.exports = {
    getMembers,
    notifications,
    memberRequests
}