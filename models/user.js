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

function decrypt(text) {
    const [ivString, encryptedString] = text.split(":");
    const iv = Buffer.from(ivString, "hex");
    const encryptedText = Buffer.from(encryptedString, "hex");
    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        Buffer.from(ENCRYPTION_KEY, "hex"),
        iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

const User = {};




User.ObtenerId = (id, callback) => {
    const sql = `SELECT id, email, 
    name,
    image, 
    password,
    session_token
    FROM users WHERE id = $1`;
    return db.oneOrNone(sql, id).then(user => { callback(null, user); })
}




User.RecuperarContrase = (email) => {
    const sql = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
    return db.oneOrNone(sql, [email]);
};

User.actualizarCorreo = (id, email) => {
    const sql = `UPDATE users
    SET email = $2
                                 WHERE id = $1; 
    `;
    return db.none(sql, [id, email]);
};

User.actualizarPassword = (id, password) => {
    console.log(password);
    const mypassword = encrypt(password);
    password = mypassword;

    const sql = `UPDATE users
    SET password = $2
    WHERE id = $1; 
    `;
    return db.none(sql, [id, password]);
};

User.actualizarToken = (id, token) => {
    const sql = `UPDATE users SET 
    session_token = $2
  
     WHERE id = $1`;
    return db.none(sql, [id, token]);
};

User.ObtenerEmail = (email) => {
    const sql = `SELECT  u.id, u.email, u.name,
                u.image, u.password,session_token,
              
                json_agg(
                    json_build_object(
                      'id', r.id,
                    'name', r.name,
                    'image', r.image,
                    'route', r.route
                )) 
                AS roles FROM users AS u
                INNER JOIN user_has_roles AS uhr
                ON
                uhr.id_user = u.id
                INNER JOIN 
                roles AS r
                ON
                r.id = uhr.id_rol
                WHERE u.email = $1
                GROUP BY 
                u.id`;
    return db.oneOrNone(sql, email);
};

User.PasswordVerificar = (id) => {
    const sql = `select * from users where id = $1 `;
    return db.oneOrNone(sql, [id]);
};
User.PasswordVerificarP = (password) => {
    const sql = `select * from users where password = $1`;
    return db.oneOrNone(sql, [password]);
};

User.Password = (id) => {
    const sql = `SELECT  id, password from users WHERE id = $1`;
    return db.oneOrNone(sql, id);
};

User.CrearUsuarios = (user) => {
    const mypassword = encrypt(user.password);
    user.password = mypassword;

    const sql = `INSERT INTO users
    (email, name, image, password, created_at, updated_at)
    VALUES($1, $2, $3, $4, $5, $6) RETURNING id`;
    return db.oneOrNone(sql, [
        user.email,
        user.name,
        user.image,
        user.password,
        new Date(),
        new Date(),
    ]);
};

User.isPasswordMatched = (userPassword, hash) => {
    const comparisonEncryptedText = decrypt(hash);
    if (userPassword === comparisonEncryptedText) {
        return true;
    }
    return false;
};

module.exports = User;