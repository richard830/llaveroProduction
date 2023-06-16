const UsersController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app, upload) => {






    // RUTAS DE ADMIN******************************************

    app.get('/api/users/listaUsuariosAdmin', UsersController.listarUsuarioAdmin);









    // ********************************************************




    app.get('/api/users/findId/:id', passport.authenticate('jwt', { session: false }), UsersController.findIdActualizar);
    app.get('/api/users/foto/:id_user', UsersController.NumeroFotos);
    app.post('/api/users/crear', UsersController.Crear);
    app.get('/api/users/listarUser', UsersController.listarUsuario);
    app.get('/api/users/idUserLogueado/:id', UsersController.IdUsuarioLogueado);
    app.put('/api/users/update', passport.authenticate('jwt', { session: false }), upload.array('image', 1), UsersController.update);
    app.put('/api/users/updateCampo', passport.authenticate('jwt', { session: false }), upload.array('image', 1), UsersController.updateCampo);
    app.post('/api/users/login', UsersController.login);
    app.post('/api/users/logout', UsersController.logout);
    app.post('/api/users/password/:id', UsersController.password);
    app.post('/api/users/recuperar', UsersController.ContraeRecuparar);


}