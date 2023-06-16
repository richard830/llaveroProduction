const db = require('../config/config');

const Persona = {};



Persona.EliminarFoto = (id, iduser) => {
    const sql = 'delete from userfoto where id = $1 and iduser= $2';
    return db.manyOrNone(sql, [id, iduser])
}




Persona.TotalMegusta = (user_id) => {
    const sql = `SELECT SUM(favorito) AS total
    FROM seguidor where user_id = $1;`;
    return db.manyOrNone(sql, user_id);
}

Persona.TotalFotos = (iduser) => {
    const sql = `SELECT COUNT(*) AS "total" FROM "userfoto" where iduser = $1`;
    return db.manyOrNone(sql, iduser);
}



Persona.ExisteLink = (user_id, userfoto_id) => {
    const sql = `SELECT favorito
    FROM seguidor
    WHERE user_id = $1 AND userfoto_id = $2
    LIMIT 1`;
    return db.manyOrNone(sql, [
        user_id,
        userfoto_id
    ]);
}




Persona.Crearlikefoto = async(foto) => {
    const selectSql = `
    SELECT id, favorito
    FROM seguidor
    WHERE user_id = $1 AND userfoto_id = $2
    LIMIT 1
`;
    const selectResult = await db.oneOrNone(selectSql, [foto.user_id, foto.userfoto_id]);

    if (selectResult) {
        // La foto ya ha sido marcada como favorita por este usuario
        if (selectResult.favorito === 0) {
            // Si el valor "favorito" es 0, lo actualizamos a 1
            const updateSql = `
            UPDATE seguidor
            SET favorito = 1
            WHERE id = $1
            RETURNING id
        `;
            await db.manyOrNone(updateSql, [selectResult.id]);
        } else {
            console.log('La foto ya ha sido marcada como favorita por este usuario');
        }
    } else {
        // La foto no ha sido marcada como favorita por este usuario, por lo que podemos insertarla con "favorito" establecido como 1
        const insertSql = `
        INSERT INTO seguidor (user_id, userfoto_id, favorito, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING id
    `;
        await db.manyOrNone(insertSql, [foto.user_id, foto.userfoto_id, 1]);
    }



    //     const selectSql = `
    //     SELECT id
    //     FROM seguidor
    //     WHERE user_id = $1 AND userfoto_id = $2 AND favorito = 1
    //     LIMIT 1
    // `;
    //     const selectResult = await db.oneOrNone(selectSql, [foto.user_id, foto.userfoto_id]);

    //     if (selectResult) {
    //         // La foto ya ha sido marcada como favorita por este usuario
    //         console.log('La foto ya ha sido marcada como favorita por este usuario');
    //     } else {
    //         // La foto no ha sido marcada como favorita por este usuario, por lo que podemos continuar con la inserción
    //         const insertSql = `
    //         INSERT INTO seguidor (user_id, userfoto_id, favorito, created_at)
    //         VALUES ($1, $2, $3, NOW())
    //         RETURNING id
    //     `;
    //         await db.manyOrNone(insertSql, [foto.user_id, foto.userfoto_id, foto.favorito]);
    //     }

}



Persona.Crearlikefotoo = async(foto) => {

    try {


        // Realiza una consulta SELECT para verificar si ya existe un registro para esta foto y usuario
        const selectSql = `SELECT id, favorito FROM seguidor WHERE user_id = $1 AND userfoto_id = $2`;
        const result = await db.oneOrNone(selectSql, [foto.user_id, foto.userfoto_id]);


        if (result !== null) {
            console.log('ya hay uno valor');

            // Si existe un registro, actualiza el campo "favorito" del registro
            const updateSql = `UPDATE seguidor SET favorito = $1 WHERE id = $2`;
            await db.manyOrNone(updateSql, [foto.favorito, result.id]);
        } else {
            console.log('aun np ya hay nada');
            // Si no existe un registro, inserta uno nuevo
            const insertSql = `
                 INSERT INTO seguidor (user_id, userfoto_id, favorito, created_at)
                 VALUES ($1, $2, $3, NOW())
                 RETURNING id`;
            await db.manyOrNone(insertSql, [foto.user_id, foto.userfoto_id, foto.favorito]);
        }



        return true;
    } catch (error) {

        console.error('Error al crear o actualizar like:', error);
        throw error;
    } finally {
        // Libera la conexión de la base de datos
        //db.release();
    }
}



// Persona.Crearlikefoto = (foto) => {
//     const sql = `
//     INSERT INTO seguidor (user_id, userfoto_id, favorito, created_at)
//     VALUES ($1, $2, $3, NOW())
//     ON CONFLICT (user_id, userfoto_id)
//     DO UPDATE SET favorito = EXCLUDED.favorito, created_at = NOW()
//     RETURNING id`;
//     return db.oneOrNone(sql, [foto.user_id, foto.userfoto_id, foto.favorito, new Date()]);
// }








// Persona.Crearlikefoto = (foto) => {
//     const sql = `INSERT INTO likes(
//         user_id,
//         userfoto_id,
//         likes,
//         created_at
//     )
//     VALUES($1,$2,$3,$4)RETURNING id
//     `;
//     return db.oneOrNone(sql, [
//         foto.user_id,
//         foto.userfoto_id,
//         foto.likes,
//         new Date()

//     ])

// }



Persona.SubirUsuarioo = async(usuario) => {
    try {
        // Primero, inserta el usuario en la tabla userfoto
        const sqlUserfoto = `INSERT INTO userfoto(
            imageu,
            iduser,
            created_at,
            updated_at
        )
        VALUES($1,$2,$3,$4)
        RETURNING id`;
        const userfoto = await db.one(sqlUserfoto, [
            usuario.imageu,
            usuario.iduser,
            new Date(),
            new Date()
        ]);

        // Luego, inserta un registro en la tabla seguidor
        const sqlSeguidor = `INSERT INTO seguidor(
            user_id,
            userfoto_id,
            favorito,
            created_at
        )
        VALUES($1,$2,$3,$4)`;
        await db.none(sqlSeguidor, [
            usuario.iduser,
            userfoto.id,
            0, // valor del atributo "favorito"
            new Date()
        ]);

        // Retorna el ID del usuario insertado en la tabla userfoto
        return userfoto.id;
    } catch (error) {
        console.error('Error al subir usuario:', error);
        throw error;
    }
}




Persona.SubirUsuario = (usuario) => {
    const sql = `INSERT INTO userfoto(
        imageu,
        iduser,
        created_at,
        updated_at
    )
    VALUES($1,$2,$3,$4)RETURNING id
    `;
    return db.oneOrNone(sql, [
        usuario.imageu,
        usuario.iduser,
        new Date(),
        new Date()

    ])

}



Persona.CrearPersona = (persona) => {
    const sql = `INSERT INTO persona(
        nombre,
        edad,
        image,
        id_user,
        created_at,
        updated_at
    )
    VALUES($1,$2,$3,$4,$5,$6)RETURNING id
    `;
    return db.oneOrNone(sql, [
        persona.nombre,
        persona.edad,
        persona.image,
        persona.id_user,
        new Date(),
        new Date()

    ])

}

Persona.listarPersonas = (sexo) => {


    const sql =
        `select * from users u inner join userfoto p 
    on 
    u.id= p.iduser  where sexo =$1 order by p.created_at desc`;

    // `select * from users u 
    // inner join userfoto p 
    // on 
    // u.id= p.iduser inner join seguidor s on p.id = s.userfoto_id where sexo =$1 order by p.created_at desc`;


    // const sql = `select * from users u inner join userfoto p on u.id= p.iduser where sexo =$1 order by p.created_at desc`;
    return db.manyOrNone(sql, sexo);
    // return db.manyOrNone(sql, sexo);
}


// SELECT *
// FROM users t1
// INNER JOIN userfoto t2 ON t1.id = t2.iduser
// INNER JOIN seguidor t3 ON t2.id = t3.userfoto_id
// WHERE t1.sexo = 'Masculino';




Persona.listarImagenPosUsuario = (user_id) => {
    const sql = `SELECT *
    FROM userfoto U
	 JOIN seguidor p ON U.id = p.userfoto_id
	
   
    WHERE iduser = $1
    ORDER BY U.created_at DESC;`;
    return db.manyOrNone(sql, user_id);

}


// Persona.listarImagen = (user_id) => {
//     const sql = `SELECT

//     S.id,
//     S.user_id,
//     S.userfoto_id,
//     S.favorito,



//        JSON_BUILD_OBJECT(
//               'id', U.id,
//               'imageu', U.imageu,
//                'iduser', U.iduser


//           )AS userfoto



//       FROM
//       seguidor AS S

//       LEFT JOIN
//            userfoto AS U
//       ON
//           S.user_id = U.id

//       WHERE
//       S.user_id = $1

//        GROUP BY
//        U.id, S.id`;
//     return db.manyOrNone(sql, user_id);

// }





// Persona.listarImagen = (id_user) => {
//     const sql = `SELECT
//     C.id,
//         C.iduser,
//         C.imageu,

//          JSON_BUILD_OBJECT(
//                 'id', U.id,
//                 'name', U.name,
//                  'phone', U.phone,
//                 'image', U.image,
//                 'sexo', U.sexo,
//                 'userdescripcion', U.userdescripcion

//             )AS users,

// 			 JSON_BUILD_OBJECT(
//                 'id', S.id,
//                 'user_id', S.user_id,
//                  'userfoto_id', S.userfoto_id,
//                 'favorito', S.favorito


//             )AS seguidor

//         FROM
//         userfoto AS C

//         LEFT JOIN
//              users AS U
//         ON
//             C.iduser = U.id


// 		 LEFT JOIN
//              seguidor AS S
//         ON
//         C.iduser = S.id


//         WHERE
//         C.iduser = $1

//          GROUP BY
//          C.id, U.id, S.id`;
//     return db.manyOrNone(sql, id_user);
// }















// Persona.listarImagen = (id_user) => {
//     const sql = `select imageu from usuarios where id_user = $1`;
//     return db.manyOrNone(sql, id_user);
// }




// Persona.listarPersonas = (id_user) => {
//     const sql = `SELECT * FROM persona WHERE id_user = $1`;
//     return db.manyOrNone(sql, id_user);
// }

module.exports = Persona;