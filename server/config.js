// Application configuration.
'use strict';
    var nodemailer = require('nodemailer');

var config = module.exports;

config.db = {
  user: 'root',
  password: 'digimas14',
  name: 'rePr'
};
config.db.details = {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
};
config.db.production = {
  url: 'postgres://mubripfc:fk1vnZ4ZDS0esmQmvecRhUhJljPv5LjG@pellefant.db.elephantsql.com:5432/mubripfc',
  dialect: 'postgres'
};
config.keys = {
  secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE=' // Not anymore...
};

config.services = {
  url: "http://172.16.30.8:7777/vasApp/webapi/vas/pay",
  apiId: "payoutlet",
  apiSecret: "2di76uGJPyZ46RA6g4S4zvstlXNjtq1azw3aj5bjVyLkjaHqiZS9ve5KuRrldKLr"
}

var userRoles = config.userRoles = {
  guest: 1,    // ...001
  user: 2,     // ...010
  admin: 4     // ...100
};

config.accessLevels = {
  guest: userRoles.guest | userRoles.user | userRoles.admin,    // ...111
  user: userRoles.user | userRoles.admin,                       // ...110
  admin: userRoles.admin                                        // ...100
};

config.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'etzghana@gmail.com',
    pass: '#tr1nz13t'
  }
});

