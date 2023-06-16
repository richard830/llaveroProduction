const db = require('../config/config');

const Comentario = {};



// Comentario.verCorazonComentario = async(id_usuario, id_comentario) => {
//     const sql = `
//     SELECT COALESCE(
//         (
//             SELECT '1'
//             FROM comentario_megusta
//             WHERE id_usuario = $1 AND id_comentario = $2

//         ),
//         '0'
//     ) AS likecorazon;`;

//     return db.manyOrNone(sql, [id_usuario, id_comentario]);

// };


// Comentario.listarComentario = (id_userfoto, id_usuario) => {
//         const sql = `SELECT c.*, u.*, COALESCE(cm.likecorazon, 0) AS tiene_megusta
//     FROM tcomentario c
//     LEFT JOIN (
//         SELECT id_comentario, 1 AS likecorazon
//         FROM comentario_megusta
//     ) cm ON c.id_comentario = cm.id_comentario
//     JOIN users u ON c.id_usuario = u.id
//     LEFT JOIN (
//         SELECT id_comentario, 1 AS tiene_megusta
//         FROM comentario_megusta
//         WHERE id_usuario = $2
//     ) cm2 ON c.id_comentario = cm2.id_comentario
//     WHERE c.id_userfoto = $1
//     ORDER BY c.fecha DESC;`;
//         return db.manyOrNone(sql, [id_userfoto, id_usuario]);
//     }
Comentario.listarComentario = (id_userfoto) => {
    const sql = `SELECT *
    FROM tcomentario c
    inner join users u on u.id = c.id_usuario
      where c.id_userfoto  = $1 ORDER BY c.fecha DESC`;
    return db.manyOrNone(sql, id_userfoto);
}




Comentario.registrarComentario = (comentario) => {
    const sql = `
    INSERT INTO tcomentario (id_usuario, id_userfoto, comentario, fecha)
    VALUES ($1, $2,$3,$4)
    RETURNING id_comentario`;
    return db.oneOrNone(sql, [
        comentario.id_usuario,
        comentario.id_userfoto,
        comentario.comentario,
        new Date(),
    ]);
}


Comentario.agregarCorazonComentario = async(comentario) => {
    const sql = await db.oneOrNone(
        'SELECT id_coment_megusta FROM comentario_megusta WHERE id_usuario = $1 AND id_comentario = $2', [comentario.id_usuario, comentario.id_comentario]
    );

    if (sql) {
        // Ya existe un registro con el mismo id_usuario e id_userfoto, eliminamos el registro existente
        await db.none(
            'DELETE FROM comentario_megusta WHERE id_coment_megusta = $1',
            sql.id_coment_megusta
        );
        console.log('Registro existente eliminado');
        return null; // Opcional: Puedes retornar un valor específico para indicar que se eliminó el registro existente
    } else {
        // No existe un registro con el mismo id_usuario e id_userfoto, realizamos la inserción
        const newRecord = await db.one(
            'INSERT INTO comentario_megusta (id_usuario, id_comentario) VALUES ($1, $2) RETURNING id_coment_megusta', [comentario.id_usuario, comentario.id_comentario]
        );
        console.log('Nuevo registro insertado');
        return newRecord.id_coment_megusta;
    }
};



module.exports = Comentario;