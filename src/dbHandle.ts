import * as mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

export const conn: mysql.Pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
});

export const sql = (sql: string, arr: string[]): Promise<unknown> => new Promise((resolve, reject) => {
    conn.query(sql, arr, (err, rows, fields) => {
        if (err)
            return reject(err);
        return resolve(JSON.parse(JSON.stringify(rows)));
    });
})