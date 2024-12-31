// import MovieModel from '../models/movie.js'
import MovieModel from '../models/movies-mysql.js'
import validateMoviePartially from '../utils/validate-movie-partially.mjs'
import validateMovie from '../utils/validate-movie.mjs'

class MovieController {
  static async getAll (req, res) {
    const { genre, page, limit, filter } = req.query

    const data = await MovieModel.getAll({ genre, page, limit, filter })
    res.json(data)
  }

  static async getById (req, res) {
    const { id } = req.params

    const data = await MovieModel.getById({ id })

    res.json(data)
  }

  static async add (req, res) {
    const newMovie = { ...req.body, id: crypto.randomUUID() }

    const parsedMovie = validateMovie(newMovie)
    if (parsedMovie.success) {
      const data = await MovieModel.add({ data: newMovie })
      return res.json(data)
    }

    return res.status(400).json({ error: parsedMovie.error.issues })
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validateMoviePartially(req.body)

    const movie = await MovieModel.getById({ id })

    if (!movie) {
      return res.status(404).json({ message: 'Not found' })
    }

    if (!result.success) {
      return res.status(400).json({ errors: result.error.issues })
    }

    const updatedMovie = { ...movie, ...result.data }

    // this gonna be saved in the DB
    const movieResult = await MovieModel.update({ id, data: updatedMovie })

    res.json(movieResult)
  }

  static async delete (req, res) {
    const { id } = req.params

    const resultMessage = await MovieModel.delete({ id })

    if (!resultMessage.success) {
      return res.status(404).send(resultMessage)
    }

    return res.json(resultMessage)
  }
}

export default MovieController
