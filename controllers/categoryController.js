const Category = require("../models/category");

const crypto = require("crypto");

const ENCRYPTION_KEY =
    "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"; // Reemplazar con una clave segura de 32 bytes en formato hexadecimal

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
    async ListarIdCategoria(req, res, next) {
        try {
            const id = req.params.id_categoria;

            const data = await Category.listariIdCategoria(id);

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
                essage: `Error al listar categoria ${error}`,
                success: false,
                error: error,
            });
        }
    },

    async eliminarCategoria(req, res, next) {
        try {
            const id = req.params.id_categoria;

            const data = await Category.Eliminar(id);
            // console.log(`Usuarios eliminado: ${data}`);
            return res.status(201).json({
                success: true,
                message: "Categoria eliminada",
                data,
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: "Error al eliminar Categoria",
            });
        }
    },

    async actualizarCategory(req, res, next) {
        try {
            const id = req.body;

            const data = await Category.actualizar(id);

            return res.status(201).json({
                success: true,
                message: "Categoria Actualizada",
                data,
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al actualizar`,
                success: false,
                error: error,
            });
        }
    },

    async create(req, res, next) {
        try {
            const category = req.body;
            const data = await Category.create(category);

            return res.status(201).json({
                success: true,
                message: "Categoria creada",
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

    async ListarCategoria(req, res, next) {
        try {
            const id = req.body;

            const data = await Category.listarCategoria(id);

            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar categoria ${error}`,
                success: false,
                error: error,
            });
        }
    },
};