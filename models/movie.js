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

  static async getById ({ id }) {
    const movie = moviesData.find(movie => movie.id === id)
    if (movie) return movie

    return { message: 'Movie not found' }
  }

  static async add ({ data }) {
    moviesData.push(data)

    return data
  }

  static async update ({ id, data }) {
    const movieIndex = moviesData.findIndex(el => el.id === id)
    moviesData[movieIndex] = data

    return data
  }

  static async delete ({ id }) {
    const movieIndexToDelete = moviesData.findIndex(movie => movie.id === id)

    if (movieIndexToDelete < 0) {
      return { message: 'Movie not found', success: false }
    }

    moviesData.splice(movieIndexToDelete, 1)
    return { message: 'Movie deleted', success: true }
  }
}

export default MovieModel
