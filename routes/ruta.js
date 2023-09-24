const express = require('express');
const router = express.Router();

// Definir una ruta GET para '/ruta1'
router.get('/', (req, res) => {
    
    const sqlQuery = "SELECT * FROM projects"; // Reemplaza "miTabla" por el nombre de tu tabla
    
    const connection = require('..');

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta SQL:", err.message);
            res.status(500).send("Error interno del servidor");
            return;
        }

        // Enviar los resultados como respuesta
        res.json(results);
    });

});

router.get('/1', (req, res) => {
    
    const sqlQuery = "SELECT * FROM stage"; // Reemplaza "miTabla" por el nombre de tu tabla
    
    const connection = require('..');

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta SQL:", err.message);
            res.status(500).send("Error interno del servidor");
            return;
        }

        // Enviar los resultados como respuesta
        res.json(results);
    });

});

module.exports = router;