import { Router } from 'express'
import { readJSON } from '../utils/readJSON.mjs'
import validateMovie from '../utils/validate-movie.mjs'
import validateMoviePartially from '../utils/validate-movie-partially.mjs'
import fs from 'node:fs/promises'

const moviesData = readJSON('../moviesMock.json')

const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
  const { genre, page, limit, filter } = req.query

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

  res.send(data)
})

moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = moviesData.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

moviesRouter.post('/', (req, res) => {
  // replace this saving it in a database
  const newMovie = { ...req.body, id: crypto.randomUUID() }

  const parsedMovie = validateMovie(newMovie)

  if (parsedMovie.success) {
    moviesData.push(newMovie)
    return res.json(newMovie)
  }

  return res.status(400).json({ error: parsedMovie.error.issues })
})

moviesRouter.patch('/:id', (req, res) => {
  const { id } = req.params
  const result = validateMoviePartially(req.body)

  const movieIndex = moviesData.findIndex(el => el.id === id)
  const movie = moviesData[movieIndex]

  if (!movie) {
    return res.status(404).json({ message: 'Not found' })
  }

  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues })
  }

  const updatedMovie = { ...movie, ...result.data }

  // this gonna be saved in the DB
  moviesData[movieIndex] = updatedMovie

  res.json(updatedMovie)
})

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params

  const movieIndexToDelete = moviesData.findIndex(movie => movie.id === id)

  if (movieIndexToDelete < 0) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  moviesData.splice(movieIndexToDelete, 1)

  res.json({ message: 'Movie deleted' })
})

moviesRouter.get(/^.*\.img$/, async (req, res) => {
  const image = await fs.readFile('./test-image.jpg')
  res.type('jpg').send(image)
})

export default moviesRouter
