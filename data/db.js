require('dotenv').config();
const mysql = require('mysql2/promise');
const config = require('./db.config');

const pool = mysql.createPool(config.poolConfig);

async function exec(query, values) {
    return pool.execute(query, values);
}

/** See documentation from original answer */
async function transaction(queries, queryValues) {
    if (queries.length !== queryValues.length) {
        return Promise.reject(
            'The number of provided queries did not match the number of provided query values arrays'
        )
    }

    const queryPromises = [];
    const connection = await mysql.createConnection(config.connectionConfig);

    try {
        await connection.beginTransaction();
        queries.forEach((query, index) => {
            queryPromises.push(connection.query(query, queryValues[index]));
        })
        const results = await Promise.all(queryPromises);
        await connection.commit();
        return results;
    } catch (err) {
        await connection.rollback();
        return Promise.reject(err);
    } finally {
        await connection.end();
    }
}

module.exports = {exec, transaction};