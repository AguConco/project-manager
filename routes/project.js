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

    res.json(results.length !== 0 ? results : []);
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

  const { name, id, idProject, description, color } = req.body

  if (name && id && idProject) {
    const sqlQuery = 'INSERT INTO stage (name, id, id_project, description, color) VALUES (?, ?, ?, ?, ?)';
    const values = [name, id, idProject, description, color];

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

router.put('/accept', (req, res) => {
  const { code, uid, admin } = req.body

  const sqlQuery = "UPDATE members m, projects p SET m.member = 'true' WHERE m.code = ? AND m.user_id = ? AND p.admin = ? AND m.id_project = p.id";

  const { connection } = require('..');

  connection.query(sqlQuery, [code, uid, admin], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta SQL:", err.message);
      res.status(500).send("Error interno del servidor");
      return;
    }

    console.log(results)
    if (results.affectedRows !== 0) {
      const response = {
        status: true,
        message: 'Aceptado',
      };

      res.json(response);
    } else {
      const response = {
        status: false,
        message: 'Ocurrio un error, todavía no fue aceptado',
      };

      res.status(500).json(response);
    }
  });
})

router.delete('/reject', (req, res) => {

  const { code, uid, admin } = req.body

  const sqlQuery = `
  DELETE FROM members
  WHERE code = ? AND user_id = ? AND id_project IN (
      SELECT id FROM projects WHERE admin = ?
  );
`

  const { connection } = require('..');

  connection.query(sqlQuery, [code, uid, admin], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta SQL:", err.message);
      res.status(500).send("Error interno del servidor");
      return;
    }

    if (results.affectedRows !== 0) {
      const response = {
        status: true,
        message: 'Rechazado',
      };

      res.json(response);
    } else {
      const response = {
        status: false,
        message: 'Ocurrio un error, todavía no fue aceptado',
      };

      res.status(500).json(response);
    }
  });
})

router.delete('/delete', async (req, res) => {
  const { id } = req.body

  const sqlQuery = `
  DELETE projects, stage, tasks
  FROM projects
  LEFT JOIN stage ON projects.id = stage.id_project
  LEFT JOIN tasks ON projects.id = tasks.id_project
  WHERE projects.id = ?;
`
  const { connection } = require('..');

  
  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta SQL:", err.message);
      res.status(500).send("Error interno del servidor");
      return;
    }

    if (results.affectedRows !== 0) {
      const response = {
        status: true,
        message: 'Proyecto eliminado',
      };

      res.json(response);
    } else {
      const response = {
        status: false,
        message: 'Ocurrio un error, no se pudo eliminar',
      };

      res.status(500).json(response);
    }
  });
});


module.exports = router;



