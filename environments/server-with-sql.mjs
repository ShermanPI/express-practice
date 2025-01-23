import { createApp } from '../app.mjs'
import MovieModel from '../models/movies-mysql'

createApp({ movieModel: MovieModel })
