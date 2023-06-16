const db = require('../config/config');

const Configuracion = {};



Configuracion.actualizarEstadoConfig = (config) => {
    const sql = `UPDATE configuracion
    SET estado_dia = CASE WHEN estado_dia = true THEN false ELSE true END
    WHERE id_config = $1;`;
    return db.manyOrNone(sql, [config.id_config])


}

Configuracion.actualizarConfigImage = (config) => {
    const sql = `UPDATE configuracion SET 
    foto_dia = $2
   
    WHERE id_config = $1`;

    return db.none(sql, [
        config.id_config,

        config.foto_dia
    ])
}


Configuracion.actualizarConfig = (config) => {
    const sql = `UPDATE configuracion SET 
    numero_like = $2,
    titulo_voucher_process = $3,
    subtitulo_voucher_process = $4,
    titulo_enviar_datos = $5,
    subtitulo_enviar_datos = $6,
    titulo_dia = $7,
    subtitulo_dia = $8
    WHERE id_config = $1`;

    return db.none(sql, [
        config.id_config,
        config.numero_like,
        config.titulo_voucher_process,
        config.subtitulo_voucher_process,
        config.titulo_enviar_datos,
        config.subtitulo_enviar_datos,
        config.titulo_dia,
        config.subtitulo_dia,
        //config.foto_dia,
    ])
}

Configuracion.listar_configuracion = () => {
    const sql = `SELECT * from configuracion`;
    return db.manyOrNone(sql);
}











// Pago.registrarPago = (pago) => {
//     const sql = `
//     INSERT INTO pago (id_usuario, id_userfoto, nombre, ncuenta, fechapago)
//     VALUES ($1, $2, $3, $4, $5)
//     RETURNING id_pago`;

//     return db.tx(async(transaction) => {
//         const pagoResult = await transaction.one(sql, [
//             pago.id_usuario,
//             pago.id_userfoto,
//             pago.nombre,
//             pago.ncuenta,
//             new Date(),
//         ]);

//         const id_pago = pagoResult.id_pago;

//         // Actualizar la tabla "userfoto"
//         const updateSql = `
//         UPDATE userfoto
//         SET estadofoto = $1, estado_mostrar_foto = $2
//         WHERE id_userfoto = $3`;

//         await transaction.none(updateSql, [true, true, pago.id_userfoto]);

//         return { id_pago };
//     });
// };




module.exports = Configuracion;