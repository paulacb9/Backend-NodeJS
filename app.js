'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors'); 

var app = express();

// cargar archivos de rutas
var project_routes = require('./routes/project');

// Middlewears - metodo que se ejecuta antes de la accion de un controlador
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

// Rutas
app.use('/api', project_routes);

// exportar
module.exports = app;