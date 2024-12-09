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

# MVC arquitecture pattern

[x]- explain what is MVC, and why is MVC used, mark some important points of using it

  - MVC is an arquitecture pattern that allows you to estructure your code in three big parts of a software application, those parts are MODEL, VIEW AND CONTROLLER. It can be said that:
    
    => **MODEL**: Is the part that will manage all the data logic of the application, how it is stored if is needed and how is basically managed
    
    => **CONTROLLER:** The controller will look for manage how is the user request information used, it can be seen like an orchestrator, and if you will use a model o multiples models this part will call them with the user request data 

    => **VIEW**: The view is basically everything that can be use to show the proccesed info to the user, not neccesarally have to be a front-end like made with react or vue, but a JSON can be enough to show the information to the user after the controller made all the orchetrations and returned the necesary information.

      step A => VIEW (1. Request something) -> CONTROLLER (2. Search in the model using the request info) -> MODEL (3. Look in the data for the controller requested information )
      step B => VIEW < 💀💀⚡⚡⚡- CONTROLLER (5. Take the data from the model) <- MODEL (4. model send back the requeste data to the controller)

[x]- create a folder named routes and make a router for the movies

<!-- express.Router documentation: https://expressjs.com/es/4x/api.html#router -->
<!-- express.Router documentation: https://expressjs.com/en/guide/routing.html#:~:text=express.Router&text=A%20Router%20instance%20is%20a,path%20in%20the%20main%20app. -->


[x]- create a folder for middlewares and add CORS middleware inside
[x]- create folder for controllers
[x]- create folder for models
[x]- create a class that holds the models with static methods and make it async, and explain why make it async is a good practice
  => If you make the Models asyncronous, you don't have to adapt it in the future if the a next implementation needs to be asyncronous,
    like a DB implementation if previously you had a local way to handle the data of the model.
[x]- make every model for all endpoints
[x]- Make evert controller for all endpoints
[x]- talk about what type of error manage each layer (What type of erorr manage the model, the controller and the view)

  => In the layer of **view** is more aligned to the UX, here the the user can see the errors in the visual part of the application, you can have warnings too, with the purpose to warn the user that the request they will try to do using that info will have errors

  => In the layer of the **controller** you will have validations for a request is sended to it, review the data sended by the user and confirm that data is correct and complete

  => In the **model** layer, validation typically focuses on ensuring that the data is consistent with the database schema and the integrity constraints of the application.

# note: all validations can be made in every layer of the MVC

what an arquitecture is: https://chatgpt.com/share/6724495a-9eec-8003-a98b-22bb6567044a

https://www.geeksforgeeks.org/uuid-function-in-mysql/

- Using MDL in mySQL, do:
  [x] - Create a database named moviesDB
  [x] - use the database
  [x] - create the table movies
      [x]- id(uuid by default) - BINARY(16)
      [x] - title varchar, not null
      [x] - year int, not null
      [x] - director varchar, not null
      [x] - duration, int, not null
      [x] - poster TEXT,
      [x] - rate DECIMAL(2, 1), not null
  
  [x] - create table for genre
      [x] - id int auto increment primary key
      [x] - name varchar 255, not null unique
  
  [x] - create relations for movies_genre
      [x] - movie_id BINARY(16) references to movie id
      [x] - genre_id int references to genre id
      [x] - primary key (movie_id, genre_id)

  [x] - insert genres
  [x] - insert some movies

[x] - install mysql2 to use the sql data base in nodejs
[x] - create a conection with mysql2

# Note: use the mysql2/promise library

[] - add a new Movie Model of sql so it returns the movies
[] - Make the requests in a way the user **CAN NOT** inject sql with the mysql2 library
[] - when inserting a new movie use a new UUID created by sql and use it to insert a new movie

[] WHAT YOU MEAN WHEN YOU SAY INYECTION

<!-- REFACTORING -->

[] - Convert the static methods into non static methods in the movieController class. and explain why
[] - Make a constructor in the movieController class soy you can set the property movieModel and make the class take the movieModel property of the instance. And explain why
[] - Make the code of app.mjs a function (createApp({ movieModel })) that receives the model you want to use and export that function. and explain why
[] - create multiples "execution environments" creating two files one named "server-with-local" and "server-with-mysql" and be able to use them with node scripts. e.g. 'npm run start:local'
[] - study dotenv library
[] - deploy your database on planetscale.com or another database host service

# NOTE: using autoincrement as an ID make it predecible, so if the id is not important you can use the increment one, because it does not matter if the user know the next id, but if the id neccesarally need to be secret use another way to create IDs
# NOTE: Dont send the backend errors to the user, e.g. After an error in the database avoid sending the exact error of the database to the user.
