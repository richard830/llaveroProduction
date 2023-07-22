const Password = require("../models/password");
const crypto = require("crypto");

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
    async eliminarPassword(req, res, next) {
        try {
            const id = req.params.id_password;

            const data = await Password.EliminarPassword(id);
            // console.log(`Usuarios eliminado: ${data}`);
            return res.status(201).json({
                success: true,
                message: "Password eliminada",
                data,
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: "Error al eliminar",
            });
        }
    },

    async updatePassword(req, res, next) {
        try {
            const id = req.body;

            const data = await Password.editarPassword(id);

            return res.status(201).json({
                // data,
                success: true,
                message: "Datos Actualizado",
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar seguidor ${error}`,
                success: false,
                error: error,
            });
        }
    },

    async create(req, res, next) {
        try {
            const password = req.body;
            const data = await Password.create(password);

            return res.status(201).json({
                success: true,
                message: "Contraseña Creada",
                data: data.id,
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: "Hubo un error al crear la caetgoria",
                error: error,
            });
        }
    },

    async TotalPassword(req, res, next) {
        try {
            const id = req.body;

            const data = await Password.totalPassword(id);

            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar password ${error}`,
                success: false,
                error: error,
            });
        }
    },

    async ListarPassword(req, res, next) {
        try {
            const id = req.body;

            const data = await Password.listarPassword(id);
            if (Array.isArray(data) && data.length > 0) {
                data.forEach((user) => {
                    user.usuarioDescifrado = decrypt(user.usuario);
                });
                data.forEach((user) => {
                    user.passwordDesifrado = decrypt(user.contrasen);
                });

                return res.status(201).json(data);
            }

            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar password ${error}`,
                success: false,
                error: error,
            });
        }
    },
};