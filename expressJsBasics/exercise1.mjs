import express from 'express'

const app = express()
let methodGETCount = 0
let methodPOSTCount = 0

app.disable('x-powered-by')

const PORT = process.env.PORT || 1234

// middleware to get parsed body int the POST requests
// app.use((req, res, next) => {
//   const { method } = req

//   if (method !== 'POST') return next()

//   const body = []

//   req.on('data', (chunk) => {
//     body.push(chunk)
//   })

//   req.on('end', () => {
//     const parsedBody = Buffer.concat(body).toString()
//     console.log(parsedBody)

//     res.type('application/json')
//     req.body = parsedBody

//     next()
//   })
// })

// middleware to get parsed json in the body req BUT with express.json middleware
app.use(express.json())

app.use((req, res, next) => {
  const { method, url } = req

  console.log(`[${method}] - ${url}`)
  next()
})

app.use('/pokemon', (req, res, next) => {
  console.log('pokemon 👻')
  next()
})

app.get('*', (req, res, next) => {
  methodGETCount++
  console.log(`${methodGETCount} [GET] METHOD/S WAS MADE`)
  next()
})

app.post('*', (req, res, next) => {
  methodPOSTCount++
  console.log(`${methodPOSTCount} [POST] METHOD/S WAS MADE`)
  next()
})

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hi World 🌎</h1>')
})

app.get('/some/json', (req, res) => {
  res.json({ name: 'sherman', age: '21' })
})

app.post('/pokemon/save', (req, res) => {
  res.send(req.body)
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
