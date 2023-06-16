const db = require('../config/config');
const crypto = require('crypto');




const IV_LENGTH = 16;
const ENCRYPTION_KEY = '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'; // Reemplazar con una clave segura de 32 bytes en formato hexadecimal

function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}



function decrypt(text) {
    const [ivString, encryptedString] = text.split(':');
    const iv = Buffer.from(ivString, 'hex');
    const encryptedText = Buffer.from(encryptedString, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

const User = {};



// CONSULTAS DEL ADMIN ************************



User.listarUsuariosAdmin = () => {
    const sql = "SELECT COUNT(*) AS numeroUsuario FROM users";
    return db.manyOrNone(sql)
}




// ******************************************************



User.RecuperarContrase = (email) => {
    const sql = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
    return db.oneOrNone(sql, [email]);
}

User.UsuarioLogueado = (id) => {
    const sql = `SELECT * FROM users where id =$1`;
    return db.manyOrNone(sql, id);
}

User.listarUser = () => {
    const sql = `SELECT DISTINCT u.*
    FROM users u
    INNER JOIN userfoto p ON u.id = p.id_usuario`;
    return db.manyOrNone(sql)
}



User.NumeroFoto = (id_user) => {
    const sql = "SELECT COUNT(*) FROM userfoto where id_user = $1";
    return db.manyOrNone(sql, id_user)
}




User.ObtenerIdactualizar = (id) => {
    const sql = `SELECT  u.id, u.email, u.name, u.phone, u.edad, u.profesion, u.ciudad, u.relacion,
        u.image, u.password, u.userdescripcion, u.sexo, u.session_token,
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
        WHERE u.id = $1
        GROUP BY 
        u.id`;
    return db.oneOrNone(sql, id);
}

User.actualizarActivofalse = (id) => {
    const sql = `UPDATE users
    SET active = false
    WHERE id = $1; 
    `;
    return db.none(sql, [
        id

    ])
}

User.actualizarActivo = (id) => {
    const sql = `UPDATE users
    SET active = true
    WHERE id = $1; 
    `;
    return db.none(sql, [
        id

    ])
}
User.actualizarToken = (id, token) => {
    const sql = `UPDATE users SET 
    session_token = $2
  
     WHERE id = $1`;
    return db.none(sql, [
        id,
        token
    ])
}

User.actualizar = (user) => {
    const sql = `UPDATE users SET  image= $2,  updated_at= $3
         WHERE id = $1`;

    return db.none(sql, [
        user.id,

        user.image,

        new Date()
    ])
}

User.actualizardatos = (user) => {
    const sql = `UPDATE users SET name = $2, 
          phone = $3, image= $4, 
          edad=$5, profesion=$6, 
          ciudad=$7, relacion=$8, 
          userdescripcion=$9, 
          updated_at= $10, sexo = $11
          WHERE id = $1`;

    return db.none(sql, [
        user.id,
        user.name,
        user.phone,
        user.image,
        user.edad,
        user.profesion,
        user.ciudad,
        user.relacion,
        user.userdescripcion,
        new Date(),
        user.sexo
    ])
}

User.Obtenerphone = (phone) => {
    const sql = `SELECT  u.id, u.email, u.name,  u.phone, 
                        u.password, u.userdescripcion, u.sexo, u.session_token,
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
                        WHERE u.phone = $1
                        GROUP BY 
                        u.id`;
    return db.oneOrNone(sql, phone);
}


User.ObtenerEmail = (email) => {
    const sql = `SELECT  u.id, u.email, u.name, u.phone, 
                u.image, u.password, 
                u.edad,
                u.profesion,
                u.ciudad,
                u.relacion,
                u.userdescripcion, u.sexo, u.session_token,
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
}

User.Password = (id) => {
    const sql = `SELECT  id, password from users WHERE id = $1`;
    return db.oneOrNone(sql, id);
}


User.ObtenerId = (id, callback) => {
    const sql = `SELECT id, email, 
    name,
    phone, image, 
    password,
    edad,
    profesion,
    ciudad,
    relacion,
    sexo,
    userdescripcion, session_token
    FROM users WHERE id = $1`;
    return db.oneOrNone(sql, id).then(user => { callback(null, user); })
}



User.CrearUsuarios = (user) => {

    const mypassword = encrypt(user.password);
    // const mypassword = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = mypassword;

    const sql = `INSERT INTO users
    (email, name, image, password, created_at, updated_at,sexo)
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
    return db.oneOrNone(sql, [
        user.email,
        user.name,
        // user.phone,
        user.image,
        user.password,
        new Date(),
        new Date(),
        user.sexo
    ])
}


User.isPasswordMatched = (userPassword, hash) => {
    // const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    // console.log(userPassword);
    // console.log(comparisonEncryptedText);    
    // // Comparación de los textos encriptados
    // const areEqual = userPassword === comparisonEncryptedText;
    // console.log('Son iguales:', areEqual);


    const comparisonEncryptedText = decrypt(hash);

    if (userPassword === comparisonEncryptedText) {
        return true;
    }
    return false;
}






module.exports = User;