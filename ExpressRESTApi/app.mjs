import fs from 'node:fs/promises'
import crypto from 'node:crypto'
import express from 'express'
import moviesData from './moviesMock.json' assert {type: 'json'}
import validateMovie from './utils/validate-movie.mjs'
import validateMoviePartially from './utils/validate-movie-partially.mjs'

const app = express()
const PORT = 1234

const ALLOWED_ORIGINS = ["http://127.0.0.1:5500", "http://127.0.0.1:62461"]

app.disable('x-powered-by')
app.use(express.json())


app.use((req, res, next)=>{
  const origin = req.headers.origin

  // just used !origin because the same origin wont send the origin in the headers
  if(ALLOWED_ORIGINS.includes(origin) || !origin){
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'DELETE, OPTIONS, GET, POST')
  }

  next()
})

app.get('/', (req, res) => {
  res.send({ message: 'This is an API to learn ExpressJs :D' })
})

app.get('/movies', (req, res) => {
  const { genre } = req.query

  if (genre) { 
    const data = moviesData.filter(movie => movie.genre.map(genre => genre.toLocaleLowerCase()).includes(genre.toLocaleLowerCase()))
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

app.post('/movies', (req, res)=>{
  // replace this saving it in a database
  const newMovie = {...req.body, id: crypto.randomUUID()}

  const parsedMovie = validateMovie(newMovie)
  
  if (parsedMovie.success) {
    moviesData.push(newMovie)
    return res.json(newMovie)
  }

  return res.status(400).json({ error: parsedMovie.error.issues })
})

app.patch('/movies/:id', (req, res)=>{
  const { id } = req.params
  const result = validateMoviePartially(req.body)

  const movieIndex = moviesData.findIndex(el => el.id === id)
  const movie = moviesData[movieIndex]

  
  if(!movie){
    return res.status(404).json({ message: 'Not found' })
  }
  
  if(!result.success){
    return res.status(400).json({errors: result.error.issues})
  }

  const updatedMovie = {...movie, ...result.data}

  // this gonna be saved in the DB
  moviesData[movieIndex] = updatedMovie

  res.json(updatedMovie)
})

app.delete('/movies/:id', (req, res)=>{
  const { id } = req.params

  const movieIndexToDelete = moviesData.findIndex(movie => movie.id === id)
  
  if(movieIndexToDelete < 0){
    return res.status(404).json({message: 'Movie not found'})
  }
  moviesData.splice(movieIndexToDelete, 1)
  
  res.json({ message: 'Movie deleted'})
  
})

app.get(/^.*\.img$/, async (req, res)=>{
  const image = await fs.readFile('./test-image.jpg')
  res.type('jpg').send(image)
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
