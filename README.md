# node-mysql-api

---
Simple Nodejs API with Express, MySQL, JWS, Joi, bcrypt

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

# API Spec

## Register User

Request :

- Method : POST
- Endpoint : `/users`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
  "username": string,
  "email": string,
  "full_name": string,
  "password": string
}
```

Response :

```json 
{
    "token": string
}
```

## Login User

Request :

- Method : POST
- Endpoint : `/users/login`
- Header :
    - Content-Type: application/json
    - Accept: application/json
  
- Body :

```json 
{
  "email": string,
  "password": string
}
```

Response :

```json 
{
  "token": string
}
```

## Get All Users

Request :

- Method : GET
- Endpoint : `/users`
- Header :
    - X-Auth-Token : "your secret token"
    - Accept: application/json
- Query Param :
    - page : number

Response :

```json 
[
  {
    "id": number,
    "username": string,
    "email": string,
    "full_name": string,
    "password": string
  },
  {
    "id": number,
    "username": string,
    "email": string,
    "full_name": string,
    "password": string
  }
]
```

## Get User by username or email

Request :

- Method : GET
- Endpoint : `/users/{username/email}`
- Header :
    - X-Auth-Token : "your secret token"
    - Accept: application/json

Response :

```json 
{
  "id": number,
  "username": string,
  "email": string,
  "full_name": string,
  "password": string
}
```

## Update User

Request :

- Method : PUT
- Endpoint : `/users`
- Header :
    - X-Auth-Token : "your secret token"
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
  "username": string,
  "email": string,
  "full_name": string,
  "password": string
}
```

Response :

```json 
{
    "mesasage" : string
}
```

## Delete User

Request :

- Method : DELETE
- Endpoint : `/users/{username/email}`
- Header :
    - X-Auth-Token : "your secret token"
    - Accept: application/json

Response :

```json 
{
    "mesasage" : string
}
```