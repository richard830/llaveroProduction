const db = require('../config/config');

const Category = {};

Category.Eliminar = (id) => {
    const sql = 'delete from categoria where id = $1';
    return db.manyOrNone(sql, id)
}


Category.listarComboBox = (id_user) => {
    const sql = `SELECT id, name,id_user FROM categoria where id_user =$1`;
    return db.manyOrNone(sql, id_user);
}


Category.listarDATOS = (id) => {
    const sql = `
    SELECT
P.id,
P.name,

 JSON_BUILD_OBJECT(
        'id', U.id,
        'name', U.name,
        'lastname', U.lastname,
        'image', U.image,
        'password', U.password
    )AS usuario,
	
 JSON_BUILD_OBJECT(
      	'id',	L.id,
		'titulo',L.titulo,
	 	'description',L.description,
	 	'id_category',L.id_category,
	 	'id_user',L.id_user,
        'fechacreated', L.fechacreated
	 
    )AS productos
	
FROM 
categoria AS P

LEFT JOIN
	 users AS U
ON
	P.id = U.id
	
LEFT JOIN
    productos AS L
    ON
    p.id = L.id_category


WHERE 
P.id = $1 
	
 GROUP BY 
 P.id, U.id, L.id
    `;
    return db.manyOrNone(sql, id);
}


Category.findByCategorytUser = (id_user) => {
    const sql = `
    SELECT
    P.id,
    P.name,
    P.id_producto,
    P.id_user,
     JSON_BUILD_OBJECT(
            'id', U.id,
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image
        )AS usuario,
        
     JSON_BUILD_OBJECT(
              'id',	L.id,
            'titulo',L.titulo,
             'description', L.description
            
            
        )AS productos
        
    FROM 
    categoria AS P
    
    LEFT JOIN
         users AS U
    ON
        P.id_user = U.id
        
    LEFT JOIN
        productos AS L
        ON
        p.id_producto = L.id
    
    
    
        
    WHERE 
    P.id_user = $1 
        
     GROUP BY 
     P.id, U.id, L.id`;

    return db.manyOrNone(sql, id_user);
}

Category.listarNombr = (id_user) => {
    const sql = `
    SELECT
C.id,
C.name,
C.id_user,
 JSON_BUILD_OBJECT(
        'id', U.id,
        'name', U.name,
        'lastname', U.lastname
       
    )AS usuario
	
 
	
FROM 
categoria AS C

LEFT JOIN
	 users AS U
ON
	C.id_user = U.id
	

WHERE 
C.id_user = $1
	
 GROUP BY 
 C.id, U.id
    `;
    return db.manyOrNone(sql, id_user);
}



Category.create = (category) => {
    const sql = `INSERT INTO categoria(
        name, 
        id_user,
        created_at,
        updated_at 
        ) VALUES 
        ( $1, $2, $3,$4) RETURNING id`;
    return db.oneOrNone(sql, [
        category.name,
        category.id_user,
        new Date(),
        new Date()
    ])
}

Category.updateidProduct = (categoria) => {
    const sql = `UPDATE categoria SET
       
        id_producto = $2,
        
        updated_at = $3
        WHERE
         id = $1
    `;

    return db.none(sql, [
        categoria.id,

        categoria.id_producto,
        new Date()

    ])
}

module.exports = Category;