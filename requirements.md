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

# note: is a good practice that you can pass to the APIs everything you want and dont explode just because you pass an extra parameter for example, just process the things that needed. If it's an error for passing extra data, like if you pass an element that is not in the schema in a request, the API should not "cry" 🐇🐕

✅ - In the patch method if a movie of the id passed is not found return an 404 error to the client
✅ - make a function to validate the movies with the zod schema
✅ - make a function to validate the movies partially for the patch method
✅ - after validate the patch payload return 400 if a property is not valid, otherwise return the modified movie
✅ - try validating the id in the ID, if the schema does not have the id in the object, it cannot be modified because zod only will return the properties that are validating in the moment and that is what you want

### CORS SOLVING

✅ - Create a web with index.html
✅ - Make a fetch to get all the movies in the web
✅ - resolve the CORS error in the browser fixing it in the API
✅ - make a list of accepted origins and only fix the cors error to those origins

# NOTE: ✅ if the request comes from the same origin of the api, the request does not come with the 'origin' header, so try to validate the accepted origins without adding the same origin

# NOTE: For the methods DELETE / PATCH / PUT - the browser makes a PREFLIGHT request with the method OPTIONS an this method also needs the header 'Access-Control-Allow-Origin', so the others "complex methods" can be used, an remember that this mechanism also need the "Access-Control-Allow-Methods" with the methods allowed. EXAMPLE: 'DELETE, PATCH, PUT' 

# A preflight request is an HTTP request that is sent before the actual request to check if it is safe to send. It is a mechanism used by the Cross-Origin Resource Sharing (CORS) standard to request permission from a website before sending an HTTP request that could have side effects

✅ - make a DELETE method to delete a movie in the endpoints
✅ - make a delete button in the web page to delete an especific movie
✅ - resolve the CORS problem to the delete method

✅ - use the middleware cors, but remember to configure it to not allow all the origin to access the content (*). [remember to install it]
✅ - deploy the api in render
✅ - create a require and import the mock JSON
✅ - make pagination: https://express-practice-hek3.onrender.com/movies?limit=10&page=1&filter=inception