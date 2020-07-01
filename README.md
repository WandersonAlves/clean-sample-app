# clean-sample-app

A API created with DDD.

Uses Typescript, expressjs as server and postgres as database

Has a `docker-compose` file to start the server

`Webpack` is used to build a minimal file to be used in a `Docker` container

## Domain

REST API that allows a user to review, create and list places

### Use cases

- User can create a account
- User can login with a existing account
- Authenticated User can create a new place
- Authenticated User can view places created by him and other users
  - Authenticated User can view places in `list` or `map` modes (`list`: alphabetically ordered; `map`: geographically ordered)
- Authenticated User can review a place with comment and rating
- Authenticated User can view comments and ratings for a expecific place
- Authenticated User can view their profile, change email and change password
- Authenticated User can logout from the system (not implemented, should use redis)
