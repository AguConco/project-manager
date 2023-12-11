const express = require('express')
const router = express.Router()

router.use(express.json())

router.post('/create', async (req, res) => {
    const { name, creationDate, id, userId, priority, idProject, idStage } = req.body

    if (name && id && creationDate && userId && priority && idProject && idStage) {
        try {
            const { connection } = require('..');

            const sqlQuery = 'INSERT INTO tasks (name, id, creation_date, user_id, priority, id_project, id_stage) VALUES (?, ?, ?, ?, ?, ?,?)';
            const values = [name, id, creationDate, userId, priority, idProject, idStage];

            await connection.query(sqlQuery, values);

            const response = {
                status: true,
                message: 'Tarea creada correctamente',
            }
            res.json(response)

        } catch (error) {
            console.error("Error al ejecutar la consulta SQL:", error.message)
            res.status(500).send("Error interno del servidor")
        }
    } else {
        const response = {
            status: false,
            message: 'Datos incompletos',
        };

        res.json(response);
    }
})

module.exports = router