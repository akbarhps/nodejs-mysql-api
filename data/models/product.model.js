const db = require('../db');

const tableName = 'products';

const Product = function (product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.quantity = product.quantity;
    this.id_category = product.id_category;
}

Product.findAll = async (page = 0) => {
    return await db.exec(`SELECT * FROM ${tableName} LIMIT ?, ?`, [page, '10']);
}

Product.findById = async (id) => {
    return await db.exec(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
}

Product.create = async (params) => {
    return await db.exec(`INSERT INTO ${tableName}(id, name, description, price, quantity, id_category)
        VALUES (?, ?, ?, ?, ?, ?)`, params);
}

Product.update = async (params) => {
    return await db.exec(`UPDATE products
     SET name = ?,
         description = ?,
         price = ?,
         quantity = ?,
         id_category = ?
     WHERE id = ?`, params);
}

Product.delete = async (id) => {
    const queries = [
        `DELETE FROM products WHERE id = ?`,
        `DELETE FROM products WHEREs id = ?`
    ]
    return await db.transaction(queries, [['axasd'], [id]])
}

module.exports = Product;