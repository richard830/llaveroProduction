module.exports = (io) => {
    const orderDeliveryName = io.of('/orders/delivery');
    orderDeliveryName.on('connection', function(socket) {
        console.log('USUARIO CONENCATDO /orders/delivery');

        socket.on('position', function(data) {
            console.log(`EMIT...${JSON.stringify(data)}`);
            orderDeliveryName.emit(`position/${data.id_order}`, { lat: data.lat, lng: data.lng });

        });

        socket.on('disconnect', function(data) {
            console.log('UN USUARIO SE DESCONECTO')
                //orderDeliveryName.emit(`position/${data.id_order}`,{lat: data.lat, lng: data.lng});

        })
    })
}