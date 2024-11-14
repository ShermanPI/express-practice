import express from 'express'

import moviesRouter from './routes/movies.js'
import corsMiddleware from './middlewares/cors.mjs'

const app = express()
const PORT = process.env.PORT || 1234

app.disable('x-powered-by')

app.use(express.json())
app.use(corsMiddleware)

app.get('/', (req, res) => {
  res.send({ message: 'This is an API to learn ExpressJs :D' })
})

app.use('/movies', moviesRouter)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
