const express = require('express');
const router = express.Router();

router.use(express.json())

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

router.post('/create', async (req, res) => {

  const { name, code, id, date, admin } = req.body;

  if (name && code && id && date && admin) {
    try {
      const connection = require('..'); // Reemplaza '..' con la ubicación correcta de tu archivo de conexión a la base de datos

      // Preparar la consulta SQL con marcadores de posición
      const sqlQuery = 'INSERT INTO projects (name, code, id, date, admin) VALUES (?, ?, ?, ?, ?)';
      const values = [name, code, id, date, admin];

      await connection.query(sqlQuery, values);

      // Enviar los resultados como respuesta
      const response = {
        status: true,
        message: 'Proyecto creado exitosamente',
        data: { id, code, name },
      };
      res.json(response);

    } catch (error) {
      console.error("Error al ejecutar la consulta SQL:", error.message);
      res.status(500).send("Error interno del servidor");
    }
  } else {
    const response = {
      status: false,
      message: 'Datos incompletos',
    };

    res.json(response);
  }
});

router.get('/stage', (req, res) => {

  const { idProject } = req.query

  const sqlQuery = "SELECT * FROM stage WHERE id_project = ?";

  const connection = require('..');

  connection.query(sqlQuery, [idProject], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta SQL:", err);
      res.status(500).send("Error interno del servidor", err);
      return;
    }

    console.log(results); // Muestra los resultados en la consola para depuración.

    const response = {
      status: true,
      message: 'etapas encontradas exitosamente',
      data: results,
    };

    res.json(response);
  });
});

router.post('/stage', async (req, res) => {

  const { name, id, idProject, description } = req.body

  if (name && id && idProject && description) {
    const sqlQuery = 'INSERT INTO stage (name, id, id_project, description) VALUES (?, ?, ?, ?)';
    const values = [name, id, idProject, description];

    try {
      const connection = require('..');

      await connection.query(sqlQuery, values);

      const response = {
        status: true,
        message: 'Etapa agregada exitosamente'
      };
      res.json(response);

    } catch (error) {
      console.error("Error al ejecutar la consulta SQL:", error.message);
      res.status(500).send("Error interno del servidor");
    }
  } else {
    const response = {
      status: false,
      message: 'Datos incompletos',
    };

    res.json(response);
  }
});

module.exports = router;





