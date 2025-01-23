import validateMoviePartially from '../utils/validate-movie-partially.mjs'
import validateMovie from '../utils/validate-movie.mjs'

class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre, page, limit, filter } = req.query

    const data = await this.movieModel.getAll({ genre, page, limit, filter })
    res.json(data)
  }

  getById = async (req, res) => {
    const { id } = req.params

    const data = await this.movieModel.getById({ id })

    res.json(data)
  }

  add = async (req, res) => {
    const newMovie = { ...req.body, id: crypto.randomUUID() }

    const parsedMovie = validateMovie(newMovie)
    if (parsedMovie.success) {
      const data = await this.movieModel.add({ data: newMovie })
      return res.json(data)
    }

    return res.status(400).json({ error: parsedMovie.error.issues })
  }

  update = async (req, res) => {
    const { id } = req.params
    const result = validateMoviePartially(req.body)

    const movie = await this.movieModel.getById({ id })

    if (!movie) {
      return res.status(404).json({ message: 'Not found' })
    }

    if (!result.success) {
      return res.status(400).json({ errors: result.error.issues })
    }

    const updatedMovie = { ...movie, ...result.data }

    // this gonna be saved in the DB
    const movieResult = await this.movieModel.update({ id, data: updatedMovie })

    res.json(movieResult)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const resultMessage = await this.movieModel.delete({ id })

    if (!resultMessage.success) {
      return res.status(404).send(resultMessage)
    }

    return res.json(resultMessage)
  }
}

export default MovieController
