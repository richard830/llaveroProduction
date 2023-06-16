const db = require('../config/config');

const UserFoto = {};




UserFoto.EliminarFoto = (id_userfoto, id_usuario) => {
    const sql = 'delete from userfoto where id_userfoto = $1 and id_usuario= $2';
    return db.manyOrNone(sql, [id_userfoto, id_usuario])
}

UserFoto.fotoFavoritoNumeroMayor = (id_usuario) => {
    const sql = `SELECT subconsulta.foto, subconsulta.numero_max
    FROM (
        SELECT userfoto.foto, MAX(favorito.cantidad_favoritos) AS numero_max
        FROM userfoto
        JOIN (
            SELECT id_userfoto, COUNT(*) AS cantidad_favoritos
            FROM favorito
            GROUP BY id_userfoto
        ) AS favorito ON userfoto.id_userfoto = favorito.id_userfoto
        WHERE userfoto.id_usuario = $1
        GROUP BY userfoto.foto
    ) AS subconsulta
    ORDER BY subconsulta.numero_max DESC
    LIMIT 1`;
    return db.manyOrNone(sql, [id_usuario]);
}



UserFoto.TotalFotosxId = (id_usuario) => {
    const sql = `SELECT COUNT(*) AS "total" FROM "userfoto" where id_usuario = $1`;
    return db.manyOrNone(sql, id_usuario);
}



UserFoto.SumaTotalMegustaxId = (id_usuario) => {
    const sql = `SELECT COUNT(*) AS "total" FROM "favorito" where id_usuario = $1`;
    return db.manyOrNone(sql, id_usuario);
}



UserFoto.TotalMegustaId = (id_userfoto) => {
    const sql = `SELECT  COUNT(*)  AS total
    FROM favorito where id_userfoto = $1`;
    return db.manyOrNone(sql, [id_userfoto]);
}


UserFoto.listarFotoxId = (id_usuario) => {
    const sql = `SELECT userfoto.*, COUNT(favorito.id_userfoto) AS cantidad
    FROM userfoto
    LEFT JOIN favorito ON userfoto.id_userfoto = favorito.id_userfoto
    WHERE userfoto.id_usuario = $1
    GROUP BY userfoto.id_userfoto
    ORDER BY userfoto.fechafoto DESC;`;
    // const sql = `SELECT *
    // FROM userfoto WHERE  id_usuario =$1
    // ORDER BY created_at DESC;`;
    return db.manyOrNone(sql, id_usuario);
}

UserFoto.listarFotoActivos = () => {
    const sql = `SELECT *
    FROM users  WHERE active = true`;
    return db.manyOrNone(sql);
}

UserFoto.estado = (active) => {
    const sql = `UPDATE users SET active = $2 WHERE id = $1`;
    return db.manyOrNone(sql, [active.id, active.active]);
}

UserFoto.agregarvista = (vista) => {
    const sql = `UPDATE userfoto SET vista = vista + 1 WHERE id_userfoto = $1`;
    return db.manyOrNone(sql, [vista.id_userfoto, vista.vista]);
}






// la que vale 
UserFoto.listarFotoxGenero = () => {
    const sql = `SELECT p.id_userfoto, u.*, p.*,
        COALESCE(t.numero_comentarios, 0) AS numero_comentarios,
        COALESCE(f.numero_favorito, 0) AS numero_favorito
    FROM userfoto p
    LEFT JOIN (
        SELECT id_userfoto, COUNT(id_comentario) AS numero_comentarios
        FROM tcomentario
        GROUP BY id_userfoto
    ) t ON p.id_userfoto = t.id_userfoto
    LEFT JOIN (
        SELECT id_userfoto, COUNT(id_userfoto) AS numero_favorito
        FROM favorito
        GROUP BY id_userfoto
    ) f ON p.id_userfoto = f.id_userfoto
    JOIN users u ON u.id = p.id_usuario
    where p.estado_mostrar_foto = false
    ORDER BY p.fechafoto DESC;`;
    // RANDOM() para mostrar en aleatorio
    return db.manyOrNone(sql);
}






UserFoto.listarFotoBuscarDetalle = (id_usuario) => {
    const sql = `SELECT userfoto.*, COUNT(favorito.id_userfoto) AS cantidad
    FROM userfoto
    LEFT JOIN favorito ON userfoto.id_userfoto = favorito.id_userfoto
    WHERE userfoto.id_usuario = $1
    GROUP BY userfoto.id_userfoto
    ORDER BY userfoto.fechafoto DESC`;
    return db.manyOrNone(sql, id_usuario);
}

UserFoto.listarFotoxBuscar = () => {
    const sql = `select * from users`;
    return db.manyOrNone(sql);
}


UserFoto.Seguidos = (id_usuario) => {
    const sql = `
    SELECT *
        FROM seguidor s
        JOIN users u ON s.id_usuario_logueado = u.id
        
        WHERE s.id_usuario = $1`;
    return db.manyOrNone(sql, id_usuario);

}

UserFoto.usuario_dado_megusta = (id_userfoto) => {
    const sql = `
    SELECT *
    FROM users u
    JOIN favorito f ON u.id = f.id_usuario
    WHERE f.id_userfoto = $1;`;
    return db.manyOrNone(sql, id_userfoto);

}

UserFoto.misSeguidores = (id_usuario_logueado) => {
    const sql = `SELECT u.*, s.id_usuario_logueado, s.id_usuario
    FROM users u
    JOIN seguidor s ON u.id = s.id_usuario
    WHERE s.id_usuario_logueado = $1`;
    return db.manyOrNone(sql, id_usuario_logueado);

}
UserFoto.listarMeGustaxId = (id_usuario) => {
    const sql = `SELECT *
    FROM favorito f
    JOIN users u ON f.id_usuario = u.id
    JOIN userfoto uf ON f.id_userfoto = uf.id_userfoto
    WHERE f.id_usuario = $1`;
    return db.manyOrNone(sql, id_usuario);

}

UserFoto.listarImagenPerfil = (id_usuario) => {
    const sql = `SELECT userfoto.*, COUNT(favorito.id_userfoto) AS cantidad
    FROM userfoto
    LEFT JOIN favorito ON userfoto.id_userfoto = favorito.id_userfoto
    WHERE userfoto.id_usuario = $1
    GROUP BY userfoto.id_userfoto
    ORDER BY userfoto.fechafoto DESC;`;
    return db.manyOrNone(sql, id_usuario);

}

UserFoto.verExisteFoto = async(id_usuario, id_userfoto) => {
    const sql = `
    SELECT COALESCE(
        (
            SELECT '1'
            FROM favorito
            WHERE id_usuario = $1 AND id_userfoto = $2
            LIMIT 1
        ),
        '0'
    ) AS numeroTotal;`;

    return db.manyOrNone(sql, [id_usuario, id_userfoto]);

};

UserFoto.verExisTeSeguidor = async(id_usuario_logueado, id_usuario) => {
    const sql = `
    SELECT COALESCE(
        (
            SELECT '1'
            FROM seguidor
            WHERE id_usuario_logueado = $1 AND id_usuario  = $2
            LIMIT 1
        ),
        '0'
    ) AS existe_seguidor
    `;

    return db.manyOrNone(sql, [id_usuario_logueado, id_usuario]);

};

UserFoto.registrarFavorito = async(favorito) => {
    const sql = await db.oneOrNone(
        'SELECT id_favorito FROM favorito WHERE id_usuario = $1 AND id_userfoto = $2', [favorito.id_usuario, favorito.id_userfoto]
    );

    if (sql) {
        // Ya existe un registro con el mismo id_usuario e id_userfoto, eliminamos el registro existente
        await db.none(
            'DELETE FROM favorito WHERE id_favorito = $1',
            sql.id_favorito
        );
        console.log('Registro existente eliminado');
        return null; // Opcional: Puedes retornar un valor específico para indicar que se eliminó el registro existente
    } else {
        // No existe un registro con el mismo id_usuario e id_userfoto, realizamos la inserción
        const newRecord = await db.one(
            'INSERT INTO favorito (id_usuario, id_userfoto) VALUES ($1, $2) RETURNING id_favorito', [favorito.id_usuario, favorito.id_userfoto]
        );
        console.log('Nuevo registro insertado');
        return newRecord.id_favorito;
    }
};





UserFoto.registrarSeguidor = async(seguidor) => {
    const sql = await db.oneOrNone(
        'SELECT id FROM seguidor WHERE id_usuario_logueado = $1 AND id_usuario = $2', [seguidor.id_usuario_logueado, seguidor.id_usuario]
    );

    if (sql) {
        // Ya existe un registro con el mismo id_usuario e id_userfoto, eliminamos el registro existente
        await db.none(
            'DELETE FROM seguidor WHERE id = $1',
            sql.id
        );
        console.log('Registro existente eliminado');
        return null; // Opcional: Puedes retornar un valor específico para indicar que se eliminó el registro existente
    } else {
        // No existe un registro con el mismo id_usuario e id_userfoto, realizamos la inserción
        const newRecord = await db.one(
            'INSERT INTO seguidor (id_usuario_logueado, id_usuario) VALUES ($1, $2) RETURNING id', [seguidor.id_usuario_logueado, seguidor.id_usuario]
        );
        console.log('Nuevo registro insertado');
        return newRecord.id;
    }

}

UserFoto.registrarFoto = (foto) => {
    const sql = `
    INSERT INTO userfoto (id_usuario, foto,fechafoto,comentario)
    VALUES ($1, $2,$3, $4)
    RETURNING id_userfoto`;
    return db.oneOrNone(sql, [
        foto.id_usuario,
        foto.foto,
        new Date(),
        foto.comentario
    ]);
}




module.exports = UserFoto;