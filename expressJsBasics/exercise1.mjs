import express from 'express'

const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT || 1234

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hi World 🌎</h1>')
})

app.get('/some/json', (req, res) => {
  res.json({ name: 'sherman', age: '21' })
})

app.post('/pokemon/save', (req, res) => {
  const body = []

  req.on('data', (chunk) => {
    body.push(chunk)
  })
    .on('end', () => {
      const parsedChunkOfData = Buffer.concat(body).toString()
      res.type('application/json').send(parsedChunkOfData)
    })
})

app.get('/pokemon/read/pikachu', (req, res) => {
  res.json({ name: 'Pikachu', elementIcon: '⚡' })
})

app.use((req, res) => {
  res.status(404).send('<h1>404 not found 🐕</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`)
})
