✅- rememeber to run exercises using --watch nodejs flag
- install express
- install standard

exercise 1 - 
- create the app after import express
- when the app get a GET method in the endpoint '/' send an html to the client with code 200
- use the special method .send of express to send a response

# note: you can send a body to the client and express knows the content-type. e.g. (<h1> hola mundo </h1>)

- use the chainable res
- make the app listen from a PORT, that comes from the environment variable
- use the method .json to send back to the client a json
- make a post method to receive a json in a route named '/pokemon/save'
 

# note: the header x-powered-by is made by express framework

- delete the x-powered-by header with .disable
- make a GET route to '/pokemon/read'

# note: express solve the 404 cases by default

# note: express resolve the request from top to bottom. e.g. you have this:
## app.get('/', responseFn) // 1
## app.get('/other', otherResponseFn) // 2
## app.get('/another', anotherResponseFn) // 3
## app.get('/errorNotFounds404', anotherResponseFn) // 4
# The express order to resolve the request is from top to bottom, soy it goes for all the routes to check which to respond

# note: the .use() methos respond to any kind of REQUEST METHOD

- use the method .use((req, res)=>{}) to when the request has been passed for all the request handlers (remember is from top to bottom)
so if the request resolved so the client encounter an <h1>404</h1> response

- QUESTION! What is a middleware and why are important? and how is managed in express nodejs

# note: remember to use the next() when making a middleware (req, res, next)=>{fn}

- make a middleware to before handling all request print 'This is the all requests middleware'
- make a middleware to before handling all GET requests print 'This is the all GET requests middleware'
- make a middleware to before handling all POST requests print 'This is the all POST requests middleware'
- make a middleware to print 'pokemon 👻' only in the endpoints that has '/pokemon/*', 

# note: in most of the cases to make a middleware the mehtos .use() is more often used

- make a middleware to every time you receive a body in a POST request the body is parsed, after modify req.body = parsedData

# note: the object 'req' and 'res' is the same that will be used in the next request handlers

- after the middleware that parse the body use the body in another POST endpoint
- use the express middleware express.json() (do the same that the request of before was doing)