var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var TaskModel = require('./task_schema');

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

router.post('/create-task', function (req, res) {
    let task_id = req.body.TaskId;
    let name = req.body.Name;
    let deadline = req.body.Deadline;

    let task = {
        TaskId: task_id,
        Name: name,
        Deadline: deadline
    }
    var newTask = new TaskModel(task);

    newTask.save(function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send("Internal error\n");
        }
        else {
            res.status(200).send("OK\n");
        }
    });
});
module.exports = router;
