const configuracionController = require('../controllers/configuracionController');


module.exports = (app, upload) => {

    app.get('/api/configuracion/listarconfiguracion', configuracionController.Listar_Configuracion);
    app.put('/api/configuracion/actualizarConfiguracion', configuracionController.updateConfiguracion);
    app.put('/api/configuracion/actualizarConfiguracionImagen', upload.array('foto_dia', 1), configuracionController.updateConfiguracionImage);
    app.put('/api/configuracion/cambiarEstadoConfig', configuracionController.cambiarEstadoConfig);

    // app.get('/api/pago/listarVoucher/:id_userfoto', pagoController.listarVoucherr);
    // app.post('/api/pago/crearPago', pagoController.AgregarPago);

}