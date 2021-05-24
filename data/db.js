require('dotenv').config();
const mysql = require('mysql2/promise');
const config = require('./db.config');

const pool = mysql.createPool(config.poolConfig);

async function exec(query, values) {
    return pool.execute(query, values);
}

async function transaction(queries, queryValues) {
    if (queries.length !== queryValues.length) {
        return Promise.reject(
            'The number of provided queries did not match the number of provided query values arrays'
        )
    }

    try {
        const queryPromises = [];
        await pool.beginTransaction((error) => console.log(`Error beginTransaction: ${error}`));
        queries.forEach((query, index) => {
            queryPromises.push(pool.query(query, queryValues[index]));
        })
        const results = await Promise.all(queryPromises);
        await pool.commit();
        return results;
    } catch (err) {
        await pool.rollback(() => console.log('Transaction has been rollback'));
        return Promise.reject(err);
    }
}

module.exports = {exec, transaction};