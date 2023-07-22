const db = require("../config/config");

const Category = {};

Category.listariIdCategoria = (id_categoria) => {
    const sql = `SELECT * from password p
    inner join categoria c on p.id_categoria= c.id_categoria where p.id_categoria = $1`;
    return db.manyOrNone(sql, id_categoria);
};

Category.Eliminar = (id) => {
    const sql = "delete from categoria where id_categoria = $1";
    return db.manyOrNone(sql, id);
};

Category.actualizar = (categoria) => {
    const sql = `UPDATE categoria SET nombre_categoria = $2 WHERE id_categoria = $1`;
    return db.manyOrNone(sql, [
        categoria.id_categoria,
        categoria.nombre_categoria,
    ]);
};

Category.create = (category) => {
    const sql = `INSERT INTO categoria(
        nombre_categoria, 
        icon,
        created_at
        ) VALUES 
        ( $1, $2, $3) RETURNING id_categoria`;
    return db.oneOrNone(sql, [
        category.nombre_categoria,
        category.icon,
        new Date(),
    ]);
};

Category.listarCategoria = () => {
    const sql = `
    SELECT * from categoria
    `;
    return db.manyOrNone(sql);
};

module.exports = Category;