import movieSchema from '../schemas/movies.mjs'

const validateMovie = (movie) => {
  return movieSchema.safeParse(movie)
}

export default validateMovie
