
const UsersController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app, upload) => {

    app.get('/api/users/findId/:id', passport.authenticate('jwt', { session: false }), UsersController.findIdActualizar);
    app.post('/api/users/crear', UsersController.Crear);
    app.put('/api/users/update', passport.authenticate('jwt', { session: false }), upload.array('image', 1), UsersController.update)
    app.post('/api/users/login', UsersController.login);
    app.post('/api/users/logout', UsersController.logout);
    

}
