const Pago = require('../models/pago');
const storage = require('../utils/cloud_storage');



module.exports = {



    // ***admin****************************************************

    async ListarPagoAdmin(req, res, next) {
        try {
            const id = req.body;
            const data = await Pago.listarPagoAdmin(id);
            return res.status(201).json(data)

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar fotos ${error}`,
                success: false,
                error: error
            })
        }
    },

    async registrarVoucherr(req, res, next) {
        try {

            const usuario = JSON.parse(req.body.fotovoucher);
            console.log(`Datos del usuariosssss ${JSON.stringify(usuario)}`);
            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`;
                const url = await storage(files[0], pathImage);
                if (url != undefined && url != null) {
                    usuario.fotovoucher = url;
                }
            }


            const data = await Pago.registrarVoucher(usuario);

            return res.status(201).json({
                success: true,
                message: 'Imagen subida correctamente',
                data: data.id_voucher,
                //data: data2.id
            })
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al subir imagen',
                error: error
            })
        }
    },




    // ************************************************************


    async cambiarEstado(req, res, next) {
        try {
            const id = req.body;

            const total = await Pago.cambiarEstados(id);
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

    async ListarEstado(req, res, next) {
        try {
            const id_userfoto = req.params.id_userfoto;
            const data = await Pago.listarEstado(id_userfoto);
            return res.status(201).json(data)

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar fotos ${error}`,
                success: false,
                error: error
            })
        }
    },

    async listarVoucherr(req, res, next) {
        try {
            const id_userfoto = req.params.id_userfoto;
            const data = await Pago.listarVoucher(id_userfoto);
            return res.status(201).json(data)

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar fotos ${error}`,
                success: false,
                error: error
            })
        }
    },

    async AgregarPago(req, res, next) {
        try {
            const id = req.body;

            const total = await Pago.registrarPago(id);
            return res.status(201).json({
                message: 'Datos Enviado Corectamente',
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


}