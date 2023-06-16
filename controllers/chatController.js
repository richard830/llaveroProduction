const Chat = require('../models/chat');



module.exports = {


    // async ListarEstado(req, res, next) {
    //     try {
    //         const id_userfoto = req.params.id_userfoto;
    //         const data = await Pago.listarEstado(id_userfoto);
    //         return res.status(201).json(data)

    //     } catch (error) {
    //         console.log(`Error: ${error}`);
    //         return res.status(501).json({
    //             essage: `Error al listar fotos ${error}`,
    //             success: false,
    //             error: error
    //         })
    //     }
    // },

    async crearChat(req, res, next) {
        try {
            const id = req.body;

            const total = await Chat.registrarchat(id);
            return res.status(201).json({
                message: 'Chat Enviado',
                success: true
            })
        } catch (error) {

            return res.status(501).json({
                message: `Error al enviar Mensaje`,
                success: false,
                error: error
            })
        }
    },


}