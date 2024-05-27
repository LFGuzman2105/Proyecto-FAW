const connection = require('../config/configDB');

module.exports = (app) => {
    app.post('/login', (req, res) => {
        connection.query(`SELECT id, Nombre FROM Usuarios 
        WHERE Email = "${req.body.email}" AND Contrasena = "${req.body.contrasena}"`, (error, rows, columns) => {
            if (error) {
                res.json({status: 0, mensaje: "Error en el servidor. " + error});
            }
            else if (rows.length == 0) {
                res.json({status: 0, mensaje: "Usuario incorrecto."});
            }  
            else {
                res.json({status: 1, mensaje: "Usuario logueado correctamente.", data: rows});
            }
        });
    });

    app.post('/registroUsuario', (req, res) => {
        connection.query(`SELECT id FROM Usuarios WHERE Email = "${req.body.email}"`, (error, rows, columns) => {
            if (error) {
                res.json({status: 0, mensaje: "Error en el servidor. " + error});
            }
            else if (rows.length == 0) {
                connection.query(`INSERT INTO Usuarios VALUES(null, "${req.body.email}", "${req.body.nombres}", "${req.body.fecha_nacimiento}", 
                "${req.body.contrasena}", "${req.body.genero}")`, (error, rows, columns) => {
                    if (error) {
                        res.json({ status: 0, mensaje: "Error en el servidor. " + error });
                        console.log(error);
                    }
                    else {
                        res.json({ status: 1, mensaje: "Usuario creado correctamente." });
                    }
                });
            }
            else {
                res.json({status: 0, mensaje: "Este email ya se encuentra registrado."});
            }
        });
    });
}