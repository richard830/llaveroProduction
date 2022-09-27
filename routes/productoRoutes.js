
const passport = require('passport');
const productoController = require('../controllers/productoController');

module.exports = (app, upload) =>{
    
    app.post('/api/producto/crear', passport.authenticate('jwt',{session:false}),productoController.createproducto);
    app.get('/api/producto/listarUserCategory/:id_user/:id_category', 
    passport.authenticate('jwt',{session:false}), productoController.finByproductUser);
    app.get('/api/producto/totalProducto/:id_user',passport.authenticate('jwt',{session:false}),productoController.TotalProducto);
    app.get('/api/producto/listar',passport.authenticate('jwt',{session:false}),productoController.ListarPoduct);
    app.delete('/api/producto/eliminar/:id',productoController.eliminarProduct);
    app.get('/api/producto/listarEcxel/:id',passport.authenticate('jwt',{session:false}), productoController.ListarProductEcxel);
    app.put('/api/producto/actualizar',productoController.updateProduct);

}
