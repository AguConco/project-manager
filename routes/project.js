const express = require('express')
const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {

  const { admin, id } = req.query

  let values = []
  let sqlQuery = ""

  if (id === '') {
    sqlQuery = "SELECT * FROM projects WHERE admin = ?"
    values = [admin]
  } else {
    sqlQuery = `
    SELECT DISTINCT projects.*
    FROM projects
    WHERE projects.admin = ? AND projects.id = ?
    UNION
    SELECT DISTINCT projects.*
    FROM projects
    INNER JOIN members ON projects.id = members.id_project
    WHERE members.user_id = ? AND members.member = 'true';
    `
    values = [admin, id, admin]
  }

  const { connection } = require('..');

  connection.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta SQL:", err.message);
      res.status(500).send("Error interno del servidor");
      return;
    }

    const response = id === '' ? results : results.filter(e => e.id === id)

    res.json(response);
  });
});

router.get('/code', (req, res) => {

  const { admin } = req.query
  const sqlQuery = `
    SELECT projects.*, members.member
    FROM members
    INNER JOIN projects ON members.id_project = projects.id
    AND members.user_id = ?
  `;

  // AND members.member = 'true'

  const { connection } = require('..');

  connection.query(sqlQuery, [admin], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta SQL:", err.message);
      res.status(500).send("Error interno del servidor");
      return;
    }

    res.json(results);
  });

})

router.post('/create', async (req, res) => {

  const { name, code, id, date, admin } = req.body;

  if (name && code && id && date && admin) {
    try {
      const { connection } = require('..'); // Reemplaza '..' con la ubicación correcta de tu archivo de conexión a la base de datos

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

  const { connection } = require('..');

  connection.query(sqlQuery, [idProject], (err, results) => {
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

    res.json(response);
  });
});

router.post('/stage', async (req, res) => {

  const { name, id, idProject, description } = req.body

  if (name && id && idProject && description) {
    const sqlQuery = 'INSERT INTO stage (name, id, id_project, description) VALUES (?, ?, ?, ?)';
    const values = [name, id, idProject, description];

    try {
      const { connection } = require('..');

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

router.delete('/delete', async (req, res) => {

});


module.exports = router;



