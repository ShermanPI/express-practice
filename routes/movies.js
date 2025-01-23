import { Router } from 'express'
import fs from 'node:fs/promises'
import MovieController from '../controllers/movie.js'

export const createMoviesRouter = ({ movieModel }) => {
  const moviesRouter = Router()

  const movieController = new MovieController({ movieModel })

  moviesRouter.get('/', movieController.getAll)

  moviesRouter.get('/:id', movieController.getById)

  moviesRouter.post('/', movieController.add)

  moviesRouter.patch('/:id', movieController.update)

  moviesRouter.delete('/:id', movieController.delete)

  moviesRouter.get(/^.*\.img$/, async (req, res) => {
    const image = await fs.readFile('./test-image.jpg')
    res.type('jpg').send(image)
  })

  return moviesRouter
}
