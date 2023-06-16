const passport = require('passport');
const PersonaController = require('../controllers/personaController');
const db = require('../config/config');


module.exports = (app, upload) => {

    app.post('/api/persona/crearPersona', upload.array('image', 1), PersonaController.createPersona);
    app.post('/api/persona/crearUsuario', upload.array('imageu', 1), PersonaController.CreateUsuario);
    app.get('/api/persona/listarPersona/:sexo', PersonaController.ListarPersonaSexo);
    app.get('/api/persona/listarImagenporUsuario/:user_id', PersonaController.ListarImagenesporUsuario);
    app.get('/api/persona/totalImagen/:iduser', PersonaController.fotoTotal);
    app.get('/api/persona/totalMegusta/:user_id', PersonaController.totaldeMegusta);
    app.post('/api/persona/like', PersonaController.likesFoto);
    app.get('/api/persona/listarImagenPerfil/:user_id', PersonaController.ListarImagenes);
    app.delete('/api/persona/eliminarFoto/:id/:iduser', PersonaController.eliminarFoto);

    app.get('/api/persona/listatotal/:user_id/:userfoto_id', PersonaController.verExisteLink);









    app.post('/api/persona/likes', async(req, res) => {
        try {

            const { id, userfoto_id, likes, user_id } = req.body;
            //console.log(`Datos del usuariosssss ${JSON.stringify(likes)}`);

            const query = 'UPDATE likes SET  user_id = $1, userfoto_id= $2 , likes=$3 WHERE id = $4';
            const data = await db.oneOrNone(query, [id, userfoto_id, likes, user_id]);

            return res.status(201).json({
                success: true,
                message: 'bien',
                data: data ? data[0] : null
            })
        } catch (error) {
            console.error(error);

            return res.status(501).json({
                success: false,
                message: 'Error al guardar',
                error: error
            })
        }
    });




    app.post('/api/persona/photos/like', async(req, res) => {
        try {

            const { id, likes } = req.body;
            //console.log(`Datos del usuariosssss ${JSON.stringify(likes)}`);

            const query = 'UPDATE userfoto SET likes = $1 WHERE id = $2';
            const data = await db.oneOrNone(query, [likes, id]);

            return res.status(201).json({
                success: true,
                message: 'bien',
                data: data ? data[0] : null
            })
        } catch (error) {
            console.error(error);

            return res.status(501).json({
                success: false,
                message: 'Error al guardar',
                error: error
            })
        }
    });



    // app.get('/api/persona/totalImagen/:iduser', passport.authenticate('jwt', { session: false }), PersonaController.fotoTotal);


    // app.post('/api/producto/crear', passport.authenticate('jwt',{session:false}),productoController.createproducto);
    // app.get('/api/producto/listarUserCategory/:id_user/:id_category', 
    // passport.authenticate('jwt',{session:false}), productoController.finByproductUser);
    // app.get('/api/producto/totalProducto/:id_user',passport.authenticate('jwt',{session:false}),productoController.TotalProducto);
    // app.get('/api/producto/listar',passport.authenticate('jwt',{session:false}),productoController.ListarPoduct);
    // app.delete('/api/producto/eliminar/:id',productoController.eliminarProduct);
    // app.put('/api/producto/actualizar',productoController.updateProduct);

}