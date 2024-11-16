import { readJSON } from '../utils/readJSON.mjs'

const moviesData = readJSON('../moviesMock.json')

class MovieModel {
  static async getAll ({ genre, page, limit, filter }) {
    let data = moviesData

    if (genre) {
      data = moviesData.filter(movie => movie.genre.map(genre => genre.toLocaleLowerCase()).includes(genre.toLocaleLowerCase()))
    }

    if (filter) {
      data = data.filter(movie => movie.title.includes(filter))
    }

    const currentPage = page || 1
    const itemsPerPage = limit || 10
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    data = data.slice(startIndex, endIndex)

    return (data)
  }
}

export default MovieModel
