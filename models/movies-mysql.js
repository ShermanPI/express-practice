import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'moviesdb'
})

class MovieModel {
  static async getAll ({ genre = '', page = 1, limit = 10, filter = '' }) {
    let query = 'SELECT BIN_TO_UUID(m.id) AS id, title, year, director, duration, poster, rate FROM movie AS m'
    const params = []

    // Condicional para agregar INNER JOIN si se pasa un género
    if (genre) {
    // Consulta para encontrar el género
      const [genres] = await connection.query('SELECT * FROM genre WHERE name LIKE ?', [`%${genre}%`])

      if (!genres || genres.length === 0) {
        return [] // Si no se encuentra el género, se retorna un arreglo vacío
      }

      // Se agrega el INNER JOIN relacionado con el género
      query += `
        INNER JOIN movie_genre ON BIN_TO_UUID(movie_genre.movie_id) = BIN_TO_UUID(m.id)
        INNER JOIN genre AS g ON movie_genre.genre_id = g.id
        WHERE g.id = ?`

      const [{ id }] = genres
      console.log('📝📝📝', id)
      params.push(id)
    }

    if (filter) {
      query += ' AND m.title LIKE ?'
      params.push(`%${filter}%`)
    }

    query += ' LIMIT ? OFFSET ?'
    params.push(limit, (page - 1) * limit)

    console.log('Consulta SQL:', query)
    console.log('Parámetros:', params)

    try {
      const [data] = await connection.query(query, params)
      return data
    } catch (error) {
      console.error('Error en la consulta:', error)
      return []
    }
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
