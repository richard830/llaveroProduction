const db = require('../config/config');

const Pago = {};

// ***admin****************************************************

Pago.listarPagoAdmin = () => {
    const sql = `SELECT DISTINCT p.nombre, p.ncuenta, p.estado, p.fechapago, p.id_usuario, p.id_userfoto, u.name, uf.foto
    FROM pago p
    JOIN users u ON p.id_usuario = u.id
    JOIN userfoto uf ON uf.id_userfoto = p.id_userfoto
    WHERE p.id_usuario  IN (SELECT id FROM users)`;
    return db.manyOrNone(sql);
}


Pago.cambiarEstados = (estado) => {
    const sql = `UPDATE pago
    SET estado = CASE WHEN estado = true THEN false ELSE true END
    WHERE id_userfoto = $1;`;
    return db.manyOrNone(sql, [estado.id_userfoto]);
}


// Pago.registrarVoucher = (fotovoucher) => {
//     const sql = `INSERT INTO voucher (id_usuario, id_userfoto, fotovoucher, fecha_voucher)
//                  VALUES ($1, $2, $3, $4)
//                  RETURNING id_voucher`;

//     return db.tx((transaction) => {
//         return transaction.oneOrNone(sql, [
//                 fotovoucher.id_usuario,
//                 fotovoucher.id_userfoto,
//                 fotovoucher.fotovoucher,
//                 new Date()
//             ])
//             .then((voucher) => {
//                 if (voucher && voucher.id_usuario) {
//                     const pagoSql = `UPDATE pago SET estado = true WHERE id_pago = $1`;
//                     return transaction.none(pagoSql, [voucher.id_usuario]);
//                 } else {
//                     throw new Error('No se pudo obtener el ID del voucher');
//                 }
//             });
//     });
// }

Pago.registrarVoucher = (fotovoucher) => {
    const sql = ` INSERT INTO voucher (id_usuario, id_userfoto, fotovoucher, fecha_voucher)
     VALUES ($1, $2,$3,$4)
     RETURNING id_voucher`;
    return db.oneOrNone(sql, [
        fotovoucher.id_usuario,
        fotovoucher.id_userfoto,
        fotovoucher.fotovoucher,
        new Date()
    ]);
}




// **********************************************************



Pago.listarVoucher = (id_userfoto) => {
    const sql = `SELECT users.name, userfoto.foto, voucher.fecha_voucher, voucher.fotovoucher
    FROM userfoto
    LEFT JOIN users ON userfoto.id_usuario = users.id
    LEFT JOIN voucher ON userfoto.id_userfoto = voucher.id_userfoto
    WHERE userfoto.id_userfoto = $1
    GROUP BY userfoto.id_userfoto, users.name, userfoto.foto, voucher.fecha_voucher,voucher.fotovoucher
    ORDER BY userfoto.fechafoto DESC;`;
    return db.manyOrNone(sql, [id_userfoto]);
}



Pago.listarEstado = (id_userfoto) => {
    const sql = `SELECT COALESCE((SELECT estado FROM pago WHERE id_userfoto = $1 LIMIT 1), true) AS estado;`;
    return db.manyOrNone(sql, id_userfoto);
}


// Pago.registrarPago = (pago) => {
//     const sql = `
//     INSERT INTO pago (id_usuario, id_userfoto, nombre, ncuenta, fechapago)
//     VALUES ($1, $2,$3,$4, $5)
//     RETURNING id_pago`;
//     return db.oneOrNone(sql, [
//         pago.id_usuario,
//         pago.id_userfoto,
//         pago.nombre,
//         pago.ncuenta,
//         // pago.estado,
//         new Date(),
//     ]);
// }


Pago.registrarPago = (pago) => {
    const sql = `
    INSERT INTO pago (id_usuario, id_userfoto, nombre, ncuenta, fechapago)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id_pago`;

    return db.tx(async(transaction) => {
        const pagoResult = await transaction.one(sql, [
            pago.id_usuario,
            pago.id_userfoto,
            pago.nombre,
            pago.ncuenta,
            new Date(),
        ]);

        const id_pago = pagoResult.id_pago;

        // Actualizar la tabla "userfoto"
        const updateSql = `
        UPDATE userfoto
        SET estadofoto = $1, estado_mostrar_foto = $2
        WHERE id_userfoto = $3`;

        await transaction.none(updateSql, [true, true, pago.id_userfoto]);

        return { id_pago };
    });
};

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
//         SET estadofoto = $1
//         WHERE id_userfoto = $2`;

//         await transaction.none(updateSql, [true, pago.id_userfoto]);

//         return { id_pago };
//     });
// };





module.exports = Pago;