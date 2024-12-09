import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'moviesdb'
})

try {
  const [results, fields] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate,  FROM movie')

  console.log(results)
  console.log(fields)
} catch (err) {
  console.log(err)
}

// Using placeholders
// try {
//   const [results] = await connection.query(
//     'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//     ['Page', 45]
//   );

//   console.log(results);
// } catch (err) {
//   console.log(err);
// }
