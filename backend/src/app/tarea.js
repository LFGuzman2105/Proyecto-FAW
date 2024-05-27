const connection = require('../config/configDB');

module.exports = (app) => {
    app.get('/listado/:id', (req, res) => {
        connection.query(`SELECT t.id, t.Titulo, t.Prioridad, t.Descripcion, t.Fecha_Creacion, u.Nombre, t.Estatus FROM Tareas t
        JOIN Usuarios u ON t.id_Usuario = u.id
        WHERE u.id = ${req.params.id}`, (error, rows, columns) => {
            if (error) {
                res.json({status: 0, mensaje: "Error en el servidor. " + error});
            }
            else if (rows.length == 0) {
                res.json({status: 0, mensaje: "No tiene tareas asignadas."});
            }  
            else {
                res.json({status: 1, mensaje: "Se han encontrado tareas asignadas.", data: rows});
            }
        });
    });

    app.post('/listado/:id', (req, res) => {
        let query = "";

        if (req.body.filtroAZ == "ASC") {
            query = `SELECT * FROM Tareas WHERE id_Usuario = ${req.params.id} ORDER BY Titulo ASC, Fecha_Creacion ASC`;
        }
        else if (req.body.filtroAZ == "DESC") {
            query = `SELECT * FROM Tareas WHERE id_Usuario = ${req.params.id} ORDER BY Titulo DESC, Fecha_Creacion DESC`;  
        }
        else if (req.body.prioridad == "ALTA" || req.body.prioridad == "MEDIA" || req.body.prioridad == "BAJA") {
            query = `SELECT * FROM Tareas WHERE id_Usuario = ${req.params.id} AND Prioridad = "${req.body.prioridad}"`;  
        }
        else if (req.body.buscar != "") {
            query = `SELECT * FROM Tareas WHERE id_Usuario = ${req.params.id} AND 
            (Titulo LIKE "%${req.body.buscar}%" OR Descripcion LIKE "%${req.body.buscar}%")`;
        }

        if (query != "") {
            connection.query(query, (error, rows, columns) => {
                if (error) {
                    res.json({status: 0, mensaje: "Error en el servidor. " + error});
                }
                else if (rows.length == 0) {
                    res.json({status: 0, mensaje: "No tiene tareas asignadas."});
                }  
                else {
                    res.json({status: 1, mensaje: "Se han encontrado tareas asignadas.", data: rows});
                }
            });
        }
    });

    app.put('/listado/:id', (req, res) => {
        connection.query(`UPDATE Tareas SET Estatus = "FINALIZADA" WHERE id = ${req.body.id}`, (error, rows, columns) => {
            if (error) {
                res.json({status: 0, mensaje: "Error en el servidor. " + error});
            }
            else {
                res.json({status: 1, mensaje: "Se ha actualizado correctamente."});
            }
        });
    });
    

    app.post('/agregarTarea/:id', (req, res) => {
        connection.query(`INSERT INTO Tareas VALUES(null, "${req.body.titulo}", "${req.body.prioridad}", "${req.body.descripcion}", 
        "${req.body.fecha_creacion}", ${req.params.id}, "${req.body.estatus}")`, (error, rows, columns) => {
            if (error) {
                res.json({status: 0, mensaje: "Error en el servidor. " + error});
            }
            else {
                res.json({status: 1, mensaje: "Se ha creado correctamente la tarea."});
            }
        });
    });
}