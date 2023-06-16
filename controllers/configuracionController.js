const Configuracion = require('../models/configuracion');
const storage = require('../utils/cloud_storage');



module.exports = {

    async cambiarEstadoConfig(req, res, next) {
        try {
            const id = req.body;

            const total = await Configuracion.actualizarEstadoConfig(id);
            return res.status(201).json({
                message: 'Datos actualizado',
                success: true
            })
        } catch (error) {

            return res.status(501).json({
                message: `Error al enviar datos`,
                success: false,
                error: error
            })
        }
    },


    async updateConfiguracion(req, res, next) {
        try {
            const id = req.body;
            await Configuracion.actualizarConfig(id);
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


    async updateConfiguracionImage(req, res, next) {
        try {
            const user = JSON.parse(req.body.config);
            console.log(`Datos del usuarios ${JSON.stringify(user)}`);
            const files = req.files;
            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`;
                const url = await storage(files[0], pathImage);
                if (url != undefined && url != null) {
                    user.foto_dia = url;
                }
            }

            await Configuracion.actualizarConfigImage(user);
            return res.status(201).json({
                success: true,
                message: 'Imagen Actualizada',

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

    async Listar_Configuracion(req, res, next) {
        try {
            const id = req.body;
            const data = await Configuracion.listar_configuracion(id);
            return res.status(201).json(data)

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar`,
                success: false,
                error: error
            })
        }
    },

    // async registrarVoucherr(req, res, next) {
    //     try {

    //         const usuario = JSON.parse(req.body.fotovoucher);
    //         console.log(`Datos del usuariosssss ${JSON.stringify(usuario)}`);
    //         const files = req.files;

    //         if (files.length > 0) {
    //             const pathImage = `image_${Date.now()}`;
    //             const url = await storage(files[0], pathImage);
    //             if (url != undefined && url != null) {
    //                 usuario.fotovoucher = url;
    //             }
    //         }


    //         const data = await Pago.registrarVoucher(usuario);

    //         return res.status(201).json({
    //             success: true,
    //             message: 'Imagen subida correctamente',
    //             data: data.id_voucher,
    //             //data: data2.id
    //         })
    //     } catch (error) {
    //         console.log(`Error: ${error}`);
    //         return res.status(501).json({
    //             success: false,
    //             message: 'Hubo un error al subir imagen',
    //             error: error
    //         })
    //     }
    // },










}