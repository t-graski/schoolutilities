// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');

export function requestDb(query: string, parameters: [any]) {
  this.connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  return new Promise((resolve, reject) => {
    this.connection.query(query, parameters, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
