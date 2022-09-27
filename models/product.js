const db = require('../config/config');

const Product = {};

Product.findByProductUser = (id_user, id_category) => {
    const sql = `
SELECT
P.id,
P.titulo,
P.description,
P.id_category,
P.id_user,
JSON_BUILD_OBJECT(
        'id', U.id,
        'name', U.name,
        'lastname', U.lastname,
        'image', U.image
)AS usuario,
	

JSON_BUILD_OBJECT(
      	'id',	L.id,
		'name',L.name
    )AS categoria
	
FROM 
productos AS P

LEFT JOIN
	 users AS U
ON
	P.id_user = U.id
	
LEFT JOIN
    categoria AS L
    ON
    p.id_category = L.id


WHERE 
P.id_user =$1 AND P.id_category = $2
	
 GROUP BY 
 P.id, U.id, L.id`;

    return db.manyOrNone(sql, [id_user, id_category]);
}


Product.listarProductos = () => {
    const sql = `SELECT id, id_category FROM productos ORDER BY id_category`;
    return db.manyOrNone(sql);
}


Product.TotalProductos = (id_user) => {
    const sql = `SELECT COUNT(*) AS "total" FROM "productos" where id_user = $1`;
    return db.manyOrNone(sql, id_user);
}


Product.ContarProductosCategori = (id_user) => {
    const sql = `SELECT COUNT(*) AS "total" FROM "productos" where id_category = $1`;
    return db.manyOrNone(sql, id_user);
}


Product.Eliminar = (id) => {
    const sql = 'delete from productos where id = $1';
    return db.manyOrNone(sql, id)
}

Product.listarExel = (id) => {
    const sql = `
    SELECT
P.id,
P.titulo,
P.description,
P.id_category,
P.id_user,
P.fechacreated,

 JSON_BUILD_OBJECT(
        'id', C.id,
        'name', C.name,
        'id_user', C.id_user
        
    )AS categoria,
	
	
	JSON_BUILD_OBJECT(
        'id', U.id,
        'name', U.name,
        'lastname', U.lastname,
        'image', U.image,
        'password', U.password
    )AS usuario
	

	
FROM 
productos AS P

	
LEFT JOIN
    categoria AS C
    ON
    P.id_user = C.id_user

LEFT JOIN
    users AS U
    ON
    P.id_user = U.id

WHERE 
P.id_user = $1
	
 GROUP BY 
 P.id, C.id, U.id
    `;
    return db.manyOrNone(sql, id);
}


Product.updateProducto = (producto) => {
    const sql = `UPDATE productos SET
        titulo = $2,
        description = $3,
        id_category = $4,
        id_user = $5,
        fechacreated = $6,
        updated_at = $7
        WHERE
         id = $1
    `;

    return db.none(sql, [
        producto.id,
        producto.titulo,
        producto.description,
        producto.id_category,
        producto.id_user,
        //producto.fechacreated,
        Date.now(),
        // new Date(),
        new Date()

    ])
}










Product.create = (product) => {
    const sql = `INSERT INTO productos(
        titulo,
        description,
        id_category,
        id_user,
        fechacreated,
        created_at,
        updated_at
    )
    VALUES($1,$2,$3,$4,$5,$6,$7)RETURNING id
    `;
    return db.oneOrNone(sql, [
        product.titulo,
        product.description,
        product.id_category,
        product.id_user,
        Date.now(),
        new Date(),
        new Date()

    ])

}

module.exports = Product;