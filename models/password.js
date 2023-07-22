const db = require("../config/config");
const crypto = require("crypto");

const IV_LENGTH = 16;
const ENCRYPTION_KEY =
    "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";

function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        Buffer.from(ENCRYPTION_KEY, "hex"),
        iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

const Password = {};

Password.EliminarPassword = (id) => {
    const sql = "delete from password where id_password = $1";
    return db.manyOrNone(sql, id);
};

Password.editarPassword = (pass) => {
    const contrasen = encrypt(pass.contrasen);
    pass.contrasen = contrasen;

    const usuario = encrypt(pass.usuario);
    pass.usuario = usuario;

    const sql = `UPDATE password SET
       
        titulo = $2,
        usuario = $3,
        contrasen = $4,
       
        updated_at = $5
        WHERE
         id_password = $1
    `;

    return db.none(sql, [
        pass.id_password,
        pass.titulo,
        pass.usuario,
        pass.contrasen,
        new Date(),
    ]);
};

Password.create = (password) => {
    const contrasen = encrypt(password.contrasen);
    password.contrasen = contrasen;

    const usuario = encrypt(password.usuario);
    password.usuario = usuario;

    const sql = `INSERT INTO password(
        titulo, 
        usuario, 
        contrasen,
        id_categoria,
        created_at,
        updated_at
        ) VALUES 
        ( $1, $2, $3, $4,$5,$6) RETURNING id_password`;
    return db.oneOrNone(sql, [
        password.titulo,
        password.usuario,
        password.contrasen,
        password.id_categoria,
        new Date(),
        new Date(),
    ]);
};

Password.listarPassword = () => {
    const sql = `
    SELECT * FROM categoria c
    INNER JOIN password p ON p.id_categoria = c.id_categoria;
    `;
    return db.manyOrNone(sql);
};

Password.totalPassword = () => {
    const sql = `SELECT  COUNT(*)  AS total
    FROM password`;
    return db.manyOrNone(sql);
};

module.exports = Password;