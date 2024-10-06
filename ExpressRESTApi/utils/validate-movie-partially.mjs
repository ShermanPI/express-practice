import movieSchema from '../schemas/movies.mjs'

const validateMoviePartially = (movie) => {
  const partialMovieSchema = movieSchema.partial()

  return partialMovieSchema.safeParse(movie)
}

export default validateMoviePartially
