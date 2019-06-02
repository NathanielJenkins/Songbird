const mysql = require('mysql')
const util = require('util');
const env = require('dotenv').config(); 

const connection = mysql.createConnection({
    host : process.env.DATABASEHOST,
    database: process.env.DATABASENAME,
    user : process.env.DATABASEUSER,
    password : process.env.DATABASEPASSWORD
})

const pool = mysql.createPool({
    connectionLimit : 10, 
    host : process.env.DATABASEHOST,
    database: process.env.DATABASENAME,
    user : process.env.DATABASEUSER,
    password : process.env.DATABASEPASSWORD
})

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

module.exports = pool