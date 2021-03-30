<<<<<<< HEAD
# node-mysql-api

---
Simple nodejs API with Express, MySQL, JWS, Joi, bcrypt
=======
# node-mysql-api example
>>>>>>> 7640b7bb0cbcb8e204dc5a32b3e413153fd7db5a

## Project setup

- Install dependencies  
Type on console: 

```
npm install
```

- Add database credential  
  Edit example.env and rename it to .env

## Run project on local

```
npm start
```
<<<<<<< HEAD

## User Endpoints

### POST : /users/login

```json
{
  "endpoint": "/users/login",
  "method": "POST",
  "request_body": {
    "email": "example@example.com",
    "password": "examplePassword"
  },
  "response": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTcwODgzNzl9.3tKwr4iszoCO0Q4V-T0eN09BUd-MM9WUz_ZaUUxt2nA"
  }
}
```

### POST : /users/register

```json
{
  "endpoint": "/users/register",
  "method": "POST",
  "request_body": {
    "username": "exampleUsername",
    "full_name": "exampleName",
    "email": "example@example.com",
    "password": "some-random-password"
  },
  "response": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTcwODgzNzl9.3tKwr4iszoCO0Q4V-T0eN09BUd-MM9WUz_ZaUUxt2nA"
  }
}
```

### GET : /users

```json
{
  "endpoint": "/users",
  "method": "GET",
  "request_header": {
    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTcwODgzNzl9.3tKwr4iszoCO0Q4V-T0eN09BUd-MM9WUz_ZaUUxt2nA"
  },
  "response": [
    {
      "id": 1,
      "username": "exampleUsername",
      "full_name": "exampleName",
      "email": "example@example.com",
      "password": "$2a$10$WPU9DxVAU2faFayan6kCGuDkGCS7U288erMhCjGAHUAwMX8UAFH9G",
      "create_date": "2021-03-30T06:25:24.000Z"
    }
  ]
}
```

### GET : /users/:username

```json
{
  "endpoint": "/users/exampleUsername",
  "method": "GET",
  "request_header": {
    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTcwODgzNzl9.3tKwr4iszoCO0Q4V-T0eN09BUd-MM9WUz_ZaUUxt2nA"
  },
  "response": {
    "id": 1,
    "username": "exampleUsername",
    "full_name": "exampleName",
    "email": "example@example.com",
    "password": "$2a$10$WPU9DxVAU2faFayan6kCGuDkGCS7U288erMhCjGAHUAwMX8UAFH9G",
    "create_date": "2021-03-30T06:25:24.000Z"
  }
}
```

### PUT : /users/:username

```json
{
  "endpoint": "/users/exampleUsername",
  "method": "PUT",
  "request_header": {
    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTcwODgzNzl9.3tKwr4iszoCO0Q4V-T0eN09BUd-MM9WUz_ZaUUxt2nA"
  },
  "request_body": {
    "email": "example2@example.com",
    "full_name": "example 2 2 2"
  },
  "response": {
    "message": "User successfully updated"
  }
}
```

### DELETE : /users/:username

```json
{
  "endpoint": "/users/exampleUsername",
  "method": "PUT",
  "request_header": {
    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTcwODgzNzl9.3tKwr4iszoCO0Q4V-T0eN09BUd-MM9WUz_ZaUUxt2nA"
  },
  "response": {
    "message": "User successfully deleted"
  }
}
```
=======
>>>>>>> 7640b7bb0cbcb8e204dc5a32b3e413153fd7db5a
