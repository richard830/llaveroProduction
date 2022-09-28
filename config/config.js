const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) =>{}
}


const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue){
    return stringValue;
});

const databaseConfig = {
    'host': '127.0.0.1',
    'port': 5432,
    'database': 'llave',
    'user': 'postgres',
    'password': '12345' 

   /*  'host': 'ec2-54-91-223-99.compute-1.amazonaws.com',
    'port': 5432,
    'database': 'da5ep84bba9tj8',
    'user': 'lgfsqqkvqjzrrd',
    'password': 'fbcdee880d1fac7cd23cb79eb19ffe0d1e0c6c13645e14f5557dd5a97ce759b8', 
     ssl: true,
     dialect: 'postgres',
    dialectOptions: {
    "ssl": {"require":true }
    },

    rejectUnauthorized: false,
      requestCert: true,
      agent: false  */ 
};

const db = pgp(databaseConfig);
module.exports = db;
