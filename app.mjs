import express from 'express'
import cors from 'cors'
import moviesRouter from './routes/movies'

const app = express()
const PORT = process.env.PORT || 1234

// NO LIBRARIES CORS PROBLEM SOLVED 🚫📚
// app.use((req, res, next)=>{
//   const origin = req.headers.origin

//   // just used !origin because the same origin wont send the origin in the headers
//   if(ALLOWED_ORIGINS.includes(origin) || !origin){
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'DELETE, OPTIONS, GET, POST')
//   }

//   next()
// })

// USING CORS LIBRARY TO SOLVE CORS PROBLEM 📚
// CORS DOCUMENTATION: https://expressjs.com/en/resources/middleware/cors.html
const corsOptions = {
  origin: function (origin, callback) {
    const ALLOWED_ORIGINS = ['http://127.0.0.1:5500', 'http://127.0.0.1:62461']

    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}

app.use(cors(corsOptions))

app.disable('x-powered-by')
app.use(express.json())

app.get('/', (req, res) => {
  res.send({ message: 'This is an API to learn ExpressJs :D' })
})

app.use('/movies', moviesRouter)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
