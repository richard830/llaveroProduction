const User = require("../models/user");
const Rol = require("../models/rol");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
    projectId: "chicas-bc0ed",
    keyFilename: "./serviceAccountKey.json",
});

const bucket = storage.bucket("gs://chicas-bc0ed.appspot.com/");

const IV_LENGTH = 16;
const ENCRYPTION_KEY =
    "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";

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



module.exports = {
    async ContraeRecuparar(req, res, next) {
        try {
            const email = req.body.email;
            const dato = await User.RecuperarContrase(email);

            if (!dato) {
                return res.status(404).json({
                    success: false,
                    message: "Correo invalido",
                });
            }

            const encryptedText = dato.password;
            const decryptedPassword = decrypt(encryptedText);

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "theacademyrichard@gmail.com",
                    pass: "mjlhvtbebcsvfzfg",
                },
            });

            transporter.verify().then(() => {
                console.log("Enviar correo electronico");
            });

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
                    message: "Error de envio de correo",
                });
            }

            return res.status(201).json({
                success: true,
                message: "Correo enviado revise su bandeja de entrada",
                password: decryptedPassword,
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: "Error al obtener la contraseña",
            });
        }
    },

    async updateCorreo(req, res, next) {
        try {
            const id = req.body.id;
            const email = req.body.email;

            const data = await User.actualizarCorreo(id, email);

            return res.status(201).json({
                success: true,
                message: "Correo Actualizado",
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al actualizar`,
                success: false,
                error: error,
            });
        }
    },

    async updatePassword(req, res, next) {
        try {
            const id = req.body.id;
            const password = req.body.password;

            const data = await User.actualizarPassword(id, password);

            return res.status(201).json({
                success: true,
                message: "Contraseña Actualizada",
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al actualizar`,
                success: false,
                error: error,
            });
        }
    },

    async verificarContrasen(req, res, next) {
        try {
            const id = req.body.id;
            const pass = req.body.password;
            const myuser = await User.PasswordVerificar(id);
            if (!myuser) {
                return res.status(401).json({
                    success: false,
                    message: "El id no fue encontrado",
                });
            }
            const isPasswordMatched = User.isPasswordMatched(pass, myuser.password);
            if (isPasswordMatched) {
                return res.status(201).json({
                    success: true,
                    message: "Verificado",
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: "La contraseña es incorrecta",
                });
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: "Error al momento de verificar la contraseña",
                error: error,
            });
        }
    },

    async Crear(req, res, next) {
        try {
            const email = req.body.email;
            const correo = await User.ObtenerEmail(email);
            if (correo) {
                return res.status(401).json({
                    success: false,
                    message: "El Correo ya Existe",
                });
            } else if (!correo) {
                const user = req.body;
                const data = await User.CrearUsuarios(user);
                await Rol.create(data.id, 1);
                return res.status(201).json({
                    success: true,
                    message: "Registro exitoso, ahora Inicia Sesión",
                    data: data.id,
                });
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: "Error al registrar el  usuario",
                error: error,
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
                    message: "El email no fue encontrado",
                });
            }
            if (User.isPasswordMatched(password, myuser.password)) {
                const token = jwt.sign({ id: myuser.id, email: myuser.email },
                    keys.secretOrKey, {
                        //expiresIn: (240 * 6)
                        // expiresIn: (50 * 2)
                        expiresIn: 300,
                    }
                );
                const data = {
                    id: myuser.id,
                    name: myuser.name,
                    email: myuser.email,
                    image: myuser.image,
                    session_token: `JWT ${token}`,
                    roles: myuser.roles,
                };
                await User.actualizarToken(myuser.id, `JWT ${token}`);
                return res.status(201).json({
                    success: true,
                    data: data,
                    message: "El usuario fue authenticado",
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: "La contraseña es incorrecta",
                });
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: "Error al momento de hacer login",
                error: error,
            });
        }
    },

    async logout(req, res, next) {
        try {
            const id = req.body.id;
            await User.actualizarToken(id, null);
            return res.status(201).json({
                success: true,

                message: "La sesion se ha cerrado correctamente",
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: "Error al momento de cerrar sessión",
                error: error,
            });
        }
    },
};