const db = require('../config/config');
const crypto = require('crypto');

const User = {};


User.Ob = (id) =>{
    const sql = `SELECT email,password FROM users where id =$1`;
    return db.manyOrNone(sql,id);
}

User.ObtenerDelivery = () =>{
    const sql = `SELECT  u.id, u.email, u.name, u.lastname, u.phone, 
                 u.image, u.password, u.session_token
                FROM
                users AS U
                INNER JOIN
                user_has_roles AS UHR
                ON 
                UHR.id_user = U.id
                INNER JOIN
                    roles AS R
                ON
                    R.id = UHR.id_rol
                WHERE
                    R.id = 3
                `; 
     return db.manyOrNone(sql);
 }
    
User.ObtenerIdactualizar = (id) =>{
    const sql = `SELECT  u.id, u.email, u.name, u.lastname, u.phone, 
        u.image, u.password, u.session_token,
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
     return db.oneOrNone(sql,id);
 }

 User.actualizarToken =(id, token)=>{
    const sql = `UPDATE users SET 
    session_token = $2
  
     WHERE id = $1`;
     return db.none(sql,[
        id,
        token
     ])
}

    User.actualizar =(user)=>{
        const sql = `UPDATE users SET name = $2, lastname = $3,
         phone = $4, image= $5, updated_at = $6 
         WHERE id = $1`;
         
         return db.none(sql,[
             user.id,
             user.name,
             user.lastname,
             user.phone,
             user.image,
             new Date()
         ])
    }

    User.Obtenerphone = (phone) =>{
        const sql = `SELECT  u.id, u.email, u.name, u.lastname, u.phone, 
                        u.password, u.session_token,
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
             return db.oneOrNone(sql,phone);
         }


User.ObtenerEmail = (email) =>{
   const sql = `SELECT  u.id, u.email, u.name, u.lastname, u.phone, 
                u.image, u.password, u.session_token,
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
    return db.oneOrNone(sql,email);
}


User.ObtenerId = (id, callback) =>{
    const sql = `SELECT id, email, 
    name, lastname, 
    phone, image, 
    password, session_token
    FROM users WHERE id = $1`;
    return db.oneOrNone(sql, id).then(user =>{callback(null,user);})
}



User.ObtnerUsuarios = () =>{
    const sql = `SELECT * FROM users`;
    return db.manyOrNone(sql);
}


User.CrearUsuarios = (user) =>{
    
    const mypassword = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = mypassword;

    const sql = `INSERT INTO users
    (email, name, lastname, phone, image, password, created_at,updated_at)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
    return db.oneOrNone(sql,[
        user.email, 
        user.name, 
        user.lastname, 
        user.phone,
        user.image,
        user.password,
        new Date(),
        new Date()
    ])
}


User.isPasswordMatched = (userPassword, hash)=>{
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
 
  
    if(myPasswordHashed === hash){
        return true;
    }
    return false;
}





module.exports = User;