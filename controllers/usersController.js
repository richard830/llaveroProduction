const User = require('../models/user');
const Rol = require('../models/rol');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const ret = require('bluebird/js/release/util');
const storage = require('../utils/cloud_storage');
const crypto = require('crypto');

const nodemailer = require("nodemailer");



const IV_LENGTH = 16;
const ENCRYPTION_KEY = '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'; // Reemplazar con una clave segura de 32 bytes en formato hexadecimal


function decrypt(text) {
    const [ivString, encryptedString] = text.split(':');
    const iv = Buffer.from(ivString, 'hex');
    const encryptedText = Buffer.from(encryptedString, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}


module.exports = {




    // CONSULTAS DEL ADMIN ******************************************

    async listarUsuarioAdmin(req, res, next) {
        try {
            const id = req.body;

            const data = await User.listarUsuariosAdmin(id);
            return res.status(201).json(data)

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({

                success: false,
                message: 'Error al obtener el numero de Usuarios'
            })
        }
    },








    // ****************************************************************




    async IdUsuarioLogueado(req, res, next) {
        try {
            const id = req.params.id;

            const data = await User.UsuarioLogueado(id);
            return res.status(201).json(data)

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({

                success: false,
                message: 'Error al obtener el usuario logueado'
            })
        }
    },

    async listarUsuario(req, res, next) {
        try {
            const id = req.body;

            const data = await User.listarUser(id);
            return res.status(201).json(data)

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({

                success: false,
                message: 'Error al obtener el numero de fotos'
            })
        }
    },
    async NumeroFotos(req, res, next) {
        try {
            const id = req.params.id_user;

            const data = await User.NumeroFoto(id);
            return res.status(201).json(
                data

            )

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({

                success: false,
                message: 'Error al obtener el numero de fotos'
            })
        }
    },



    async ContraeRecuparar(req, res, next) {
        try {
            const email = req.body.email;
            const dato = await User.RecuperarContrase(email);


            if (!dato) {
                return res.status(404).json({
                    success: false,
                    message: 'Correo invalido'
                });
            }

            const encryptedText = dato.password;
            const decryptedPassword = decrypt(encryptedText);



            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: 'theacademyrichard@gmail.com',
                    pass: 'mjlhvtbebcsvfzfg',
                },
            });

            transporter.verify().then(() => {
                console.log('Enviar correo electronico')
            })

            try {


                await transporter.sendMail({
                    from: '"Recuperación de contraseña 👻" <YuboLobe>', // sender address
                    to: dato.email,
                    subject: "Recuperación de contraseña", // Subject line
                    //text: decryptedPassword,
                    html: "<b>Mi contraseña: </b>" + decryptedPassword, // html body
                });

            } catch (error) {
                console.log(`Error al enviar correo: ${error}`);
                return res.status(501).json({
                    success: false,
                    message: 'Error de envio de correo'
                })
            }







            return res.status(201).json({
                success: true,
                message: 'Correo enviado revise su bandeja de entrada',
                password: decryptedPassword
            });


        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({

                success: false,
                message: 'Error al obtener la contraseña'
            })
        }
    },




    async findIdActualizar(req, res, next) {
        try {
            const id = req.params.id;

            const data = await User.ObtenerIdactualizar(id);
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data)

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({

                success: false,
                message: 'Error al obtener los usuarios por ID'
            })
        }
    },


    async updateCampo(req, res, next) {
        try {
            const user = JSON.parse(req.body.user);
            console.log(`Datos del usuarios ${JSON.stringify(user)}`);
            const files = req.files;
            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`;
                const url = await storage(files[0], pathImage);
                if (url != undefined && url != null) {
                    user.image = url;
                }
            }

            await User.actualizardatos(user);
            return res.status(201).json({
                success: true,
                message: 'Datos Actualizado exitosamente',

            })
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un Error en la actualizacion de datos',
                error: error
            })
        }
    },




    async update(req, res, next) {
        try {
            const user = JSON.parse(req.body.user);
            console.log(`Datos del usuarios ${JSON.stringify(user)}`);
            const files = req.files;
            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`;
                const url = await storage(files[0], pathImage);
                if (url != undefined && url != null) {
                    user.image = url;
                }
            }

            await User.actualizar(user);
            return res.status(201).json({
                success: true,
                message: 'Datos Actualizado exitosamente',

            })
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un Error en la actualizacion de datos',
                error: error
            })
        }
    },


    async Crear(req, res, next) {
        try {

            const email = req.body.email;

            const correo = await User.ObtenerEmail(email);


            const phone = req.body.phone;
            const telefono = await User.Obtenerphone(phone);


            if (correo) {

                return res.status(401).json({
                    success: false,
                    message: 'El Correo ya Existe'
                });

            }
            if (telefono) {

                return res.status(401).json({
                    success: false,
                    message: 'El telefono ya Existe'
                });
            } else if (!correo, !telefono) {
                const user = req.body;
                const data = await User.CrearUsuarios(user);

                await Rol.create(data.id, 1); // ROL POR DEFECTO (CLIENTE)

                return res.status(201).json({
                    success: true,
                    message: 'Registro exitoso, ahora Inicia Sesión',
                    data: data.id
                });
            }


        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al registrar el  usuario',
                error: error
            })
        }


        /*  try {
             const user = req.body;
             const data = await User.CrearUsuarios(user);
             //ROL POR DEFECTO
             await Rol.create(data.id, 1);

             return res.status(201).json({
                 success: true,
                 message: 'Registro exitoso, ahora Inicia Sesión',
                 data: data.id
             })
         } catch (error) {
             console.log(`Error: ${error}`);
             return res.status(501).json({
                 success: false,
                 message: 'Error al registrar el  usuario',
                 error: error
             })
         } */
    },

    async password(req, res, next) {
        try {
            const id = req.params.id;
            const password = req.body.password;
            const myuser = await User.Password(id);
            if (User.isPasswordMatched(password, myuser.password)) {

                /* const token = jwt.sign({ id: myuser.id, password: myuser.password }, keys.secretOrKey, {
                     //:(240 *3)
                 }); */
                const data = {
                    id: myuser.id,
                    password: myuser.password,

                }

                //await User.actualizarToken(myuser.id, `JWT ${token}`);
                console.log(`USUARIO ENVIADO ${data}`);
                return res.status(201).json({
                    success: true,
                    data: data,
                    message: 'Contraseña encontradad'
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'La contraseña es incorrecta',

                })
            }

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al momento de hacer login',
                error: error
            });
        }
    },

    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const myuser = await User.ObtenerEmail(email);

            if (!myuser) {
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado'
                });

            }
            if (User.isPasswordMatched(password, myuser.password)) {

                const token = jwt.sign({ id: myuser.id, email: myuser.email }, keys.secretOrKey, {
                    expiresIn: (240 * 6)
                });
                const data = {
                    id: myuser.id,
                    name: myuser.name,
                    //lastname: myuser.lastname,
                    email: myuser.email,
                    phone: myuser.phone,
                    edad: myuser.edad,
                    profesion: myuser.profesion,
                    ciudad: myuser.ciudad,
                    relacion: myuser.relacion,
                    sexo: myuser.sexo,

                    image: myuser.image,
                    userdescripcion: myuser.userdescripcion,
                    session_token: `JWT ${token}`,
                    roles: myuser.roles,
                    active: myuser.active
                }

                await User.actualizarToken(myuser.id, `JWT ${token}`);
                await User.actualizarActivo(myuser.id);
                console.log(`USUARIO ENVIADO AAA ${data}`);




                /* 
                                const algorithm = "aes-256-cbc"; 
                
                                
                                const initVector = crypto.randomBytes(16);
                
                                const Securitykey = crypto.randomBytes(32);
                
                                const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
                   
                                let decryptedData = decipher.update(password, "hex", "utf-8");
                
                                decryptedData += decipher.final("utf8");
                                console.log('mi contraseña es..'+ decryptedData) */



                return res.status(201).json({
                    success: true,
                    data: data,
                    message: 'El usuario fue authenticado'
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'La contraseña es incorrecta',

                })
            }

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al momento de hacer login',
                error: error
            });
        }
    },

    async logout(req, res, next) {
        try {
            const id = req.body.id;
            await User.actualizarToken(id, null);
            await User.actualizarActivofalse(id);
            return res.status(201).json({
                success: true,

                //message: console.log('La sesion se ha cerrado correctamente')
                message: 'La sesion se ha cerrado correctamente'
            });
            // console.log(`USUARIO ENVIADO AAA ${data}`);

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al momento de cerrar sessión',
                error: error
            });
        }
    }


}