import express from 'express'
import moviesData from './moviesMock.json' assert {type: 'json'}

const app = express()
const PORT = 1234

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send({ message: 'This is an API to learn ExpressJs :D' })
})

app.get('/movies', (req, res) => {
  const { genre } = req.query

  if (genre) {
    const data = moviesData.filter(movie => movie.genre.map(genre => genre.toLocaleLowerCase()).includes(genre))
    res.json(data)
  }
  res.send(moviesData)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = moviesData.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
