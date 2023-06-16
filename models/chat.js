const db = require('../config/config');

const Chat = {};


// Chat.listarEstado = (id_userfoto) => {
//     const sql = `SELECT COALESCE((SELECT estado FROM pago WHERE id_userfoto = $1 LIMIT 1), true) AS estado;`;
//     return db.manyOrNone(sql, id_userfoto);
// }


Chat.registrarchat = (chat) => {
    const sql = `
    INSERT INTO chat (id_usuario, id_usuario_logueado, mensaje, fecha_chat)
    VALUES ($1, $2,$3, $4)
    RETURNING id_chat`;
    return db.oneOrNone(sql, [
        chat.id_usuario,
        chat.id_usuario_logueado,
        chat.mensaje,
        new Date(),
    ]);
}




module.exports = Chat;