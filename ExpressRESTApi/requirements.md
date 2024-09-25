✅ - disable header x-powered-by in the expressjs app

✅ - make possible the requests that you can find in the request.http file

✅ - make a path to regex in expressjs (made it to respond to all request finishing on .img)

✅ - use node:crypto to create a new id when creating a new movie

✅ - install zod schema for validations in the post requests
  ✅ - when creating a movie:
  ✅ - title must be a string
  ✅ - year must be a integer number and positive and min 1900 and max 024
  ✅ - director: string
  ✅ - duration: number > 0
  ✅ - duration: number > 0
  ✅ - rate: number min 0 max 10, and default 5
  ✅ - poster: string and url
  ✅ - genre: enum with an array of all categories

✅ - if it is an error in the post request from zod schema return the error 400 to the client, and the message, otherwise just return the data

# note: is a good practice that you can pass to the APIs everything you want and dont explode just because you pass an extra parameter for example, just process the things that needed. If it's an error, like if you pass an element that is not in the schema in a request the API should not cry 🐇🐕

