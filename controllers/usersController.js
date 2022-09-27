

const User = require('../models/user');
const Rol = require('../models/rol');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const ret = require('bluebird/js/release/util');
const storage = require('../utils/cloud_storage')
const crypto = require('crypto');
module.exports = {



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
                message: 'Los datos del Usuario se actualizaron correctament',

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
 

            if(correo){
               
                return res.status(401).json({
                    success:false,
                    message: 'El Correo ya Existe'
                });

            }if(telefono){
               
                return res.status(401).json({
                    success:false,
                    message: 'El telefono ya Existe'
                });
            }
         
            
            else if(!correo, !telefono){
            const user = req.body;
            const data = await User.CrearUsuarios(user);
            
            await Rol.create(data.id, 1); // ROL POR DEFECTO (CLIENTE)

            return res.status(201).json({
                success: true,
                message:'Registro exitoso, ahora Inicia Sesión',
                data: data.id
            });
            }
            
          
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al registrar el  usuario',
                error:error
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
                    expiresIn:(60 *1)
                });
                const data = {
                    id: myuser.id,
                    name: myuser.name,
                    lastname: myuser.lastname,
                    email: myuser.email,
                    phone: myuser.phone,
                    image: myuser.image,
                    session_token: `JWT ${token}`,
                    roles: myuser.roles
                }

                await User.actualizarToken(myuser.id, `JWT ${token}`);
                console.log(`USUARIO ENVIADO ${data}`);




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
            return res.status(201).json({
                success: true,

                message: 'La sesion se ha cerrado correctamente'
            });

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