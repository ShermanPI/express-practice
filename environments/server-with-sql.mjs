import { createApp } from '../app.mjs'
import MovieModel from '../models/movies-mysql.js'

createApp({ movieModel: MovieModel })
