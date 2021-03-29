const helper = require('../utils/helper');
const Product = require('../data/models/product.model');

exports.findAll = async (req, res, next) => {
    const offset = helper.getOffset(req.query['page']);
    try {
        const result = await Product.findAll(offset);
        res.send(result[0]);
    } catch (e) {
        next(e);
    }
}

exports.findById = async (req, res, next) => {
    const id = req.params['id'];
    if (!id) {
        return next({statusCode: 400, message: "No id given"});
    }

    try {
        const result = await Product.findById(id);
        const product = result[0][0];
        if (!product) {
            return next({statusCode: 404, message: "Product not found"});
        }
        res.send(product);
    } catch (e) {
        next(e);
    }
}

exports.create = async (req, res, next) => {
    const body = req.body;
    if (!isValidRequest(body)) {
        return next({statusCode: 400, message: "Bad Request"});
    }

    const productParams = buildCreateParams(body);
    try {
        await Product.create(productParams);
        res.status(201).json(body);
    } catch (e) {
        next({statusCode: 400, message: e.message})
    }
}

exports.update = async (req, res, next) => {
    const body = req.body;
    body.id = req.params['id'];
    if (!isValidRequest(body)) {
        return next({statusCode: 400, message: "Bad Request"});
    }

    const productParams = buildUpdateParams(body);
    try {
        const result = await Product.update(productParams);
        if (result[0].affectedRows === 0) {
            return next({statusCode: 404, message: "Product not found"});
        }
        res.json({message: "Product successfully updated"});
    } catch (e) {
        next(e)
    }
}

exports.delete = async (req, res, next) => {
    const id = req.params['id'];
    if (!id) {
        return next({statusCode: 400, message: "No id given"});
    }

    try {
        const result = await Product.delete(id);
        if (result[0].affectedRows === 0) {
            return next({statusCode: 404, message: "Product not found"});
        }
        res.json({message: "Product successfully deleted"});
    } catch (e) {
        next(e);
    }
}

function isValidRequest(body) {
    const {id, name, description, price, quantity, id_category} = body;
    return id && name && description && price && quantity && id_category;
}

function buildCreateParams(p) {
    return [p.id, p.name, p.description, p.price, p.quantity, p.id_category];
}

function buildUpdateParams(p) {
    return [p.name, p.description, p.price, p.quantity, p.id_category, p.id];
}
