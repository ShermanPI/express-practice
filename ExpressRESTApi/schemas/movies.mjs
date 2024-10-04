import { z } from 'zod'

const movieSchema = z.object({
  title: z.string(),
  year: z.number().min(1900, { message: 'Year only accepts min year 1900' }),
  director: z.string(),
  duration: z.number().min(2),
  poster: z.string().url().endsWith('.webp'),
  genre: z.enum([
    'Animation',
    'Action',
    'Drama',
    'Crime',
    'Romance',
    'Biography',
    'Sci-Fi',
    'Adventure',
    'Fantasy'
  ]),
  rate: z.number().min(0).max(10)
})

export default movieSchema
