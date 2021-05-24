require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const db = require('../db');
const toUnnamed = require('named-placeholders')();

const tableName = 'users';

const User = function (input) {
    this.username = input.username;
    this.full_name = input.full_name;
    this.email = input.email;
    this.password = input.password;
}

User.validate = (user) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(6).required(),
        full_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(user);
}

User.validateLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(user);
}

User.validateProfileUpdate = (user) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        full_name: Joi.string().required(),
        email: Joi.string().email().required(),
        username: Joi.string().alphanum().min(6).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(user);
}

User.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

User.validatePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

User.generateToken = (uid) => {
    return jwt.sign({uid: uid}, process.env.SECRET_TOKEN);
}

User.findAll = async (page = 0) => {
    const query = toUnnamed(`SELECT * FROM ${tableName} 
    LIMIT :page, :itemsPerPage`, {page, itemsPerPage: '10'});

    return await db.exec(query[0], query[1]);
}

User.findById = async (id = '') => {
    const query = toUnnamed(`SELECT * FROM ${tableName} 
    WHERE id = :id`, {id});

    return await db.exec(query[0], query[1]);
}

User.findByUsernameOrEmail = async (usernameOrEmail = '') => {
    const query = toUnnamed(`SELECT * FROM ${tableName} 
    WHERE username = :usernameOrEmail OR email = :usernameOrEmail`, {usernameOrEmail});

    return await db.exec(query[0], query[1]);
}

User.create = async (user) => {
    const query = toUnnamed(`INSERT INTO ${tableName} (username, email, full_name, password) 
    VALUES (:username, :email, :full_name, :password)`, user);

    return await db.exec(query[0], query[1]);
}

User.edit = async (user) => {
    const query = toUnnamed(`UPDATE ${tableName}
    SET username    = :username,
        email       = :email, 
        full_name   = :full_name,
        password    = :password
    WHERE id        = :id`, user);

    return await db.exec(query[0], query[1]);
}

User.delete = async (usernameOrEmail = '') => {
    const query = toUnnamed(`DELETE FROM ${tableName} 
    WHERE username = :usernameOrEmail OR email = :usernameOrEmail`, {usernameOrEmail});

    return await db.exec(query[0], query[1]);
}

module.exports = User;