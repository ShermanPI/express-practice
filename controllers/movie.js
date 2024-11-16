import MovieModel from '../models/movie.js'

class MovieController {
  static async getAll (req, res) {
    const { genre, page, limit, filter } = req.query

    const data = await MovieModel.getAll({ genre, page, limit, filter })

    res.json(data)
  }
}

export default MovieController
