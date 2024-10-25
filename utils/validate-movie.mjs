import movieSchema from '../schemas/movies.mjs'

const validateMovie = (movie) => {
  movieSchema.safeParse(movie)
}

export default validateMovie
