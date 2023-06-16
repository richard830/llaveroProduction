const Comentario = require('../models/comentario');



module.exports = {

    // async verCorazonComentari(req, res, next) {
    //     try {
    //         const id_usuario = req.params.id_usuario;
    //         const id_comentario = req.params.id_comentario;
    //         const data = await Comentario.verCorazonComentario(id_usuario, id_comentario);

    //         return res.status(201).json(data)
    //     } catch (error) {
    //         console.log(`Error: ${error}`);
    //         return res.status(501).json({
    //             success: false,
    //             message: 'Hubo un error al crear favorito',
    //             error: error
    //         })
    //     }
    // },



    async ListarComentarios(req, res, next) {
        try {
            const id_userfoto = req.params.id_userfoto;
            // const id_usuario = req.params.id_usuario;
            const data = await Comentario.listarComentario(id_userfoto);
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

    async AgregarCorazonComentarios(req, res, next) {
        try {
            const dato = req.body;

            const total = await Comentario.agregarCorazonComentario(dato);
            return res.status(201).json({
                message: 'Comentario2fff Agregado',
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
    async AgregarComentario(req, res, next) {
        try {
            const dato = req.body;

            const total = await Comentario.registrarComentario(dato);
            return res.status(201).json({
                message: 'Comentario Agregado',
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