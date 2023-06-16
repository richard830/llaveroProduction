const CategoryController = require('../controllers/categoryController');
const passport = require('passport');

module.exports = (app) => {
    app.post('/api/categoria/create', passport.authenticate('jwt', { session: false }), CategoryController.create);
    app.get('/api/categoria/listar/:id_user', passport.authenticate('jwt', { session: false }), CategoryController.ListarCateg);
    app.get('/api/categoria/listarxcategory/:id', CategoryController.ListarProductxIdCategory);
    app.delete('/api/categoria/eliminar/:id', CategoryController.eliminarCategoria);
}