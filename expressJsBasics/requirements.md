✅- rememeber to run exercises using --watch nodejs flag
✅ - install express
✅ - install standard

exercise 1 - 
✅ - create the app variable and use an express instance
- make the app listen from a PORT, that comes from the environment variable
✅ - when the app get a GET method in the endpoint '/' send an html with '<h1>Hi World 🌎</h1>' to the client with code 200
✅ - use the special method .send of express to send a response

# note: you can use .send(), express knows the content-type for the body. e.g. (<h1> hola mundo </h1>)

✅ - use the chainable res
✅ - use the method .json to send back to the client a json
✅ - make a post method to receive a json in a route named '/pokemon/save'
 

# note: the header x-powered-by is made by express framework

✅ - delete the x-powered-by header with .disable
✅ - make a GET route to '/pokemon/read'

# note: express solve the 404 cases by default

# note: express resolve the request from top to bottom. e.g. you have this:
## app.get('/', responseFn) // 1 - first express try to solve
## app.get('/other', otherResponseFn) // 2
## app.get('/another', anotherResponseFn) // 3
## app.get('/errorNotFounds404', anotherResponseFn) // 4
# The express order to resolve the request is from top to bottom, soy it goes for all the routes to check which to respond

# note: the .use() methos respond to any kind of REQUEST METHOD

✅ - use the method .use((req, res)=>{}) to when the request has been passed for all the request handlers to resolve the error 404 mannualy (remember is from top to bottom)
so if the request resolved so the client encounter an <h1>404</h1> response

- QUESTION! What is a middleware and why are important? and how is managed in express nodejs

1 - What is a middleware?
    Is logic that is normally executed after the server received the request and before its request is fully resolved. Middleware typically sits between the incoming HTTP request and the final request handler (or route handler)

2 - Why middlewares are important?
    the middleware are importante cause the let you save a lot of time coding the same logic to resolve the same things like these:
        - Parsing request bodies (e.g., JSON, URL-encoded data)
        - Logging requests
        - Authentication and authorization
        - Modifying requests or responses
        - Handling errors
        

3 - How middlewares are managed in expressjs?
    in express we have in the request handler function a third parameter named next() to every time a middleware have made the logic for us express continue to resolve the next endpoints resolvers, and normally the .use() methos is use to make a middleware globally reachable


# note: remember to use the next() when making a middleware in the request handler function (req, res, next)=>{fn}

✅ - make a global middleware to before handling all request print '[request method] - url'
✅ - make a middleware to before handling all GET requests print 'This is the all GET requests middleware'
✅ - make a middleware to before handling all POST requests print 'This is the all POST requests middleware'
✅ - make a middleware to print 'pokemon 👻' only in the endpoints that has '/pokemon/*', 

# note: in most of the cases to make a middleware the mehtos .use() is more often used

✅ - make a middleware to every time you receive a body in a POST and the request the body need to be parsed
✅ - modify req.body = parsedData to be able to access in another route handlers.

# note: the object 'req' and 'res' is the same that will be used in the next request handlers

✅ - After the middleware that parse the body use the body in another POST endpoint (used in /pokemon/save)

✅ - Use the express middleware express.json() (do the same that the request of before was doing)