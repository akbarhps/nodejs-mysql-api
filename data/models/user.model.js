require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const db = require('../db');

const tableName = 'users';

const User = function () {
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
        full_name: Joi.string().required(),
        email: Joi.string().email().required(),
        username: Joi.string().alphanum().min(6).required()
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
    return jwt.sign({uid}, process.env.SECRET_TOKEN);
}

User.findAll = async (page = 0) => {
    return await db.exec(`SELECT * FROM ${tableName} 
    LIMIT ?, ?`, [page, '10']);
}

User.findById = async (id = '') => {
    return await db.exec(`SELECT * FROM ${tableName} 
    WHERE id = ?`, [id]);
}

User.findByUsernameOrEmail = async (usernameOrEmail = '') => {
    return await db.exec(`SELECT * FROM ${tableName} 
    WHERE username = ? OR email = ?`, [usernameOrEmail, usernameOrEmail]);
}

User.create = async (user) => {
    return await db.exec(`INSERT INTO ${tableName}(username, email, full_name, password) 
    VALUES (?, ?, ?, ?)`, user);
}

User.updateProfile = async (user) => {
    return await db.exec(`UPDATE ${tableName}
    SET full_name   = ?,
        email       = ?
    WHERE username  = ?`, user);
}

User.delete = async (usernameOrEmail = '') => {
    return await db.exec(`DELETE FROM ${tableName} 
    WHERE username = ? OR email = ?`, [usernameOrEmail, usernameOrEmail]);
}

module.exports = User;