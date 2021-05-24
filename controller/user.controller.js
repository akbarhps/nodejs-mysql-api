const helper = require('../utils/helper');
const User = require('../data/models/user.model');

exports.register = async (req, res, next) => {
    const user = new User(req.body);
    const {value, error} = User.validate(user);
    if (error) {
        return next({statusCode: 400, message: error.details[0].message});
    }

    try {
        value.password = await User.hashPassword(value.password);
        const result = await User.create(value);
        const token = User.generateToken(result[0].insertId);
        res.status(201).json({token});
    } catch (e) {
        next({statusCode: 400, message: "Username or email already taken!"})
    }
}

exports.login = async (req, res, next) => {
    const {value, error} = User.validateLogin(req.body);
    if (error) {
        return next({statusCode: 400, message: error.details[0].message});
    }

    try {
        const result = await User.findByUsernameOrEmail(value.email);
        const user = result[0][0];
        if (!user) {
            return next({statusCode: 404, message: "The email you entered did not match our records."});
        }

        const isValid = await User.validatePassword(value.password, user.password);
        if (!isValid) {
            return next({statusCode: 401, message: "The password you entered did not match our records."});
        }

        const token = User.generateToken(user.id);
        res.status(200).json({token});
    } catch (e) {
        next(e);
    }
}

exports.findAll = async (req, res, next) => {
    const offset = helper.getOffset(req.query['page']);
    try {
        const result = await User.findAll(offset);
        res.send(result[0]);
    } catch (e) {
        next(e);
    }
}

exports.findOne = async (req, res, next) => {
    const username = req.params['username'];
    if (!username) {
        return next({statusCode: 400, message: "No Username or Email Given"});
    }

    try {
        const result = await User.findByUsernameOrEmail(username);
        const user = result[0][0];
        if (!user) {
            return next({statusCode: 404, message: "User not found"});
        }

        res.send(user);
    } catch (e) {
        next(e);
    }
}

exports.update = async (req, res, next) => {
    const {value, error} = User.validateProfileUpdate(req.body);
    if (error) {
        return next({statusCode: 400, message: error.details[0].message});
    }

    try {
        value.password = await User.hashPassword(value.password);
        const result = await User.edit(value);
        if (result[0].affectedRows === 0) {
            return next({statusCode: 404, message: "User not found"});
        }

        res.json({message: "User successfully updated"});
    } catch (e) {
        next({statusCode: 400, message: e.message});
    }
}

exports.delete = async (req, res, next) => {
    const username = req.params['username']
    if (!username) {
        return next({statusCode: 400, message: "No Username or Email Given"});
    }

    try {
        const result = await User.delete(username);
        if (result[0].affectedRows === 0) {
            return next({statusCode: 404, message: "User not found"});
        }

        res.json({message: "User successfully deleted"});
    } catch (e) {
        next(e);
    }
}

function buildUpdateParams(u) {
    return [u.full_name, u.email, u.username];
}
