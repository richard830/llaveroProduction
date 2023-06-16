const comentarioController = require('../controllers/comentarioController');


module.exports = (app) => {

    // app.post('/api/comentario/verCorazonComentario/:id_usuario/:id_comentario', comentarioController.verCorazonComentari);
    app.post('/api/comentario/agregarcomentario', comentarioController.AgregarComentario);
    app.post('/api/comentario/agregarCorazonComentario', comentarioController.AgregarCorazonComentarios);
    app.get('/api/comentario/listarComentario/:id_userfoto', comentarioController.ListarComentarios);

}