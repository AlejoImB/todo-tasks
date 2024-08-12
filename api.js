var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();

if (!process.env.ON_RENDER) {
    console.log("Cargando variables de entorno desde archivo");
    const env = require('node-env-file');
    env(__dirname + '/.env');
}

const environment = {
    DBMONGOUSER: process.env.DBMONGOUSER,
    DBMONGOPASS: process.env.DBMONGOPASS,
    DBMONGOSERV: process.env.DBMONGOSERV,
    DBMONGO: process.env.DBMONGO,
};

const query = `mongodb+srv://${encodeURIComponent(environment.DBMONGOUSER)}:${encodeURIComponent(environment.DBMONGOPASS)}@${environment.DBMONGOSERV}/${environment.DBMONGO}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.Promise = global.Promise;

mongoose.connect(query, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    } else {
        console.log("Se ha conectado con la base de datos exitosamente");
    }
});

module.exports = router;
