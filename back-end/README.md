# HOT TAKES #

## Description ##

This is the back end server made for the website Hot Takes, a review website for hot sauces.

## Installation ##

Here are the dependancies you need to install:

- NodeJS 12.14 or 14.0

On Windows, these installations require to use PowerShell in administrator mode.

run `npm install` when it's done.


## Usage ##

Run `node server`. This should run the local server.

The server should run on `localhost` with default port `3000`. 

If the server runs on another port for any reason, this is printed to the console when the server starts, e.g. `Listening on port 3001`.

## Tests ##

To test the differents routes use the software Postman with the differents verbs and with the right URL, e.g. 
- GET http://localhost:3000/api/sauces (display all the sauces)
- GET http://localhost:3000/api/sauces/:id (display one sauce)
- POST http://localhost:3000/api/sauces/:id (create a sauce)
- POST http://localhost:3000/api/sauces/:id/like (to like a sauce)
- PUT http://localhost:3000/api/sauces/:id (modify a sauce)
- DELETE http://localhost:3000/api/sauces/:id (delate a sauce)

Before testing the different routes make sure you've created a user account:
- POST http://localhost:3000/api/users/signup (create an account) a token will be asked in the authorization section
- POST http://localhost:3000/api/users/login (login in to the website)
