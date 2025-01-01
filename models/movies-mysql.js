import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'moviesdb'
})

class MovieModel {
  static async getAll ({ genre, page, limit, filter }) {
    // const { genre, page, limit, filter }

    let query = 'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie'
    const [data] = await connection.query(query)

    if (genre) {
      const [genres] = await connection.query('SELECT * FROM genre WHERE name LIKE ?', genre)

      if (!genres) {
        return []
      }

      const [{ id }] = genres
      query =
        `SELECT DISTINCT BIN_TO_UUID(m.id) as id, m.title, m.year, g.id as genre_id, g.name 
        FROM movie as m
        INNER JOIN movie_genre ON BIN_TO_UUID(movie_genre.movie_id) = BIN_TO_UUID(m.id)
        INNER JOIN genre as g ON movie_genre.genre_id = g.id
        WHERE g.id = ?
        WHERE m.title LIKE ?
        LIMIT ?
        OFFSET ?`

      const [data] = await connection.query(query, id, filter, limit, page * limit)
      return data
    }

    return data
  }

  static async getById ({ id }) {
    // const [data] = []
    // const movie = data.find(movie => movie.id === id)
    // if (movie) return movie

    // return { message: 'Movie not found' }
  }

  static async add ({ data }) {
    // moviesData.push(data)

    // return data
  }

  static async update ({ id, data }) {
    // const movieIndex = moviesData.findIndex(el => el.id === id)
    // moviesData[movieIndex] = data

    // return data
  }

  static async delete ({ id }) {
    // const movieIndexToDelete = moviesData.findIndex(movie => movie.id === id)

    // if (movieIndexToDelete < 0) {
    //   return { message: 'Movie not found', success: false }
    // }

    // moviesData.splice(movieIndexToDelete, 1)
    // return { message: 'Movie deleted', success: true }
  }
}

export default MovieModel
