const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger= require('morgan');
const cors = require('cors');
const multer =require('multer');
const admin =require('firebase-admin')
const serviceAccount =require('./serviceAccountKey.json');
const passport = require('passport');
const io = require('socket.io')(server);


///sockest

const orderDeliverySokert= require('./sockets/order_delivery_sockets');


//INICIALIZAR FIRABSE
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
});

const upload = multer({
    storage: multer.memoryStorage()
})


///RUTAS////
const users = require('./routes/usersRoutes');
const categoria = require('./routes/categoryRoutes');
const producto = require('./routes/productoRoutes');





const g= process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());
//app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port',port,  g  );
orderDeliverySokert(io);

//LLAMANDO A LAS RUTAS
users(app, upload);
categoria(app);
producto(app);




/*  server.listen(3000, '192.168.1.3' || 'localhost', function(){
    console.log('Aplicaion de Nodejs '+ port + ' Iniciada...')
})  */

 server.listen(port, function(){
    console.log('Aplicaion de Nodejs corriendo en '+ port + ' Iniciada...')
})  



app.get ('/', (req, res )=>{
    res.send('mi backend')
})

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.stack)
});

module.exports ={
    app:    app,
    server: server
}