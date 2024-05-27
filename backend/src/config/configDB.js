const mysql = require('mysql');
const connection = mysql.createConnection({ 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyectoFAW'
});

connection.connect((error) => {
    if (error) {
        console.error('El error de conexión es: ' + error);
        return;
    }
    console.log('¡Conectado a la base de datos MySQL!');
});

module.exports = connection;