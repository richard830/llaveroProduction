const pagoController = require('../controllers/pagoController');


module.exports = (app, upload) => {

    // ******ADMIN***********************************************************
    app.post('/api/pago/registrarVoucher', upload.array('fotovoucher', 1), pagoController.registrarVoucherr);
    app.get('/api/pago/ListarPagoAdmin', pagoController.ListarPagoAdmin);
    app.put('/api/pago/cambiarEstado', pagoController.cambiarEstado);


    // ****************************************************************

    app.post('/api/pago/crearPago', pagoController.AgregarPago);
    app.get('/api/pago/listarEstado/:id_userfoto', pagoController.ListarEstado);
    app.get('/api/pago/listarVoucher/:id_userfoto', pagoController.listarVoucherr);

}