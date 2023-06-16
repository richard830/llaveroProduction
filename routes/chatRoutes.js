const chatController = require('../controllers/chatController');


module.exports = (app) => {

    app.post('/api/chat/crearChat', chatController.crearChat);
    //app.get('/api/pago/listarEstado/:id_userfoto', pagoController.ListarEstado);

}