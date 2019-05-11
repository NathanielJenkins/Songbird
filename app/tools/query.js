const mysql = require('mysql')
const env = require('dotenv').config(); 

const connection = mysql.createConnection({
    host : process.env.DATABASEHOST,
    database: process.env.DATABASENAME,
    user : process.env.DATABASEUSER,
    password : process.env.DATABASEPASSWORD
})

module.exports = {
    connect : () => {
        //connect to the database
        connection.connect ((err) => {
            if (err) {
                console.error(`Error connecting: ${err.stack}`) 
                return;
            }
        });
    },

    query : ( sql, values ) => {
        connection.query({
            sql : sql, 
            values : values

        },  (err, results, fields) => {
            if (err) console.error(`Database error: ${err.stack}`)
            return results
        } 

    )},  

    disconnect : () => {
        connection.end;
    }
} 

// connection.connect(function(err) {
//     if (err) {
//         console.error('Error connecting: ' + err.stack);
//         return;
//     }

//     console.log('Connected as id ' + connection.threadId);
// });

// connection.query('SELECT * FROM employee', function (error, results, fields) {
//     if (error)
//         throw error;

//     results.forEach(result => {
//         console.log(result);
//     });
// });

// connection.end();

