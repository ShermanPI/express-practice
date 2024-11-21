import { Router } from 'express'
import fs from 'node:fs/promises'
import MovieController from '../controllers/movie.js'

const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)

moviesRouter.get('/:id', MovieController.getById)

moviesRouter.post('/', MovieController.add)

moviesRouter.patch('/:id', MovieController.update)

moviesRouter.delete('/:id', MovieController.delete)

moviesRouter.get(/^.*\.img$/, async (req, res) => {
  const image = await fs.readFile('./test-image.jpg')
  res.type('jpg').send(image)
})

export default moviesRouter
