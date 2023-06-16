const UserfotoController = require('../controllers/userfotoController');


module.exports = (app, upload) => {

    app.post('/api/userfoto/subirFoto', upload.array('foto', 1), UserfotoController.SubirFoto);
    app.post('/api/userfoto/crearFavorito', UserfotoController.registerFavorito);
    app.get('/api/userfoto/listarImagenPerfil/:id_usuario', UserfotoController.ListarImagenesPerfil);
    app.get('/api/userfoto/listarfotoxGenero', UserfotoController.ListarPersonaSexo);
    app.get('/api/userfoto/listarfotoxId/:id_usuario', UserfotoController.ListarFotoxId);
    app.get('/api/userfoto/totalMegustaxId/:id_userfoto', UserfotoController.TotalMegustaxId);
    app.post('/api/userfoto/listar/:id_usuario/:id_userfoto', UserfotoController.ver);
    app.post('/api/userfoto/fotoFavoritoNumeroMayor/:id_usuario', UserfotoController.fotoFavoritoNumero_Mayor);
    app.get('/api/userfoto/SumaTotalMegustaId/:id_usuario', UserfotoController.SumaTotalMegustaId);
    app.get('/api/userfoto/TotalFotosxId/:id_usuario', UserfotoController.TotalFotosxId);
    app.delete('/api/userfoto/eliminarFoto/:id_userfoto/:id_usuario', UserfotoController.eliminarFoto);
    app.get('/api/userfoto/listarfotoActivo', UserfotoController.ListarFotosActivos);
    app.post('/api/userfoto/crearSeguidor', UserfotoController.registerSeguidor);
    app.post('/api/userfoto/verExisteSeguidor/:id_usuario_logueado/:id_usuario', UserfotoController.verexisteSeguido);
    app.get('/api/userfoto/listarfotoBuscar', UserfotoController.ListarFotoBuscar);
    app.get('/api/userfoto/listarfotoBuscarDetalle/:id_usuario', UserfotoController.ListarFotoBuscarDeTalle);
    app.get('/api/userfoto/listarMeGustaxId/:id_usuario', UserfotoController.ListarmeGustaXID);
    app.get('/api/userfoto/misSeguidorxId/:id_usuario_logueado', UserfotoController.Mis_SeguidoresxID);
    app.get('/api/userfoto/Seguidos/:id_usuario', UserfotoController.Seguidoss);
    app.put('/api/userfoto/estado', UserfotoController.Mi_Estado);
    app.put('/api/userfoto/vista', UserfotoController.AgregarVista);
    app.get('/api/userfoto/listaUsuarioMegusta/:id_userfoto', UserfotoController.usuarios_megusta);





}